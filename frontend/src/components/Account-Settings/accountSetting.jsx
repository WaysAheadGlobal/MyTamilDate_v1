import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './accountSetting.css';
import { Container, Image } from 'react-bootstrap';
import { Modal, Button, Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import backarrow from "../../assets/images/backarrow.jpg";
import premium from "../../assets/images/premium.png";
import editlogo from "../../assets/images/editlogo.png";
import username from "../../assets/images/username.png";
import CreditCard from "../../assets/images/CreditCard.png";
import pauseicon from "../../assets/images/pauseicon.png";
import privacy from "../../assets/images/privacy.png";
import emailicon from "../../assets/images/emailicon.png";
import service from "../../assets/images/service.png";
import logout from "../../assets/images/logout.png";
import phonenumber from "../../assets/images/phonenumber.png";
import deleteicon from "../../assets/images/deleteicon.png";
import Right from "../../assets/images/Right.png";
import { useNavigate } from 'react-router-dom';
import { useCookies } from '../../hooks/useCookies';
import { API_URL } from '../../api';
import Flag from 'react-world-flags';


const countries = [
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'AU', name: 'Australia', dialCode: '+36' },
];


export const AccountSetting = () => {
    const navigate = useNavigate();
    const [showUserName, setshowUserName] = useState(false);
    const [showUserEmail, setshowUserEmail] = useState(false);
    const [showUserEmailotp, setshowUserEmailotp] = useState(false);
    const [showUserPhoneotp, setshowUserPhoneotp] = useState(false);
    const [showUserphone, setshowUserphone] = useState(false);
    const [showUnsubscribeEmail, setShowUnsubscribeEmail] = useState(false);
    const [showPause, setShowPause] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [showPauseOption, setShowPauseOpion] = useState(false); 
    const [showDeleteOption, setShowDeleteOpion] = useState(false); 
    const [firstName, setFirstName] = useState('Karthik');
    const [lastName, setLastName] = useState('Kumar');
    const[showFinalDetele, setFinalDetele] = useState(false);

    
    const handleCloseName = () => setshowUserName(false);
    const handleShowName = () => setshowUserName(true);

    const handleCloseEmail = () => setshowUserEmail(false);
    const handleShowEmail = () => setshowUserEmail(true);

    const handleCloseEmailotp = () => setshowUserEmailotp(false);
    const handleShowEmailotp = () => setshowUserEmailotp(true);

    const handleClosephoneotp = () => setshowUserphone(false);
    const handleShowPhone = () => setshowUserphone(true);

    const handleClosePhoneotp = () => setshowUserPhoneotp(false);
    const handleShowPhoneotp = () => setshowUserPhoneotp(true);

    const handleClosePause = () => setShowPause(false);
    const handleShowPause = () => setShowPause(true);

    const handleCloseDeleteAccount = () => setShowDeleteAccount(false);
    const handleShowDeleteAccount = () => setShowDeleteAccount(true);

    const handleCloseDeleteOption = () => setShowDeleteOpion(false);
    const handleShowDeleteOption = () => setShowDeleteOpion(true);


    const handleCloseFinalDetele = () => setFinalDetele(false);
    const handleShowFinalDetele = () => setFinalDetele(true);

const GotoPrivacyPolicy = ()=>{
    navigate("/PrivacyPolicyDetails")
}
const Gototermandconditions = ()=>{
    navigate("/termandconditions")
}

// Delete My Account

const handleDeleteAccount = ()=>{
    handleCloseDeleteAccount();
    handleShowDeleteOption();
}

const [selectedDeleteOption, setSelectedDeleteOption] = useState('');
    
    
    const handleDeleteAccountOption = () => {
        handleCloseDeleteOption();
    
        handleShowFinalDetele();
    };

const handleShowpauseModel =()=>{
    handleCloseDeleteAccount();
    handleCloseDeleteOption();
    handleShowPause();
}

const handleGoToFinalDelete = ()=>{
    handleCloseDeleteAccount();
    handleCloseDeleteOption()
    handleShowFinalDetele();
}


const handleFinalDetele = ()=>{
    handleCloseDeleteOption();
    handleCloseFinalDetele();
}

    // Unsubscribe Email
    const handleCloseUnsubscribeEmail = () => setShowUnsubscribeEmail(false);
    const handleShowUnsubscribeEmail = () => setShowUnsubscribeEmail(true);
    const handleUnsubscribeEmail = () => {
        setShowUnsubscribeEmail(false);
        navigate("/unsubscribe")
    };

   //pause my account 
   const handlePauseAccount = () => {
    setShowPause(false);
    handleShowPauseOption();
};
    const [selectedOption, setSelectedOption] = useState('');
    const handleClosePauseOption = () => setShowPauseOpion(false);
    const handleShowPauseOption = () => setShowPauseOpion(true);
    const handlePauseAccountOption = () => {
        setShowPauseOpion(false);
    };


    


  
     //success modal of Email OTP  open and close
     const [showsuccessemail, setShowsuccess] = useState(false);
     const handleClosesuccess = () => setShowsuccess(false);
     const handleShowsuccess = () => setShowsuccess(true);
    
     //success modal of Phone OTP  open and close
     const [showsuccessphone, setShowsuccessphone] = useState(false);
     const handleClosesuccessphone = () => setShowsuccessphone(false);
     const handleShowsuccessphone = () => setShowsuccessphone(true);
   



    //  email update 
    const [errorMessageemail, setErrorMessageemail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();


        if (!email) {
            setErrorMessageemail('Please enter a valid email address');
            return;
        } else if (!email.includes('@')) {
            setErrorMessageemail('Please enter a valid email address');
            return;
        }
        console.log('Email submitted:', email);
        setEmail('');
        setErrorMessageemail('');
        handleCloseEmail();
        handleShowEmailotp();

    };


    //otp for email code 

    
    const goToSigninEmailSuccessful = () => {
        navigate("/signinemailsuccessful");
    };

    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [errorMessageotp, setErrorMessageotp] = useState('');

    const code1ref = useRef(null);
    const code2ref = useRef(null);
    const code3ref = useRef(null);
    const code4ref = useRef(null);

    const handleCodeChange = (e, setter, nextRef) => {
        const value = e.target.value;
        if (!isNaN(value) && value.length <= 1) {
            setter(value);
            if (value.length === 1 && nextRef) {
                nextRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e, prevRef) => {
        if (e.key === 'Backspace' && e.target.value === '' && prevRef) {
            prevRef.current.focus();
        }
    };

    const handleSubmitEmailotp = (e) => {
        e.preventDefault();
        const code = code1 + code2 + code3 + code4;
        if (code.length !== 4) {
            setErrorMessage('*Invalid code, please re-enter again');
        } else {
            setErrorMessage('');
            handleCloseEmailotp();
            handleShowsuccess();
        }
    };

   
    // phone number update code

    const [errorMessagephoneupdate, setErrorMessagephoneupdate] = useState('');
    const [phoneNumberupdate, setPhoneNumberupdate] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('CA');
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(countries.find(country => country.code === 'CA'));
    const [showModalcountry, setshowModalcountry] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { setCookie } = useCookies();
    const handleCountrySelect = (countryCode) => {
        setSelectedCountry(countryCode);
        const countryInfo = countries.find(country => country.code === countryCode);
        setSelectedCountryInfo(countryInfo);
        setPhoneNumberupdate('');
        toggleModal();
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialCode.includes(searchTerm)
    );
    const toggleModal = () => {
        setshowModalcountry(!showModalcountry);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumberupdate(value);
    };

    const handleSubmitphone = async (e) => {
        e.preventDefault();
        const completePhoneNumber = selectedCountryInfo.dialCode + phoneNumberupdate;
        if (phoneNumberupdate.length === 0) {
            setErrorMessage('This Phone Number is Invalid');
        } else if (phoneNumberupdate.length < 10) {
            setErrorMessage('Phone number must be at least 10 digits');
        } else {
            setErrorMessage('');
            handleClosephoneotp();
            handleShowPhoneotp();
            // try {
            //     const response = await fetch(`${API_URL}/user/login/otp`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             phone: completePhoneNumber,
            //         }),
            //     });

            //     const result = await response.json();
            //     if (response.ok) {
            //         alert(result.message);
            //         setCookie('phoneNumber', completePhoneNumber, 7);
            //         navigate("/signinphoneotp");
            //     } else {
            //         setErrorMessage(result.message || 'Failed to send OTP');
            //     }
            // } catch (error) {
            //     console.error('Error:', error);
            //     setErrorMessage('An error occurred. Please try again later.');
            // }
        }
    };

//phone number OTP modal 

const handleSubmitphoneotp = (e) => {
    e.preventDefault();
    const code = code1 + code2 + code3 + code4;
    if (code.length !== 4) {
        setErrorMessage('*Invalid code, please re-enter again');
    } else {
        setErrorMessage('');
        handleClosePhoneotp();
        handleShowsuccessphone();
    }
};


    return (
        <div className='account-setting-container'>
            <Container className='desktop-left-side'>

                <h1>My Tamil Date</h1>
            </Container>

            <Container className='account-setting-main'>
                <Container className='account-setting-box'>
                    <Container className='logo-progressbar3'>

                        <Container className='logo-arrow3'>
                            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
                            <h1 className='account-setting-heading'>
                                Account Setting
                            </h1>
                        </Container>

                    </Container>

                    <div className="upgrade-button">

                        <div> <span><Image src={premium} /></span> Upgrade Account</div>
                        <div className="description">
                            Upgrade your account, you will have unlimited access and wider exposure
                        </div>
                    </div>

                    <Container className='edittext-logo'>
                        <p className='textofedit'>Tap on each section to edit</p>
                        <div>
                            <Image className='editlogo' src={editlogo} />
                        </div>
                    </Container>


                    <Container>
                        {/* User Info Section */}
                        <div className="user-info-container">
                            <div className="user-info-item" onClick={handleShowName}>
                                <div className='leftsideinfo'>
                                    <Image className='userinfoicon' src={username} />
                                    <span className='userleftinfo'>User name</span>
                                </div>
                                <div>
                                    <span className="value">Karthik Kumar</span>
                                </div>
                            </div>
                            <div className="user-info-item" onClick={handleShowPhone}>
                                <div className='leftsideinfo'>
                                    <Image className='userinfoicon' src={phonenumber} />
                                    <span className='userleftinfo'>Phone Number</span>
                                </div>
                                <div>
                                    <span className="value">(905) 216-5247</span>
                                </div>
                            </div>
                            <div className="user-info-item" onClick={handleShowEmail}>
                                <div className='leftsideinfo'>
                                    <Image className='userinfoicon' src={emailicon} />
                                    <span className='userleftinfo'>Email</span>
                                </div>
                                <div>
                                    <span className="value">Karthik19@gmail.com</span>
                                </div>
                            </div>
                            <div className="pause-button" onClick={handleShowPause}>
                                <Image style={{ marginRight: "6px" }} className="fas fa-pause-circle" src={pauseicon} />
                                <span>Pause my account</span>
                            </div>
                            <div className="payment-button">
                                Payment
                            </div>
                            <Container style={{ marginTop: "20px", marginBottom: "20px", borderBottom: "1px solid #e0e0e0" }} >

                                <div className="user-info-item">
                                    <div className='leftsideinfo'>
                                        <Image className='userinfoicon' src={CreditCard} />
                                        <span className='userleftinfo'>Payment Method</span>
                                    </div>
                                    <div>
                                        <span className="value"></span>
                                    </div>
                                </div>
                            </Container>
                            <div className="legal-button">
                                Legal
                            </div>
                        </div>

                        <div className="user-info-container">
                            <div className="last-user-info-item">
                                <div className='lastleftsideinfo' onClick={handleShowUnsubscribeEmail}>
                                    <span className='lastuserleftinfo'>Email Unsubscribe</span>
                                </div>
                                <div>
                                    <Image className='userinfoicon' src={emailicon} />
                                </div>
                            </div>

                            <div className="last-user-info-item" onClick={GotoPrivacyPolicy}>
                                <div className='lastleftsideinfo'>
                                    <span className='lastuserleftinfo'>Privacy Policy</span>
                                </div>
                                <div>
                                    <Image className='userinfoicon' src={privacy} />
                                </div>
                            </div>
                            <div className="last-user-info-item" onClick={Gototermandconditions}>
                                <div className='lastleftsideinfo'>
                                    <span className='lastuserleftinfo'>Terms of Service</span>
                                </div>
                                <div>
                                    <Image className='userinfoicon' src={service} />
                                </div>
                            </div>

                            <div className="last-user-info-item" style={{ border: "none" }}>
                                <div className='lastleftsideinfo'>
                                    <span className='lastuserleftinfo'>Logout</span>
                                </div>
                                <div>
                                    <Image className='userinfoicon' src={logout} />
                                </div>
                            </div>
                            <button className="delete-button" onClick={handleShowDeleteAccount}>
                                <span>Delete my Account</span>
                                <Image className='userinfoicon' src={deleteicon} />
                            </button>





                        </div>
                    </Container>
                </Container>
            </Container>

            <Container className='desktop-Right-side'>

                <h1>MY Tamil Date</h1>
            </Container>

{/* update the Name  */}

            <Modal show={showUserName} centered>
                <Modal.Header >
                    <Modal.Title>Update User Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control-name"
                        />
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control-name"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" className="btn-cancel" onClick={handleCloseName}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-save" onClick={handleCloseName}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>


{/* Update the email Address */}

            <Modal show={showUserEmail} centered>
                <Modal.Header >
                    <Modal.Title>Update Your Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className=''>
                        <Container className='signin-emailverify-content'>
                            <div style={{ width: '100%', alignItems: 'center' }}>
                                <Form.Group controlId="formCode" className='signin-emailverify-form-group'>


                                    <Form.Control
                                        className={`signin-emailverify-input ${errorMessage ? 'error' : ''}`}
                                        type="text"
                                        style={{ flex: 1 }}
                                        placeholder="Example@gmail.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />


                                    {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                                </Form.Group>
                            </div>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" className="btn-cancel" onClick={handleCloseEmail}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-save" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUserEmail} centered>
                <Modal.Header >
                    <Modal.Title>Update Your Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className=''>
                        <Container className='signin-emailverify-content'>
                            <div style={{ width: '100%', alignItems: 'center' }}>
                                <Form.Group controlId="formCode" className='signin-emailverify-form-group'>
                                    <Form.Control
                                        className={`signin-emailverify-input ${errorMessageemail ? 'error' : ''}`}
                                        type="text"
                                        style={{ flex: 1 }}
                                        placeholder="Example@gmail.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />


                                    {errorMessageemail && <Form.Text className="text-danger error-message">{errorMessageemail}</Form.Text>}
                                </Form.Group>
                            </div>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" className="btn-cancel" onClick={handleCloseEmail}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-save" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUserEmailotp} centered>
                <Modal.Header >
                    <Modal.Title>Verify Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className=''>
                        <Container className='entercode-content' style={{ marginBottom: "100px" }}>
                            <div>
                                <Form.Group controlId="formCode" className='entercode-form-group'>

                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code1ref}
                                            placeholder=""
                                            value={code1}
                                            onChange={(e) => handleCodeChange(e, setCode1, code2ref)}
                                            onKeyDown={(e) => handleKeyDown(e, null)}
                                            style={{ flex: 1 }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code2ref}
                                            placeholder=""
                                            value={code2}
                                            onChange={(e) => handleCodeChange(e, setCode2, code3ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code1ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code3ref}
                                            placeholder=""
                                            value={code3}
                                            onChange={(e) => handleCodeChange(e, setCode3, code4ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code2ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code4ref}
                                            placeholder=""
                                            value={code4}
                                            onChange={(e) => handleCodeChange(e, setCode4, null)}
                                            onKeyDown={(e) => handleKeyDown(e, code3ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                    </div>
                                    {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                                </Form.Group>
                                <div className='resend-timer'>
                                    <a href=''> Resend code</a>
                                    <span>1:48sec</span>
                                </div>
                            </div>

                        </Container>
                        <Button variant="outline-danger" className="btn-cancel" onClick={handleCloseEmailotp}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="btn-save" onClick={handleSubmitEmailotp}>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            <Modal show={showsuccessemail} onHide={handleClosesuccess} centered>
                <Modal.Body className="success-modal-content">
                    <Image className="success-icon" src={Right} />
                    <div className="success-title">Success</div>
                    <div className="success-message">Email was changed successfully</div>
                    <Button className="btn-okay" onClick={handleClosesuccess}>
                        Okay
                    </Button>
                </Modal.Body>
            </Modal>


{/* update the phone number */}

            <Modal show={showUserphone} centered>
                <Modal.Header >
                    <Modal.Title>Update Your Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className=''>
                        <Form onSubmit={handleSubmit} className='verify-phone-form'>
                            <Form.Group style={{marginBottom : "100px"}} controlId="formPhoneNumber" className='verify-form-group'>
                                
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Dropdown>
                                        <div id="dropdown-basic"  onClick={() => setshowModalcountry(true)} className='flag-box'>
                                            <Flag code={selectedCountry} style={{ width: '34px', height: '25px', marginRight: '10px' }} className='flag' />
                                            <span>{selectedCountryInfo.dialCode}</span>
                                        </div>
                                    </Dropdown>
                                    <Form.Control
                                        className={`num-verify-input ${errorMessage ? 'error' : ''}`}
                                        type="text"
                                        placeholder="(905)258-2258"
                                        value={phoneNumberupdate}
                                        onChange={handlePhoneNumberChange}
                                        style={{ flex: 1, marginLeft: '10px' }}
                                    />
                                </div>
                                {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                            </Form.Group>
                            <Container style={{display : "flex", justifyContent : "center" , alignItems : "center"}}>

                            <Button variant="outline-danger" className="btn-cancel" onClick={handleClosephoneotp}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="btn-save" onClick={handleSubmitphone}>
                            Save
                        </Button>
                            </Container>
                        </Form>

                    </Container>
                </Modal.Body>

            </Modal>

            <Modal show={showModalcountry} onHide={() => setshowModalcountry(false)}
                centered
                dialogClassName="custom-modal"
            >
                {/* <Modal.Header closeButton>

                </Modal.Header> */}

                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search Country"
                            aria-label="Search Country"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    {filteredCountries.map((country) => (
                        <div key={country.code} className='flag-item' onClick={() => handleCountrySelect(country.code)}>
                            <Flag code={country.code} style={{ width: '24px', height: '18px', marginRight: '10px' }} />
                            {country.name} ({country.dialCode})
                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            <Modal show={showUserPhoneotp} centered>
                <Modal.Header >
                    <Modal.Title>Verify Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className=''>
                        <Container className='entercode-content' style={{ marginBottom: "100px" }}>
                            <div>
                                <Form.Group controlId="formCode" className='entercode-form-group'>

                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code1ref}
                                            placeholder=""
                                            value={code1}
                                            onChange={(e) => handleCodeChange(e, setCode1, code2ref)}
                                            onKeyDown={(e) => handleKeyDown(e, null)}
                                            style={{ flex: 1 }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code2ref}
                                            placeholder=""
                                            value={code2}
                                            onChange={(e) => handleCodeChange(e, setCode2, code3ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code1ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code3ref}
                                            placeholder=""
                                            value={code3}
                                            onChange={(e) => handleCodeChange(e, setCode3, code4ref)}
                                            onKeyDown={(e) => handleKeyDown(e, code2ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                        <Form.Control
                                            className={`entercode-input ${errorMessage ? 'error' : ''}`}
                                            type="text"
                                            ref={code4ref}
                                            placeholder=""
                                            value={code4}
                                            onChange={(e) => handleCodeChange(e, setCode4, null)}
                                            onKeyDown={(e) => handleKeyDown(e, code3ref)}
                                            style={{ flex: 1, marginLeft: '10px' }}
                                        />
                                    </div>
                                    {errorMessage && <Form.Text className="text-danger error-message">{errorMessage}</Form.Text>}
                                </Form.Group>
                                <div className='resend-timer'>
                                    <a href=''> Resend code</a>
                                    <span>1:48sec</span>
                                </div>
                            </div>

                        </Container>
                        <Button variant="outline-danger" className="btn-cancel" onClick={handleClosePhoneotp}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="btn-save" onClick={handleSubmitphoneotp}>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
              
            <Modal show={showsuccessphone} onHide={handleClosesuccessphone} centered>
                <Modal.Body className="success-modal-content">
                    <Image className="success-icon" src={Right} />
                    <div className="success-title">Done</div>
                    <div className="success-message">Phone number has been updated successfully</div>
                    <Button className="btn-okay" onClick={handleClosesuccessphone}>
                        Okay
                    </Button>
                </Modal.Body>
            </Modal>


      {/* pause my account */}
      <Modal show={showPause} onHide={handleClosePause} centered>
            <Modal.Body className="pause-modal-content">
                
                <div className="pause-modal-title">Pause my Account?</div>
                <div className="pause-modal-message">
                    Your profile will be hidden and other members will not be able to see or message you. You can reactivate your account anytime.
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handleClosePause}>
                        No
                    </Button>
                    <Button variant="primary" className="btn-yes" onClick={handlePauseAccount}>
                        Yes
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
       
        <Modal show={showPauseOption} onHide={handleClosePauseOption} centered>
            <Modal.Body className="feedback-modal-content">
                <div className="feedback-modal-title">
                    Sorry we didn’t have what you were looking for this time!
                </div>
                <div className="feedback-modal-subtitle">
                    We'd love to get your feedback so we can improve
                </div>
                <Form>
                    <div className="feedback-options">
                        <Form.Check
                            type="radio"
                            label="I met somebody on myTamilDate!"
                            name="feedback"
                            id="feedback1"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option1')}
                        />
                        <Form.Check
                            type="radio"
                            label="I got too many messages from other members"
                            name="feedback"
                            id="feedback2"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option2')}
                        />
                        <Form.Check
                            type="radio"
                            label="I met somebody elsewhere"
                            name="feedback"
                            id="feedback3"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option3')}
                        />
                        <Form.Check
                            type="radio"
                            label="It's too expensive"
                            name="feedback"
                            id="feedback4"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option4')}
                        />
                        <Form.Check
                            type="radio"
                            label="The site is hard to use"
                            name="feedback"
                            id="feedback5"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option5')}
                        />
                        <Form.Check
                            type="radio"
                            label="There aren’t enough people in my area"
                            name="feedback"
                            id="feedback6"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option6')}
                        />
                        <Form.Check
                            type="radio"
                            label="Others"
                            name="feedback"
                            id="feedback7"
                            className="feedback-option"
                            onChange={() => setSelectedOption('option7')}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-danger" className="btn-cancel-pause" onClick={handleClosePauseOption}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="btn-pause" onClick={handlePauseAccountOption}>
                            Pause account
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Unsubscribe email  */}
           
        <Modal show={showUnsubscribeEmail} onHide={handleCloseUnsubscribeEmail} centered>
            <Modal.Body className="pause-modal-content">
                <div className="pause-modal-title">Cancel Auto-Renewal on your Subscription?</div>
                <div className="pause-modal-message">
                Your account will not auto-renew and your service will be interrupted on the expiry date. Keep auto-renew for a seamless experience.
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handleCloseUnsubscribeEmail}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-yes" onClick={handleUnsubscribeEmail}>
                        Keep
                    </Button>
                </div>
            </Modal.Body>
        </Modal>

        {/* delete my account */}
        <Modal show={showDeleteAccount} onHide={handleCloseDeleteAccount} centered>
            <Modal.Body className="pause-modal-content">
            <div style={{display : "flex"}}>
                <Image style={{width : "24px" , height : "24px" , marginTop : "7px"}} className="fas fa-pause-circle" src={pauseicon} />
                <div className="pause-modal-title">Pause your Account instead</div>
                </div>
                
                <div className="pause-modal-message">
                    <p>Just need a break?</p>
                <p style={{marginTop :  "-10px"}}> Pause your account and hide your profile, and come back anytime.</p>
               
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handleCloseDeleteAccount}>
                        Cancel
                    </Button>
                    <Button style={{backgroundColor : "#F7ECFF", color : "black", width : "140px", border: "none", borderRadius : "24px"}} onClick={handleShowpauseModel}>
                        Pause
                    </Button>
                </div>
                <div style={{marginTop : "20px"}}>
                <Button variant="primary" width="300px" className="btn-yes" onClick={handleDeleteAccount}>
                        Delete
                    </Button>
                </div>
            </Modal.Body>
        </Modal>

        <Modal show={showDeleteOption} onHide={handleCloseDeleteOption} centered>
            <Modal.Body className="feedback-modal-content">
                <div className="feedback-modal-title">
                    Sorry we didn’t have what you were looking for this time!
                </div>
                <div className="feedback-modal-subtitle">
                We want to improve, give us feedback and you will have a chance to win $50 CDN Amazon gift card!
                </div>
                <Form>
                    <div className="feedback-options">
                        <Form.Check
                            type="radio"
                            label="I met somebody on myTamilDate!"
                            name="feedback"
                            id="feedback1"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option1')}
                        />
                        <Form.Check
                            type="radio"
                            label="I got too many messages from other members"
                            name="feedback"
                            id="feedback2"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option2')}
                        />
                        <Form.Check
                            type="radio"
                            label="I met somebody elsewhere"
                            name="feedback"
                            id="feedback3"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option3')}
                        />
                        <Form.Check
                            type="radio"
                            label="It's too expensive"
                            name="feedback"
                            id="feedback4"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option4')}
                        />
                        <Form.Check
                            type="radio"
                            label="The site is hard to use"
                            name="feedback"
                            id="feedback5"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option5')}
                        />
                        <Form.Check
                            type="radio"
                            label="There aren’t enough people in my area"
                            name="feedback"
                            id="feedback6"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option6')}
                        />
                        <Form.Check
                            type="radio"
                            label="Others"
                            name="feedback"
                            id="feedback7"
                            className="feedback-option"
                            onChange={() => setSelectedDeleteOption('option7')}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-danger" className="btn-cancel-pause" onClick={handleCloseDeleteOption}>
                            Cancel
                        </Button>
                        <Button variant="primary"  className="btn-pause" onClick={handleDeleteAccountOption}>
                            Delete account
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    
    
        <Modal show={showFinalDetele} onHide={handleCloseFinalDetele} centered>

            <Modal.Body className="pause-modal-content">
                
                <div className="pause-modal-title">Delete your Account?</div>
                <div className="pause-modal-message">
                You cannot recover your account once deleted, are you sure you want to delete your account?
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handleCloseFinalDetele}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-yes" onClick={handleFinalDetele}>
                        Delete
                    </Button>
                </div>
            </Modal.Body>
        </Modal>

         


        </div>
    );
};