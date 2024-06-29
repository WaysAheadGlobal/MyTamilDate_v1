import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Button } from 'react-bootstrap';
import backarrow from "../../../assets/images/backarrow.jpg";
import styles from './paymentMethod.module.css';
import mastercard from '../../../assets/images/mastercard.png'

import paymentcardedit from '../../../assets/images/paymentcardedit.png'
const PaymentMethod = () => {
  return (
    <div>
      <Container className='logo-progressbar3'>
        <Container className='logo-arrow3'>
          <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
          <h1  className='account-setting-heading'>
            My Payment Method
          </h1>
         
        </Container>
       

 
     <Container className={styles['paymentcard']}>
     <Container className={styles['mastercard']} >
             <Image src={mastercard} />
             <div className={styles['cardNumber']}>
            <p>***678</p>
          </div>
     </Container>
    
     <Image width="24px" height="24px" src={paymentcardedit}/>
   


     </Container>



        <Container className={styles['buttoncontainer']}>
          <Button className={styles['btnn-save']}>
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
}

export default PaymentMethod;
