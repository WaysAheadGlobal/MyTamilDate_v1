import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './PricingCarousel.module.css';

const PricingCard = () => {
  return (

    <div>
    <div className={styles.cardContainer}>

       
          <div className={`${styles.pricingCard}`}>
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Premium Upgrade (1 month)</h5>
              <h2 className={styles.cardPrice}>$49 <span>CAD</span></h2>
              <p className={styles.cardText}> per month</p>
            </div>
          </div>
      
      <div>

     
          <div className={styles.pricingCard}>
          <div>
        <p className={styles.mostPopular}>Most Popular</p>
      </div>
            <div className={styles.cardBodypopular} >
            
              <h5 style={{marginTop : "15px"}} className={styles.cardTitle} >Premium Upgrade (6 month)</h5>
              <h2 className={styles.cardPrice}>$24.99 <span>CAD</span></h2>
              <p className={styles.cardText}>Save 50% per month<br/>($149.99 total)</p>
            </div>
          </div>
          </div>
     
          <div className={styles.pricingCard}>
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Premium Upgrade (3 month)</h5>
              <h2 className={styles.cardPrice}>$33.99 <span>CAD</span></h2>
              <p className={styles.cardText}>Save 33% per month<br/>($99.99 total)</p>
            </div>
          </div>
        
 
    </div>
      <div className={styles.buttonContainer}>
      <button className={styles.continuebutton}>
        Continue
 </button> 
      </div>
      </div>
  );
}

export default PricingCard;
