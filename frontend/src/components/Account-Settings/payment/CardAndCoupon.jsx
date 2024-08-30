import React, { useEffect, useState } from 'react'
import Sidebar from '../../userflow/components/sidebar/sidebar'
import pay from './CardandPayment.module.css'
import { useCookies } from '../../../hooks/useCookies';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../../../Context/AlertModalContext';
import { API_URL } from '../../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Form, Image, Modal } from 'react-bootstrap';
import crousleone from '../../../assets/images/crau1.png';
import crousletwo from '../../../assets/images/crau2.png';
import crouslethree from '../../../assets/images/crau3.png';
import styles from '../payment/newpayment/carousel.module.css';

import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSearchParams } from 'react-router-dom';



const CardandPayment = () => {

    const location = useLocation();
  const { priceId, product, currency,selectedCard } = location.state || {};
  console.log(priceId, product, currency,selectedCard);
    const cookies = useCookies();
    const [paymentMethods, setPaymentMethods] = useState([]);
   
    // const [selectedCard, setSelectedCard] = useState(2); 
    const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [coupon, setCoupon] = useState('');
    const [percentOff, setPercentOff] = useState(0);
    const [amountOff, setAmountOff] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('CAD'); 
   
    const [cardNumberValid, setCardNumberValid] = useState(null);
    const [matchmodal, setMatchmodal] = useState(false);
    const [showModal, setshowmodal] = useState(false);
    const handleShow = () => setMatchmodal(true);
    const handleClose = () => setMatchmodal(false);
    const [key, setKey] = useState(0);
    const stripe = useStripe();
    const elements = useElements();
    const searchParams = useSearchParams();
    const [carderror, setCarderror] = useState("");

    const [showpaymentsuccess, setShowshowpaymentsuccess] = useState(false);
    const Gotohomepage = ()=>{
        setshowmodal(false);
        window.location.href = '/user/home';
    }

    const rates = [
        "CAD",
        "USD",
        "GBP",
        "EUR",
        "AUD",
    ];

    function validateCardNumber(number) {
        // Remove all non-digit characters
        const sanitized = number.replace(/[^0-9]/g, '');
        let sum = 0;
        let shouldDouble = false;

        // Iterate over the card number digits in reverse order
        for (let i = sanitized.length - 1; i >= 0; i--) {
            let digit = parseInt(sanitized[i]);

            if (shouldDouble) {
                // Double the digit and if it becomes greater than 9, subtract 9
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        // If the total sum is divisible by 10, the card number is valid
        return sum % 10 === 0;
    }


    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const [price, setPrice] = useState({
        m1: {
            monthly: 49.99,
            productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS,
        },
        m3: {
            monthly: 33.99,
            total: 99.99,
            productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS,
        },
        m6: {
            monthly: 24.99,
            total: 149.99,
            productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS,
        },
    });

    useEffect(() => {
        console.log('priceId', priceId);
    }, [priceId]);


    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}customer/payment/methods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`,
                }
            });
            const data = await response.json();

            if (response.ok) {
                setPaymentMethods(data);
                console.log(paymentMethods);
            }

        })()
    }, []);

    async function handlePayment() {
        setLoading(true);
        console.log( "priceId", priceId)
        console.log( "product", product)
        console.log("tokken", cookies.getCookie('token'))
        try {
            const path = coupon ? `/${coupon}` : '';
            const response = await fetch(`${API_URL}customer/payment/create-subscription${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`,
                },
                body: JSON.stringify({ priceId, product }),
            });
            const data = await response.json();

            if (response.ok) {
                setLoading(false)
                if (data.url) {
                    alert.setModal({
                        show: true,
                        message: data.message,
                        title: '',
                        onButtonClick: () => {
                            navigate(data.url);
                        }
                    });
                } else {
                    setLoading(false)
                    setshowmodal(true);
                }
            }
        } catch (error) {
            alert.setModal({
                show: true,
                message: "Something went wrong. Please try again later.",
                title: '',
            });
        } finally {
            setLoading(false);
        }
    }



    const getPrice = (basePrice, productId) => {
        // Example conversion rates
        const rates = {
            CAD: 1,
            USD: 0.73,
            GBP: 0.56,
            EUR: 0.67,
            AUD: 1.1,
        };

        let convertedPrice = basePrice * rates[selectedCurrency];

        if (percentOff && product === productId) {
            convertedPrice = (convertedPrice - (convertedPrice * percentOff / 100)).toFixed(2);
        } else if (amountOff && product === productId) {
            convertedPrice = (convertedPrice - amountOff).toFixed(2);
        } else {
            convertedPrice = convertedPrice.toFixed(2);
        }

        return convertedPrice;
    };

    useEffect(() => {
        setPrice({
            m1: {
                monthly: getPrice(49.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS),
                total: getPrice(49.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS),
                productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS,
            },
            m3: {
                monthly: getPrice(33.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS),
                total: getPrice(99.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS),
                productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS,
            },
            m6: {
                monthly: getPrice(24.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS),
                total: getPrice(149.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS),
                productId: process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS,
            }
        });
    }, [selectedCurrency, percentOff, amountOff]);

    async function checkCouponValidity() {
        if (!coupon) {
            setError('Please enter a promo code');
            return;
        }
        console.log(product);
        try {
            const response = await fetch(`${API_URL}customer/payment/check-valid-coupon/${product}/${coupon}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.valid) {
                    setPercentOff(data.percentOff);
                    setAmountOff(data.amountOff);
                    setError('');
                    setShow(false);
                } else {
                    setError(data.message ?? 'Invalid promo code');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function addPaymentMethod(e) {
        setLoading(true);
        e.preventDefault();

        if (!stripe || !elements) {
           
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);



        const { error, token } = await stripe.createToken(cardNumberElement);

        if (error) {
            console.log('[error]', error);
            console.log(token);
            setCarderror(error.message)
            return;
        }

        const response = await fetch(`${API_URL}customer/payment/create-payment-method`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.getCookie('token')}`,
            },
            body: JSON.stringify({ token: token.id }),
        });
        const data = await response.json();

        if (response.ok) {
            if (searchParams[0].get('type') === 'subscribe') {
    
            }
            handlePayment();
        
        }
    }





    return (
        <Sidebar>
            <div style={{
                flex: "1",
                marginInline: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflowY: "auto",

                width: "-webkit-fill-available",
            }}>
                <div className={pay.maincontainer}>

                  
                    <div className={pay.carddetails}>
                        <div style={{
                            flex: "1",
                            marginInline: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            overflowY: "auto",
                            // padding : "2rem",
                            padding: "8px",
                            height: "calc(100vh - 64px)",
                            width: "100%"
                        }}>

                            <div className={pay.selectedplandetails}>
                                <p style={{
                                    display : "flex",
                                    justifyContent : "center",
                                    flexDirection :"column",
                                    alignItems : "center"
                                }} > <span style={{ marginRight: "20px" }}>
                                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.84167 0.0624499C2.53827 0.0624499 3.10527 0.629449 3.10527 1.32605C3.10527 1.77785 2.86767 2.18465 2.46987 2.41505C2.28267 2.52305 2.21967 2.76245 2.32767 2.94965L6.58287 10.3189C6.65307 10.4395 6.78087 10.5151 6.92127 10.5151C7.06167 10.5151 7.18947 10.4413 7.25967 10.3189L11.5149 2.94785C11.6229 2.76065 11.5599 2.52305 11.3727 2.41505C10.9749 2.18465 10.7391 1.77785 10.7391 1.32785C10.7391 0.63125 11.3061 0.06425 12.0027 0.06425C12.6993 0.06425 13.2663 0.63125 13.2663 1.32785C13.2663 1.77965 13.0287 2.18645 12.6291 2.41685C12.5391 2.46905 12.4743 2.55365 12.4473 2.65445C12.4203 2.75525 12.4347 2.86145 12.4869 2.95145L16.7457 10.3207C16.8159 10.4412 16.9437 10.5169 17.0841 10.5169C17.2245 10.5169 17.3523 10.4431 17.4225 10.3207L21.6777 2.95145C21.7857 2.76425 21.7209 2.52485 21.5355 2.41685C21.1377 2.18645 20.9001 1.77965 20.9001 1.32785C20.9001 0.63125 21.4671 0.06425 22.1637 0.06425C22.8603 0.06425 23.4273 0.63125 23.4273 1.32785C23.4273 2.02445 22.8603 2.59145 22.1637 2.59145C21.9477 2.59145 21.7731 2.76605 21.7731 2.98205V14.1493H13.0107C12.7947 14.1493 12.6201 14.3239 12.6201 14.5399C12.6201 14.7559 12.7947 14.9304 13.0107 14.9304H21.7731V17.9328H2.23407V2.98025C2.23407 2.76425 2.05947 2.58965 1.84348 2.58965C1.14688 2.58965 0.579875 2.02265 0.579875 1.32605C0.579875 0.629449 1.14507 0.0624499 1.84167 0.0624499Z" fill="#F97972" />
                                    </svg>
                                </span>  Premium Account Upgrade ({selectedCard === 0 ? '1 month' : selectedCard === 2 ? '3 months' : '6 months'})</p>

                                <div className={pay.finalsubtotal} >


                                    <p>
                                        Subtotal : ${selectedCard === 0 ? `${price.m1.total}` : selectedCard === 2 ? `${price.m3.total}` : `${price.m6.total}`} {selectedCurrency}
                                    </p>
                                    <p style={{
                                        marginLeft: "27px"
                                    }}>
                                        Total : ${selectedCard === 0 ? `${price.m1.total}` : selectedCard === 2 ? `${price.m3.total}` : `${price.m6.total}`} {selectedCurrency}
                                    </p>
                                </div>
                            </div>
                            <div onClick={() => {
                                setShow(true);
                            }} className={pay.redeempromocode}>
                                <p>
                                    <span style={{ marginRight: "20px" }}>
                                     
                                    </span>
                                    Redeem your promo code
                                </p>
                            </div>
                            <div className={pay.fillcarddetails}>
                                <div style={{ marginTop: "10px" }}>


                                    <div className={pay.formContainer}>
                                        <form key={key} onSubmit={addPaymentMethod}>
                                            {/* <CardElement  /> */}
                                            <div className={pay.formGroup}>
                                                <div className={pay.detailandclear}>
                                                    <label
                                                        style={{
                                                            color: "#000000",

                                                        }} htmlFor="cardNumber">Details</label>
                                                   
                                                </div>
                                                <div className={pay.formGroup}>
                                                    {/* <div className={`form-control ${pay.inputField}`} style={{
                                                        padding: "10px",
                                                    }}>
                                                        
                                                        <CardNumberElement
                                                            className={pay.cardElement}
                                                            options={{ style: { base: { fontSize: '16px' } } }}
                                                            onChange={handleCardNumberChange}
                                                        />
                                                       
                                                    </div> */}
                                                    <div className={`form-control ${pay.inputField}`} style={{ padding: "10px" }}>
                                                        {
                                                            paymentMethods.length >= 1
                                                                ? <input style={{ border: "none", outline: "none" }} type="text" value={`**** **** **** ${paymentMethods[0].last4}`} readOnly />
                                                                : <CardNumberElement />
                                                        }
                                                    </div>
                                                    {/* {cardNumberValid !== null && (
                                                            <span className={cardNumberValid ? pay.valid : pay.invalid}>
                                                                {cardNumberValid ? '' : <Form.Text className="text-danger error-message">*Invalid Card Number.</Form.Text>}
                                                            </span>
                                                        )} */}

                                                </div>
                                                <div>

                                                    {carderror && <p className="text-danger error-message">{carderror}</p>}
                                                </div>

                                                {
                                                    paymentMethods.length >= 1
                                                        ? "" :
                                                        <div style={{
                                                            display: "flex",
                                                            width: "100%",
                                                            gap: "15px",
                                                        }}>
                                                            <div className={pay.formGroup} style={{
                                                                width: "100px",
                                                            }}>
                                                                <div className={`form-control ${pay.inputField}`} style={{
                                                                    padding: "10px",
                                                                }}>
                                                                    <CardExpiryElement />
                                                                </div>
                                                            </div>
                                                            <div className={pay.formGroup} style={{
                                                                width: "100px",
                                                            }}>
                                                                <div className={`form-control ${pay.inputField}`} style={{
                                                                    padding: "10px",
                                                                }}>
                                                                    <CardCvcElement />
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                            </div>


                                            <div className={pay.formGroup} style={{ marginTop: "30px" }}>
                                                <label style={{
                                                    color: "#000000",
                                                    fontSize: "18px"
                                                }} htmlFor="address">Billing Address</label>
                                            </div>
                                            <div className={pay.formGroup}>
                                                <label htmlFor="address">Address</label>
                                                <input type="text" className={`form-control ${pay.inputField}`} id="address" placeholder="" />
                                            </div>
                                            <div className={pay.formGroup}>
                                                <label htmlFor="city">City</label>
                                                <input type="text" className={`form-control ${pay.inputField}`} id="city" placeholder="" />
                                            </div>
                                            <div className={pay.formGroup}>
                                                <label htmlFor="state">State / Province</label>
                                                <input type="text" className={`form-control ${pay.inputField}`} id="state" placeholder="" />
                                            </div>
                                            <div className={pay.formGroup}>
                                                <label htmlFor="zip">ZIP / Postal Code</label>
                                                <input type="text" className={`form-control ${pay.inputField}`} id="zip" placeholder="" />
                                            </div>

                                            <p className={pay.Recurringbilling}>
                                                Recurring billing, cancel anytime.
                                            </p>

                                            <p className={pay.textmuted}>
                                                Your subscription will automatically renew for the same package length at the same price until you cancel in settings in your MTD account. By subscribing, you agree to our 
                                                <a
                                                    className={pay.termandconditons}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.open("/termandconditions", "_blank");
                                                    }}
                                                >
                                                     {" "}terms of service
                                                </a>.
                                            </p>

                                            <div className={pay.subscribeButtonContainer}>
                                                {
                                                    paymentMethods.length >= 1 ? <button className="global-next-btn" onClick={handlePayment}> {loading ? 'Processing...' : 'Continue'}</button> : <button type="submit" className="global-next-btn">  {loading ? 'Processing...' : 'Submit'}</button>
                                                }
                                                {/* <button type="submit" className="global-next-btn">Submit</button> */}
                                            </div>

                                            <p className={pay.textmuted}>
                                                Billed in CAD. Other conversions are estimates only. Actual charge may vary based on exchange rates.
                                            </p>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    

                </div>

            </div>

            <Modal size='lg' style={{ padding: "30px" }} centered show={show}>
                <Modal.Body>
                    <p style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        margin: "0",
                        marginBottom: "1rem",
                        color: "black"
                    }}>Redeem your promo code</p>
                    <input
                        type="text"
                        placeholder="Enter your promo code"
                        value={coupon}
                        style={{
                            width: "100%",
                            padding: "1rem",
                            borderRadius: "10px",
                            border: error ? "2px solid #ff0101" : "2px solid #6c6c6c",
                            outline: "none",
                            color: error ? "#ff0101" : "black",
                        }}
                        onChange={(e) => {
                            setCoupon(e.target.value);
                            setError('');
                        }} />

                    {error && <Form.Text className="text-danger error-message">*{error}.</Form.Text>}

                    {/* {error && <p style={{ color: "#ff0101", fontSize: "14px", margin: "0", marginTop: "0.5rem", textAlign: "left" }}>{error}</p>} */}
                    <div style={{
                        marginTop: "4rem",
                        display: "flex",
                        gap: "1rem",
                        marginInline: "auto",
                    }}>
                        <button
                            className='global-cancel-button'
                            type='button'
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className='global-save-button'
                            onClick={checkCouponValidity}
                        >
                            Submit
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal centered className="selfie-modal" show={showModal} onHide={() => setshowmodal(false)}>
                    <Modal.Body className='selfie-modal-body'>
                    Payment successful! Your myTamilDate subscription is now active.
                       
                        <button  className='global-save-button'  onClick={ Gotohomepage}>
                        Okay
                            </button>
                    </Modal.Body>
                </Modal>

           
        </Sidebar>
    )
}

export default CardandPayment;


