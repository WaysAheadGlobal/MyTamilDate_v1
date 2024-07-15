import React from 'react';
import styles from './PricingCarousel.module.css';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PricingCard = () => {
  /* const stripe = useStripe();
  const elements = useElements(); */

  /* const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }; */
  return (

    <form /* onSubmit={handleSubmit} */>
      {/* <PaymentElement /> */}
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

              <h5 style={{ marginTop: "15px" }} className={styles.cardTitle} >Premium Upgrade (6 month)</h5>
              <h2 className={styles.cardPrice}>$24.99 <span>CAD</span></h2>
              <p className={styles.cardText}>Save 50% per month<br />($149.99 total)</p>
            </div>
          </div>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>Premium Upgrade (3 month)</h5>
            <h2 className={styles.cardPrice}>$33.99 <span>CAD</span></h2>
            <p className={styles.cardText}>Save 33% per month<br />($99.99 total)</p>
          </div>
        </div>


      </div>
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.continuebutton}>
          Continue
        </button>
      </div>
    </form>
  );
}

export default PricingCard;
