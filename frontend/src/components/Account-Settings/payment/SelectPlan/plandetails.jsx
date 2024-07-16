import React, { useEffect } from 'react';
import styles from './PricingCarousel.module.css';
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';

const PricingCard = () => {
  const cookies = useCookies();
  const [priceId, setPriceId] = React.useState('');

  useEffect(() => {
    console.log('priceId', priceId);
  }, [priceId])

  async function handlePayment() {
    const response = await fetch(`${API_URL}customer/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.getCookie('token')}`,
      },
      body: JSON.stringify({
        priceId
      }),
    });
    const data = await response.json();

    if (response.ok) {
      window.location.assign(data.url);
    }
  }

  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={`${styles.pricingCard}`} onClick={() => setPriceId(process.env.REACT_APP_STRIPE_PRICE_ID_1_MONTHS)}>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>Premium Upgrade (1 month)</h5>
            <h2 className={styles.cardPrice}>$49.99 <span>CAD</span></h2>
            <p className={styles.cardText}> per month</p>
          </div>
        </div>
        <div onClick={() => setPriceId(process.env.REACT_APP_STRIPE_PRICE_ID_6_MONTHS)}>
          <div className={styles.pricingCard}>
            <div>
              <p className={styles.mostPopular}>Most Popular</p>
            </div>
            <div className={styles.cardBodypopular} >
              <h5 style={{ marginTop: "15px" }} className={styles.cardTitle}>Premium Upgrade (6 month)</h5>
              <h2 className={styles.cardPrice}>$24.99 <span>CAD</span></h2>
              <p className={styles.cardText}>Save 50% per month<br />($149.99 total)</p>
            </div>
          </div>
        </div>

        <div className={styles.pricingCard} onClick={() => setPriceId(process.env.REACT_APP_STRIPE_PRICE_ID_3_MONTHS)}>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>Premium Upgrade (3 month)</h5>
            <h2 className={styles.cardPrice}>$33.99 <span>CAD</span></h2>
            <p className={styles.cardText}>Save 33% per month<br />($99.99 total)</p>
          </div>
        </div>


      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.continuebutton} onClick={handlePayment}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
