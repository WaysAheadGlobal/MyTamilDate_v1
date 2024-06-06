import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Container from 'react-bootstrap/Container';
import './tnc.css';
import { NavBar } from './nav';
import {Footer} from './footer';
import { Button } from 'react-bootstrap';
export const Tnc = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <>
            <NavBar />
            <Container fluid className='tnc-main'>
              <h1> Terms and Conditions</h1>
              {/* <span>Last revised on Feb. 4th, 2021.</span> */}
              <p>Welcome to myTamilDate! We’re thrilled you’ve joined and look forward to helping you find your special someone.</p>
              <p>TC Global Inc. (“MTD”, "we", "us", "our" or the “Company”) is a corporation formed pursuant to the Business Corporations Act R.S.O. 1990, CHAPTER B.16 in Ontario, Canada. In consideration for permitting your access to our online dating website, applications and online services and other good and valuable consideration, you agree as follows:</p>
              <p>These terms and conditions ("Terms") form a legally binding agreement which govern your access to and use of our website and online platform hosted at https://mytamildate.com/, collectively referred to in these Terms as the “MTD Platform”.</p>
              <p>These Terms have provisions which limit our liability and impose obligations on you, the user (“you” or your”). You must review these Terms carefully before using the MTD Platform.</p>
              <p>By using MTD Platform, you represent and warrant that (1) you have attained the legal age that is statutorily required under the laws of the country in which you reside to form a binding contract with us; (2) you have read and understand these Terms and agree to personally be bound by them; and (3) you consent to your personal data being collected, stored, processed or transferred in the manner provided for in these Terms and as per our Privacy Policy. Our Privacy Policy is available online for your review at https://mytamildate.com/Privacy and is incorporated by reference in these Terms.</p>
             
             <p>If you do not agree to be bound by these Terms or our Privacy Policy, you are not authorized to access or use the MTD Platform.</p>
             <h4>Amendments</h4>

              <p>As the MTD Platform continues to evolve, we may, at any time, revise these Terms and our policies by updating this page or the page hosting the relevant policy. The date of the last version of these Terms is posted above. As you are bound by these Terms each time you use the MTD Platform, you are responsible for periodically reviewing the amendments to these Terms and you are deemed to have accepted and agreed to such amendments by accessing and using the MTD Platform after such amendments have been posted. If you do not agree with the amendments, you shall immediately stop accessing the MTD Platform and terminate your account, subject to the terms provided for herein. We may also undertake to send you an email or display notice of any changes to the Terms or policies in your account.</p>
              <h4>Establishing an Account</h4>
              <p>
To use the MTD Platform you will be required to register an account (“Account”) and provide certain personal information as referenced in our Privacy Policy. We may also allow you to create an account via third party providers such as Facebook and others. If you elect to establish your account via a third party provider, you agree to permit us to collect the personal information such third party sends us to establish and maintain your account.</p>
              <p>Regardless of whether you pay for your Account or not, you agree that access to your Account constitutes good and valuable consideration in exchange for agreeing to these Terms, our Privacy Policy and all other documents and policies incorporated by reference.</p>
              <p>
While we may reject the creation of your Account for any reason, upon our approval to establish your Account, we grant you a non-transferable, non-exclusive license to access the MTD Platform in accordance with these Terms. However, we reserve the right to revoke that license and your access to the MTD Platform without justification or cause, at any time. We make no representations or warranties as to the ongoing availability of the MTD Platform, or your access to it.</p>
              <p>

In registering an Account, you agree to (1) provide true, accurate, current, and complete information about yourself as prompted by the MTD Platform registration form (the “Registration Data”); and (2) maintain and promptly update the Registration Data to keep it true, accurate, current, and complete. If you provide any information, including Registration Data, that is untrue, inaccurate, not current or incomplete, or MTD has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, MTD has the right to suspend or terminate your Account and refuse any and all current or future use of the MTD Platform (or any portion thereof). We reserve the right to remove or reclaim any usernames at any time and for any reason, including but not limited to, claims by a third party that a username violates the third party’s rights. You agree not to create an Account or use the MTD Platform if you have been previously removed from the MTD Platform by us.</p>
             
             <h4>Account Types</h4>
              <p>

We offer both “Free Member” and Premium Member” accounts. Upon establishing your account, and subject to our account approval process, you will become a "Free Member". Free Members do not have access to all of the features associated with Premium Member accounts. For more details on the benefits of a Premium Member account, visit our website. Premium Members are required to pay a fee to access the additional account features.</p>
<h4>Fees</h4>
              <p>Our fees for Premium Member accounts are displayed on the MTD Platform. By agreeing to these Terms, if you elect to establish a Premium Member account, you agree to pay all fees associated with or arising from your account, as referenced on the MTD Platform. Our fees are subject to change at any time. If you are an existing Premium Member, we will provide you with a minimum of seven (7) days’ notice of any such changes (via email and/or within your account) prior to your automatic renewal. You may elect to not renew your account after such changes have been communicated to you in accordance with the termination provisions of this agreement.</p>
              <p>You agree to pay any and all sales taxes, whether Canadian or foreign, applicable to this agreement or arising in any way from your account and access to and use of the MTD Platform.</p>
           <p>

Additional payment and renewal terms, including terms related to your account, may be specified on the MTD Platform. Those terms, as amended from time to time, are incorporated by reference and form part of this agreement.</p>
{/* <Container className='tnc-checkbox-box'>
                    <input 
                        type="checkbox" 
                        id="agree" 
                        name="agree" 
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <label htmlFor="agree">I accept the Terms and Conditions</label>
                </Container>



<Container  className='tnc-btn-box' ><Button className='tnc-btn' disabled={!isChecked}>OK</Button></Container> */}
            </Container>

            <Footer/>
        </>
    );
};