import React, { useState, useEffect, memo } from 'react'
import styles from './sidebar.module.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from '../../../../hooks/useCookies';
import { API_URL } from '../../../../api';

function ProfileCompletion() {
    const [profileCompletion, setProfileCompletion] = useState(0)
    const [Profile, setProfileData] = useState({});
    const { getCookie } = useCookies();
    const Navigate = useNavigate();

    const id = getCookie('userId')
    const OldImageURL = 'https://data.mytamildate.com/storage/public/uploads/user';
    const [images, setImages] = useState({
        main: null,
        first: null,
        second: null,
    });

    const [images2, setImages2] = useState({
        main: null,
        first: null,
        second: null,
    });

    const ImageURL = async () => {
        try {
            const response = await fetch(`${API_URL}/customer/update/media`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            });
            const data = await response.json();
            console.log("datadaa", data);
            if (response.ok) {
                if (data[0].type === 31 || data[1].type === 31 || data[2].type === 31) {
                    const others = data.filter(image => image.type === 32);
                    const main = data.filter(image => image.type === 31)[0];

                    setImages2({
                        main: API_URL + "media/avatar/" + main.hash + "." + main.extension,
                        first: API_URL + "media/avatar/" + others[0].hash + "." + others[0].extension,
                        second: API_URL + "media/avatar/" + others[1].hash + "." + others[1].extension,
                    })


                    console.log('imges', {
                        main: API_URL + "media/avatar/" + main.hash + "." + main.extension,
                        first: API_URL + "media/avatar/" + others[0].hash + "." + others[0].extension,
                        second: API_URL + "media/avatar/" + others[1].hash + "." + others[1].extension,
                    })
                }
                else {
                    const others = data.filter(image => image.type === 2);
                    const main = data.filter(image => image.type === 1)[0];
                    console.log(others, main)
                    setImages2({
                        main: OldImageURL + "/" + id + "/avatar/" + main.hash + "-large" + "." + main.extension,
                        first: OldImageURL + "/" + id + "/photo/" + others[0].hash + "-large" + "." + main.extension,
                        second: OldImageURL + "/" + id + "/photo/" + others[1].hash + "-large" + "." + main.extension,
                    })

                    console.log({
                        main: OldImageURL + "/" + id + "/avatar/" + main.hash + "-large" + "." + main.extension,
                        first: OldImageURL + "/" + id + "/photo/" + others[0].hash + "-large" + "." + main.extension,
                        second: OldImageURL + "/" + id + "/photo/" + others[1].hash + "-large" + "." + main.extension,
                    })

                }

            }
        } catch (error) {
            console.error('Error saving images:', error);
        }
    }

    const GetprofileCompletion = async () => {
        try {
            const response = await fetch(`${API_URL}/customer/update/profileCompletion`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getCookie('token')}`
                    }
                }
            );
            const data = await response.json();

            if (response.ok) {
                setProfileCompletion(data.completionPercentage);
                console.log(profileCompletion);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const ProfileDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/customer/update/profileDetails`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getCookie('token')}`
                    }
                }
            );
            const data = await response.json();

            if (response.ok) {
                setProfileData(data)
                console.log(data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        ImageURL();
        GetprofileCompletion();
        ProfileDetails();
    }, []);

    return (
        <div className={styles.profile}>
            <div className={styles.imgContainer} style={{
                "--profile-completed": `${profileCompletion}%`
            }}>
                <div className={styles.innerCircle}>
                    <img src={images2.main} alt="" />
                </div>
            </div>
            <p style={{
                fontSize: "18px"
            }}>{Profile.Name}</p>
            <p style={{
                marginTop: "-0.5rem",
                fontSize: "14px"
            }}>{profileCompletion}% complete</p>
            {
                profileCompletion < 100 && (
                    <p style={{
                        fontSize: "14px",
                        fontWeight: "600"
                    }}>Complete your profile for better matches</p>
                )
            }
            <button className={styles['recommendation']} onClick={() => Navigate("/updateprofile")}>Update</button>
        </div>
    )
}

export default ProfileCompletion
