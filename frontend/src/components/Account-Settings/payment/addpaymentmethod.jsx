import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Button } from 'react-bootstrap';
import backarrow from "../../../assets/images/backarrow.jpg";
import styles from './paymentMethod.module.css';

const AddPaymentMethod = () => {
  return (
    <div>
      <Container className='logo-progressbar3'>
        <Container className='logo-arrow3'>
          <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
          <h1 className='account-setting-heading'>
            My Payment Method
          </h1>
        </Container>

        <div className="payment-card-container">
      <div className="payment-card-icon">
        {/* You can replace this with an actual image if you have one */}
        <img src="https://via.placeholder.com/40" alt="Card Icon" />
      </div>
      <div className="payment-card-details">
        <span className="payment-card-number">**** 8072</span>
        <FaRegEdit className="payment-card-edit" />
      </div>
    </div>
        <Container className={styles['buttoncontainer']}>
          <Button className={styles['btnn-save']}>
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
}

export default AddPaymentMethod;
