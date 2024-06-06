import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Container from 'react-bootstrap/Container';
import './privacy-policy.css';
import { NavBar } from './nav';
import {Footer} from './footer';
import { Button } from 'react-bootstrap';
export const PrivacyPolicy = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <>
            <NavBar />
            <Container fluid className='policy-main'>
              <h1>Privacy Policy</h1>
              {/* <span>Last revised on Feb. 4th, 2021.</span> */}
              <p>TC Global Inc. (“MTD”, "we", "us", "our" or the “Company”) is a corporation formed pursuant to the Business Corporations Act R.S.O. 1990, CHAPTER B.16 in Ontario, Canada. Further to our terms of use (https://mytamildate.com/TermsConditions) (the “Terms”), this Privacy Policy sets out how we collect, store and use personal information and cookies. Unless otherwise indicated, any capitalized terms in this Privacy Policy have the same meaning attributed to them in our Terms.</p>

<p>By agreeing to our Terms or by using the MTD Platform, you consent to the collection and use of personal information in accordance with this Privacy Policy, which may update from time to time.</p>
<p>If you believe that we have not adhered to this Privacy Policy or have any questions related to our privacy practices, please contact us at hello@mytamildate.com.</p>
<h4>PART I: COLLECTION OF PERSONAL INFORMATION</h4>
<p>The Personal Information of Other Individuals</p>
<p>To the extent you provide us with, or upload data that includes the personal information of another individual, you represent and warrant that you have that individual’s consent to provide us with their information to use in accordance with this Privacy Policy and our Terms. If you do not have their consent, you agree not to upload or provide us with any such personal information.</p>
<p>Your Personal Information</p>
<p>

To establish an account with us and to use the MTD Platform, we will collect the following personal information:</p>
<ul>
    <li>First and last name:</li>
    <li>Date of birth:</li>
    <li>
Email address:</li>
    <li>A username or nickname:</li>
    <li>Phone number:</li>
    <li>Your gender:</li>
    <li>
City or town of residence</li>
<li>Profile and other photos (where you elect to upload them):</li>
<li>Internet Protocol (“IP”) address which may be associated with your location:</li>
<li>
Website statistics and analytics data regarding your use of the MTD Platform:</li>
<li>

Other types of raw data relating to how you interact with the MTD Platform, for example, your browser information and session duration:</li>
<li>Any other personal information you upload to the MTD Platform or otherwise voluntarily provide to us, including in your correspondence with us, profile set up, comments or messages on the MTD Platform;</li>
</ul>

<p>your correspondence with us, profile set up, comments or messages on the MTD Platform;
Once you have registered an account, you will be given the option of creating a pseudonymous profile (i.e. a profile with just a username and personal description). You will be asked for some personal but non-identifying information to complete your profile. For example, you may be asked whether you have dependents, your height, race, religion, whether you smoke, etc. This information is not linked, in any way, to your personally identifiable information for other members to view publicly on the MTD Platform. However, if you elect to use your real name, or provide us with or otherwise upload or use a photograph or video on the MTD Platform, the information associated with your account will or may become personally identifiable information.
</p>
<p>

We also allow users to create an account via third party account login providers such as Facebook. If you elect to establish your account via a third party provider, you permit us to collect and use the personal information such third party sends us to establish and maintain your account. This may include your name, profile photo and other account information.</p>
<p>Payment Processing</p>

<p>If you become a paying member of the MTD Platform, we also collect credit card and payment information from you via a third-party payment processor. As of the last date this Privacy Policy was updated, we use PayPal Canada Co. and its subsidiaries or affiliates, with their privacy statement available at https://www.paypal.com/ca/webapps/mpp/ua/privacy-full?locale.x=en_CA#PayPal.</p>
<p>Although we may display their forms on the MTD Platform (or webpages linked to the MTD Platform), when you provide your payment details, you are providing them to the applicable payment processor. You acknowledge that our third-party payment processors may have their own agreements which apply to you. While we will not have access to your entire credit card number, we will be able to bill your credit card and may have access to certain card and payment details such as the name on your card, billing address and card expiration date. If you have questions regarding our payment processor, please contact us.</p>

<p>We may also use Stripe, Inc. to process certain credit and debit card payments from you along with their related and affiliated entities. Their privacy policy is available at https://stripe.com/en-ca/privacy.</p>























{/* <Container className='policy-checkbox-box'>
                    <input 
                        type="checkbox" 
                        id="agree" 
                        name="agree" 
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <label htmlFor="agree">I accept the Terms and Conditions</label>
                </Container>



<Container  className='policy-btn-box' ><Button className='policy-btn' disabled={!isChecked}>OK</Button></Container> */}
            </Container>

            <Footer/>
        </>
    );
}