import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Image, Modal } from 'react-bootstrap';
import { Button, Col, Row } from 'react-bootstrap';
import picture from './pictureedit.module.css';
import questionmark from '../../../../assets/images/questionmark.png';
import Sidebar from '../../../userflow/components/sidebar/sidebar';
import profilepic from '../../../../assets/images/profilepic.png';
import deleteicon from '../../../../assets/images/deleteicon.png'
import editlogo from '../../../../assets/images/editicon2.png'
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';
import { useNavigate } from 'react-router-dom';
import editicon from '../../../../assets/images/editicon.png';
import Cropper from 'react-easy-crop';

const EditPicture = () => {
  const { getCookie } = useCookies();
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedImages, setSelectedImages] = useState({ main: null, first: null, second: null });
  const [showModal, setShowModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [currentImageKey, setCurrentImageKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaid, setMediaId] = useState(null);
  const [type, setType] = useState(32);

  const fileInputRefMain = useRef(null);
  const fileInputRefFirst = useRef(null);
  const fileInputRefSecond = useRef(null);
  const toggleInfoVisibility = () => {
    setShowInfo(!showInfo);
  };

  const id = getCookie('userId')
  console.log(id);
  const OldImageURL = 'https://data.mytamildate.com/storage/public/uploads/user';
  const [imagesupdate, setimagesupdate] = useState({
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
      setData(data);
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

  const UpdatedMedia = async () => {
    try {
      const response = await fetch(`${API_URL}customer/update/updated-media`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
        }
      });

      const data = await response.json();
      setData(data);
      console.log("datadaa", data);

      if (response.ok) {
        const validImages = data.filter(image => image.hash && image.extension && (image.type === 31 || image.type === 32 || image.type === 1 || image.type === 2));

        if (validImages.length > 0) {
          const mainType31 = validImages.find(image => image.type === 31);
          const othersType32 = validImages.filter(image => image.type === 32);
          const mainType1 = validImages.find(image => image.type === 1);
          const othersType2 = validImages.filter(image => image.type === 2);

          if (mainType31) {
            setimagesupdate({
              main: API_URL + "media/avatar/" + mainType31.hash + "." + mainType31.extension,
              first: othersType32[0] ? API_URL + "media/avatar/" + othersType32[0].hash + "." + othersType32[0].extension : null,
              second: othersType32[1] ? API_URL + "media/avatar/" + othersType32[1].hash + "." + othersType32[1].extension : null,
            });
            console.log('updateImages', {
              main: API_URL + "media/avatar/" + mainType31.hash + "." + mainType31.extension,
              first: othersType32[0] ? API_URL + "media/avatar/" + othersType32[0].hash + "." + othersType32[0].extension : null,
              second: othersType32[1] ? API_URL + "media/avatar/" + othersType32[1].hash + "." + othersType32[1].extension : null,
            });
          } else if (mainType1) {
            setimagesupdate({
              main: OldImageURL + "/" + id + "/avatar/" + mainType1.hash + "-large" + "." + mainType1.extension,
              first: othersType2[0] ? OldImageURL + "/" + id + "/photo/" + othersType2[0].hash + "-large" + "." + othersType2[0].extension : null,
              second: othersType2[1] ? OldImageURL + "/" + id + "/photo/" + othersType2[1].hash + "-large" + "." + othersType2[1].extension : null,
            });
            console.log({
              main: OldImageURL + "/" + id + "/avatar/" + mainType1.hash + "-large" + "." + mainType1.extension,
              first: othersType2[0] ? OldImageURL + "/" + id + "/photo/" + othersType2[0].hash + "-large" + "." + othersType2[0].extension : null,
              second: othersType2[1] ? OldImageURL + "/" + id + "/photo/" + othersType2[1].hash + "-large" + "." + othersType2[1].extension : null,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error saving images:', error);
    }
  };



  const handleFileChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
      };
      reader.readAsDataURL(file);

      setCurrentImageKey(imageKey);
      setShowCropModal(true);
    }
  };



  const handleClick = (imageKey) => {
    let mediaId = null;
    if (imageKey === 'main') {
      mediaId = data.find(image => image.type === 31)?.id;
      fileInputRefMain.current.click();
      setType(31)
    } else if (imageKey === 'first') {
      mediaId = data.find(image => image.type === 32)?.id;
      fileInputRefFirst.current.click();
      setType(32)
    } else if (imageKey === 'second') {
      mediaId = data.filter(image => image.type === 32)[1]?.id;
      fileInputRefSecond.current.click();
      setType(32)
    }
    console.log(mediaId);
    setMediaId(mediaId);
  };


  const handleNextClick = async () => {
    setLoading(true);
    const formData = new FormData();
    if (selectedImages.main !== null) {

      formData.append('main', selectedImages.main);
    }
    else if (selectedImages.first != null) {

      formData.append('first', selectedImages.first);
    }
    else {

      formData.append('second', selectedImages.second);
    }

    if (mediaid) {
      formData.append('media_id', mediaid);
    }

    if (type) {
      formData.append('type', type);
    }
    try {
      const response = await fetch(`${API_URL}/customer/update/mediaupdate`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`,
        }
      });

      const data = await response.json();
      setSelectedImages({ main: null, first: null, second: null })
      console.log(data);
    } catch (error) {
      console.error('Error saving images:', error);
    } finally {
      setLoading(false);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


  const handleCropSave = () => {
    /* console.log('Attempting to save cropped image:', imageToCrop, croppedAreaPixels); */

    // Ensure croppedAreaPixels is not null before proceeding
    if (!croppedAreaPixels) {
      throw new Error('No cropped area to save');
    }

    getCroppedImg(imageToCrop, croppedAreaPixels)
      /* croppedImage: Blob */
      .then(croppedImage => {
        console.log(new File([croppedImage], window.crypto.randomUUID(), { type: 'image/jpeg' }));

        setSelectedImages({
          ...selectedImages,
          [currentImageKey]: new File([croppedImage], window.crypto.randomUUID(), { type: 'image/jpeg' })
        })
        setShowCropModal(false);

        console.log(selectedImages);
        console.log('Cropped image saved successfully');
      })
      .catch(error => {
        console.error('Error cropping image:', error);
        // Handle errors if any during cropping
      });
  };



  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const getCroppedImg = (imageSrc, crop) => {
    const canvas = document.createElement('canvas');
    const image = document.createElement('img');
    const promise = new Promise((resolve, reject) => {
      image.onload = () => {
        const ctx = canvas.getContext('2d');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        }, 'image/jpeg');
      };
      image.src = imageSrc;
    });
    return promise;
  };


  useEffect(() => {
    ImageURL();
    UpdatedMedia();
    if (selectedImages) {
      handleNextClick();
    }
  }, [selectedImages]);


  return (
    <Sidebar>
      <div style={{
        flex: "1",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflowY: "auto",
        scrollbarWidth: "none",
        padding: "2rem"
      }}>
        <div className={picture.container}>
          <p className={picture.componentname}>Your Profile</p>
          <Image
            onClick={toggleInfoVisibility}
            style={{ cursor: 'pointer' }}
            width="24px"
            height="24px"
            src={questionmark}
          />
          <Container className={`${picture.whyInfo} ${showInfo ? picture.show : picture.hide}`}>
            <p>
              Any changes made to the "Photo" section will be sent for Admin review and approval.
              Your account will be in a pending status until it gets approved.
              You should receive an update within 24 hours. If not, please reach
              out to hello@mytamildate.com. Thank you for your patience!
            </p>
          </Container>
        </div>
        <div className={picture.mainpic} style={{
          maxWidth: "340px",
          marginInline: "auto",
          borderRadius: "16px"
        }}>
          <Image src={images2.main} />
          <div className={picture.icons}>
            <span className={picture.iconLeft}>
              <Image src="" />
            </span>
            <span className={picture.iconRight}>
              <Image src={editicon} onClick={() => handleClick('main')} />
              <input
                type="file"
                ref={fileInputRefMain}
                onChange={(e) => handleFileChange(e, 'main')}
                style={{ display: 'none' }}
              />
            </span>
          </div>
          <div>
            <p className={picture.pictype}>Main</p>
          </div>
        </div>
        <div className={picture.twopiccontainer}>
          <div className={picture.restpicture} style={{
            maxWidth: "150px",
            maxHeight: "150px",
            borderRadius: "16px"
          }}>
            <Image src={images2.first} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }} />
            <div className={picture.icons}>
              <span className={picture.iconLeft}>
                <Image src="" />
              </span>
              <span className={picture.iconRight}>
                <Image src={editicon} onClick={() => handleClick('first')} />
                <input
                  type="file"
                  ref={fileInputRefFirst}
                  onChange={(e) => handleFileChange(e, 'first')}
                  style={{ display: 'none' }}
                />
              </span>
            </div>
          </div>
          <div className={picture.restpicture} style={{
            maxWidth: "150px",
            maxHeight: "150px",
            marginLeft: "auto",
            borderRadius: "16px"
          }}>
            <Image src={images2.second} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }} />
            <div className={picture.icons}>
              <span className={picture.iconLeft}>
                <Image src="" />
              </span>
              <span className={picture.iconRight}>
                <Image src={editicon} onClick={() => handleClick('second')} />
                <input
                  type="file"
                  ref={fileInputRefSecond}
                  onChange={(e) => handleFileChange(e, 'second')}
                  style={{ display: 'none' }}
                />
              </span>
            </div>
          </div>
        </div>




        <div>
          {
            imagesupdate.main || imagesupdate.first || imagesupdate.second ? (
              <div className={picture.underreview} style={{ marginTop: "40px", color: "#4E1173", fontSize: "16px", fontWeight: "600", textalign: "justify", marginBottom: "20px" }}>
                <p>
                  Thanks for updating your image! It's now under review by myTamilDate. You'll receive an update within 24 hours. We appreciate your patience!
                </p>
              </div>
            ) : ""
          }
          {imagesupdate.main && (
            <div className={picture.mainpic} style={{ borderRadius: "16px" }}>
              <Image src={imagesupdate.main} />
              <div className={picture.icons}>
                <span className={picture.iconLeft}>
                  <Image src="" />
                </span>
                <span className={picture.iconRight}>
                  <Image src="" onClick={() => handleClick('main')} />
                  <input
                    type="file"
                    ref={fileInputRefMain}
                    onChange={(e) => handleFileChange(e, 'main')}
                    style={{ display: 'none' }}
                  />
                </span>
              </div>
              <div>
                <p className={picture.pictype}>Main</p>
              </div>
            </div>
          )}

          <div className={picture.twopiccontainer}>
            {imagesupdate.first && (
              <div className={picture.restpicture}>
                <Image src={imagesupdate.first} />
                <div className={picture.icons}>
                  <span className={picture.iconLeft}>
                    <Image src="" />
                  </span>
                  <span className={picture.iconRight}>
                    <Image src="" />
                    <input
                      type="file"
                      ref={fileInputRefFirst}
                      onChange={(e) => handleFileChange(e, 'first')}
                      style={{ display: 'none' }}
                    />
                  </span>
                </div>
              </div>
            )}

            {imagesupdate.second && (
              <div className={picture.restpicture}>
                <Image src={imagesupdate.second} />
                <div className={picture.icons}>
                  <span className={picture.iconLeft}>
                    <Image src="" />
                  </span>
                  <span className={picture.iconRight}>
                    <Image src="" />
                    <input
                      type="file"
                      ref={fileInputRefSecond}
                      onChange={(e) => handleFileChange(e, 'second')}
                      style={{ display: 'none' }}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>


        <Modal centered className="crop-modal" show={showCropModal} onHide={handleCropCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Crop your photo</Modal.Title>
          </Modal.Header>
          <Modal.Body className='crop-modal-body'>
            {imageToCrop && (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3} // Change aspect ratio as needed
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </Modal.Body>
          <Modal.Footer className='crop-modal-footer'>
            <button variant="secondary" className='crop-cancel-btn' onClick={handleCropCancel}>
              Cancel
            </button>
            <button variant="secondary" className='crop-save-btn' onClick={handleCropSave}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </Sidebar>
  );
};

export default EditPicture;
