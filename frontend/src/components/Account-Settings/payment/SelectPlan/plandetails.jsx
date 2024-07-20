import React, { useState, useEffect } from 'react';
import styles from './PricingCarousel.module.css';
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';
import { useAlert } from '../../../../Context/AlertModalContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../userflow/components/button/Button';
import { Modal } from 'react-bootstrap';

const PricingCard = ({ currency }) => {
  const cookies = useCookies();
  const [priceId, setPriceId] = useState(process.env.REACT_APP_STRIPE_PRICE_ID_6_MONTHS);
  const [selectedCard, setSelectedCard] = useState(1); // Start with the middle card selected
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [percentOff, setPercentOff] = useState(0);
  const [amountOff, setAmountOff] = useState(0);
  const [product, setProduct] = useState(process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS);

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


  async function handlePayment() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}customer/payment/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.getCookie('token')}`,
        },
        body: JSON.stringify({ priceId, coupon, product }),
      });
      const data = await response.json();

      if (response.ok) {
        if (data.url) {
          alert.setModal({
            show: true,
            message: data.message,
            title: 'Error',
            onButtonClick: () => {
              navigate(data.url);
            }
          });
        } else {
          alert.setModal({
            show: true,
            message: data.message,
            title: 'Success',
            onButtonClick: () => {
              window.location.assign('/user/home');
            }
          });
        }
      }
    } catch (error) {
      alert.setModal({
        show: true,
        message: "Something went wrong. Please try again later.",
        title: 'Error',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCardClick = (priceId, index) => {
    setPriceId(priceId);
    setSelectedCard(index);
  };

  const getPrice = (basePrice, productId) => {
    // Example conversion rates
    const rates = {
      CAD: 1,
      USD: 0.73,
      GBP: 0.56,
      EUR: 0.67,
      AUD: 1.1,
    };

    let convertedPrice = basePrice * rates[currency];

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
  }, [currency, percentOff, amountOff]);

  async function checkCouponValidity() {
    if (!coupon) {
      setError('Please enter a promo code');
      return;
    }
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


  return (
    <>
      <div>
        <div className={styles.cardContainer}>
          <div
            className={`${styles.pricingCard} ${selectedCard === 0 ? styles.selectedCard : ''}`}
            onClick={() => {
              handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_1_MONTHS, 0)
              setProduct(process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS);
            }}
          >
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Premium Upgrade (1 month)</h5>
              <h2 className={styles.cardPrice}>{/* getPrice(49.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_1_MONTHS) */ price.m1.monthly} <span>{currency}</span></h2>
              <p className={styles.cardText}>per month</p>
            </div>
          </div>
          <div
            className={`${styles.pricingCard} ${selectedCard === 1 ? styles.selectedCard : ''}`}
            onClick={() => {
              handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_6_MONTHS, 1)
              setProduct(process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS);
            }}
          >
            <div>
              <p className={styles.mostPopular}>Most Popular</p>
            </div>
            <div className={styles.cardBodypopular}>
              <h5 style={{ marginTop: "15px" }} className={styles.cardTitle}>Premium Upgrade (6 month)</h5>
              <h2 className={styles.cardPrice}>{/* getPrice(24.99) */ price.m6.monthly} <span>{currency}</span></h2>
              <p className={styles.cardText}>Save 50% per month<br />({/* getPrice(149.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_6_MONTHS) */ price.m6.total} total)</p>
            </div>
          </div>
          <div
            className={`${styles.pricingCard} ${selectedCard === 2 ? styles.selectedCard : ''}`}
            onClick={() => {
              handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_3_MONTHS, 2)
              setProduct(process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS);
            }}
          >
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Premium Upgrade (3 month)</h5>
              <h2 className={styles.cardPrice}>{/* getPrice(33.99, process.env.REACT_APP_STRIPE_PRODUCT_ID_3_MONTHS) */ price.m3.monthly} <span>{currency}</span></h2>
              <p className={styles.cardText}>Save 33% per month<br />({/* getPrice(99.99) */price.m3.total} total)</p>
            </div>
          </div>
        </div>
        <div className={styles.dotContainer}>
          {[0, 1, 2].map(index => (
            <div
              key={index}
              style={{
                zIndex: 1,
              }}
              className={`${styles.dot} ${selectedCard === index ? styles.activeDot : ''}`}
              onClick={() => setSelectedCard(index)} />
          ))}
        </div>
        <Button style={{
          marginInline: "auto",
          display: "block",
          marginBlock: "1rem"
        }} onClick={() => {
          setShow(true);
        }}>
          Redeem your promo code
        </Button>
        <div className={styles.buttonContainer}>
          <button className={styles.continuebutton} onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
      <Modal size='sm' centered show={show}>
        <Modal.Body>
          <p style={{
            fontSize: "large",
            fontWeight: "600",
            margin: "0",
            marginBottom: "1rem",
            color: "#6c6c6c"
          }}>Enter your promo code</p>
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
          {error && <p style={{ color: "#ff0101", fontSize: "14px", margin: "0", marginTop: "0.5rem", textAlign: "left" }}>{error}</p>}
          <div style={{
            marginTop: "1rem",
            display: "flex",
            gap: "1rem",
            marginInline: "auto",
          }}>
            <button
              type='button'
              style={{
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                border: "2px solid #6c6c6c",
                color: "#6c6c6c",
                backgroundColor: "transparent"
              }}
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </button>

            <Button
              onClick={checkCouponValidity}
              style={{
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
              }}
            >
              Redeem
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PricingCard;
