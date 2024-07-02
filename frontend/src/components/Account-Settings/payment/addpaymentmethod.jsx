import React from 'react';
import pay from './addpaymentmethod.module.css';
import { Container, Image } from 'react-bootstrap';
import backarrow from "../../../assets/images/backarrow.jpg";

import deleteicon from "../../../assets/images/deleteicon.png";
import Sidebar from '../../userflow/components/sidebar/sidebar';
import { useNavigate } from 'react-router-dom';

const AddPaymentMethod = () => {
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
        scrollbarWidth: "none"
      }}>
        <Container>
          <Container className='logo-progressbar3' style={{marginBottom : "30px"}}>
            <Container className='logo-arrow3'>
              <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
              <h1 className='account-setting-heading'>
                Add Payments
              </h1>
            </Container>
          </Container>
          <div className={pay.formContainer}>
            <form>
              <div className={pay.formGroup}>
                <div className={pay.detailandclear}>
                <label htmlFor="cardNumber">Details</label>
                <label className={pay.clearformdata} > <span ><Image src={deleteicon} style={{marginRight : "5px"}}/></span>Clear</label>
                </div>
               
                <input type="text" className={`form-control ${pay.inputField}`} id="cardNumber" placeholder="Card number" />
              </div>

              <div className={pay.formGroup} style={{ marginTop: "30px" }}>
                <label htmlFor="address">Billing Address</label>
              </div>
              <div className={pay.formGroup}>
                <label htmlFor="address">Address</label>
                <input type="text" className={`form-control ${pay.inputField}`} id="address" placeholder="" />
              </div>
              <div className={pay.formGroup}>
                <label htmlFor="city">City</label>
                <input type="text" className={`form-control ${pay.inputField}`} id="city" placeholder="" />
              </div>
              <div className={pay.formGroup}>
                <label htmlFor="state">State / Province</label>
                <input type="text" className={`form-control ${pay.inputField}`} id="state" placeholder="" />
              </div>
              <div className={pay.formGroup}>
                <label htmlFor="zip">ZIP / Postal Code</label>
                <input type="text" className={`form-control ${pay.inputField}`} id="zip" placeholder="" />
              </div>

              <p className={pay.Recurringbilling}>
                Recurring billing, cancel anytime.
              </p>

              <p className={pay.textmuted}>
                Your subscription will automatically renew for the same package length at the same price until you cancel in settings in your MTD account. By subscribing, you agree to our <a className={pay.termandconditons} onClick={() => navigate("/termandconditions")} >terms of service</a>.
              </p>

              <div className={pay.subscribeButtonContainer}>
                <button type="submit" className={pay.subscribeButtonn}>Subscribe</button>
              </div>
              <p  className={pay.textmuted}>
                Billed in CAD. Other conversions are estimates only. Actual charge may vary based on exchange rates.
              </p>
            </form>
          </div>
        </Container>
      </div>
    </Sidebar>
  );
};

export default AddPaymentMethod;
