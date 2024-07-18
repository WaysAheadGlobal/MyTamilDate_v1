import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Button } from 'react-bootstrap';
import backarrow from "../../../assets/images/backarrow.jpg";
import styles from './paymentMethod.module.css';
import mastercard from '../../../assets/images/mastercard.png'
import paymentcardedit from '../../../assets/images/paymentcardedit.png'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../userflow/components/sidebar/sidebar';

const PaymentMethod = () => {
  const navigate = useNavigate();
  
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
                width: "-webkit-fill-available",
                padding: "2rem"
            }}>
        
            {/* <Container className='logo-arrow3'>
              <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
              <h1 className='account-setting-heading'>My Payment Method</h1>
          
        </Container> */}
        <div className={styles.logoarrow}>
                        <Image src={backarrow} className={styles.backarroww} onClick={() => window.history.back()} alt="Back Arrow" />
                        <div className={styles.helpSupportTitle}>My Payment Method</div>
                    </div>

          <Container className={styles.paymentcard}>
            <Container className={styles.mastercard}>
              <Image src={mastercard} />
              <div className={styles.cardNumber}>
                <p>***678</p>
              </div>
            </Container>
            <Image width="24px" height="24px" src={paymentcardedit} />
          </Container>

          <Container className={styles.buttoncontainer}>
            <Button className={styles.btnnSave} onClick={() => navigate("/addpaymentmethod")}>
              Add
            </Button>
          </Container>
      
      </div>
    </Sidebar>
  );
}

export default PaymentMethod;
