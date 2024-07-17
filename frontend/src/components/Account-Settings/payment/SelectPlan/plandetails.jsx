import React, { useState, useEffect } from 'react';
import styles from './PricingCarousel.module.css';
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';

const PricingCard = ({ currency }) => {
  const cookies = useCookies();
  const [priceId, setPriceId] = useState('');
  const [selectedCard, setSelectedCard] = useState(1); // Start with the middle card selected

  useEffect(() => {
    console.log('priceId', priceId);
  }, [priceId]);

  async function handlePayment() {
    const response = await fetch(`${API_URL}customer/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.getCookie('token')}`,
      },
      body: JSON.stringify({ priceId }),
    });
    const data = await response.json();

    if (response.ok) {
      window.location.assign(data.url);
    }
  }

  const handleCardClick = (priceId, index) => {
    setPriceId(priceId);
    setSelectedCard(index);
  };

  const getPrice = (basePrice) => {
    // Example conversion rates
    const rates = {
      CAD: 1,
      USD: 0.75,
      INR: 55
    };

    const convertedPrice = (basePrice * rates[currency]).toFixed(2);
    return convertedPrice;
  };

  return (
    <div>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.pricingCard} ${selectedCard === 0 ? styles.selectedCard : ''}`}
          onClick={() => handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_1_MONTHS, 0)}
        >
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>Premium Upgrade (1 month)</h5>
            <h2 className={styles.cardPrice}>{getPrice(49.99)} <span>{currency}</span></h2>
            <p className={styles.cardText}>per month</p>
          </div>
        </div>
        <div
          className={`${styles.pricingCard} ${selectedCard === 1 ? styles.selectedCard : ''}`}
          onClick={() => handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_6_MONTHS, 1)}
        >
          <div>
            <p className={styles.mostPopular}>Most Popular</p>
          </div>
          <div className={styles.cardBodypopular}>
            <h5 style={{ marginTop: "15px" }} className={styles.cardTitle}>Premium Upgrade (6 month)</h5>
            <h2 className={styles.cardPrice}>{getPrice(24.99)} <span>{currency}</span></h2>
            <p className={styles.cardText}>Save 50% per month<br />({getPrice(149.99)} total)</p>
          </div>
        </div>
        <div
          className={`${styles.pricingCard} ${selectedCard === 2 ? styles.selectedCard : ''}`}
          onClick={() => handleCardClick(process.env.REACT_APP_STRIPE_PRICE_ID_3_MONTHS, 2)}
        >
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>Premium Upgrade (3 month)</h5>
            <h2 className={styles.cardPrice}>{getPrice(33.99)} <span>{currency}</span></h2>
            <p className={styles.cardText}>Save 33% per month<br />({getPrice(99.99)} total)</p>
          </div>
        </div>
      </div>
      <div className={styles.dotContainer}>
        {[0, 1, 2].map(index => (
          <div
            key={index}
            className={`${styles.dot} ${selectedCard === index ? styles.activeDot : ''}`}
            onClick={() => setSelectedCard(index)}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.continuebutton} onClick={handlePayment}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
