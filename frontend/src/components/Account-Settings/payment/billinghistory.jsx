import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image } from 'react-bootstrap';
import { Modal, Button, Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import backarrow from "../../../assets/images/backarrow.jpg";
import styles from './billinghistory.module.css';
import mastercard from '../../../assets/images/mastercard.png'

import paymentcardedit from '../../../assets/images/paymentcardedit.png'
import Sidebar from '../../userflow/components/sidebar/sidebar';

const BillingHistory = () => {
  const[showmodal, setShowModal] = useState(false);
  const handlecCloseModal = ()=> setShowModal(false)
  const handleShowModal = () => setShowModal(true);
  return (
    <Sidebar>

<div style={{ flex: "1", marginInline: "auto", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", scrollbarWidth: "none" }}>
    <div>
   
    <Container className='logo-arrow3'>
              <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
              <h1 className='account-setting-heading'>My Payment Method</h1>
            </Container>
    
     <Container className={styles['paymentcard']} onClick={handleShowModal}>
           
      <Container>
        <p style={{color : "#6C6C6C"}}>Jun 17, 2024 - Jul 17, 2024 </p>
        <p style={{color : "#6C6C6C"}}>Premium Account Subscription
        (Auto - renewal) </p>
      </Container>


       <Container className={styles['paymentbelowcard']}>
     <Container className={styles['mastercard']} >
             <Image src={mastercard} />
             <div className={styles['cardNumber']}>
            <p>***678</p>
          </div>

    <Container style={{marginLeft : "50px", marginTop : "17px"}} >

     <p style={{display: "flex" ,fontSize : "24px", color : "#6C6C6C"}}>$29 <span style={{fontSize : "14px",color : "#6C6C6C",marginLeft : "10px", marginTop : "10px"}}>CAD</span> </p>
    </Container>
    
     </Container> 

      </Container>

      </Container>
     
      <Modal show={showmodal} onHide={handlecCloseModal} centered>
            <Modal.Body className="pause-modal-content">
                <div className="pause-modal-title">Cancel Auto-Renewal on your Subscription?</div>
                <div className="pause-modal-message">
                Your account will not auto-renew and your service will be interrupted on the expiry date. Keep auto-renew for a seamless experience.
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" className="btn-no" onClick={handlecCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-yes" onClick={handlecCloseModal}>
                        Keep
                    </Button>
                </div>
            </Modal.Body>
        </Modal>

    </div>
      </div>
    </Sidebar>
  );
}

export default BillingHistory;
