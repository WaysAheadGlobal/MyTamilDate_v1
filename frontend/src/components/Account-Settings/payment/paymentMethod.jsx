import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api';
import backarrow from "../../../assets/images/backarrow.jpg";
import mastercard from '../../../assets/images/mastercard.png';
import americanexpress from '../../../assets/images/american-express.png';
import paymentcardedit from '../../../assets/images/paymentcardedit.png';
import visa from '../../../assets/images/visa-logo.png';
import { useCookies } from '../../../hooks/useCookies';
import Sidebar from '../../userflow/components/sidebar/sidebar';
import styles from './paymentMethod.module.css';
import update from '../../../assets/images/update.png';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const cookies = useCookies();

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

        {
          paymentMethods.map(paymentMethod => (
            <Container key={paymentMethod.id} className={styles.paymentcard}>
              <Container className={styles.mastercard}>
                <div style={{
                  backgroundColor: "white",
                  paddingInline: "10px",
                  borderRadius: "10px",
                }}>
                  <Image
                    src={paymentMethod.brand === "visa" ? visa : paymentMethod.brand === "mastercard" ? mastercard : americanexpress}
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={styles.cardNumber}>
                  <p>***{paymentMethod.last4}</p>
                </div>
              </Container>
              <Image width="24px" height="24px" src={paymentcardedit} />
            </Container>
          ))
        }

        <Container className={styles.buttoncontainer}>
          <Button className={styles.btnnSave} onClick={() => navigate("/addpaymentmethod")}>
            Add Payment  <span>
              <Image src={update}/>
            </span>
          </Button>
        </Container>

      </div>
    </Sidebar>
  );
}

export default PaymentMethod;
