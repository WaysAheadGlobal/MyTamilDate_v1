import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css';


import logo from "../assets/images/MTDlogo.png";
import lin from "../assets/images/lin.png";
import tiktok from "../assets/images/tiktok.png";
import gram from "../assets/images/gram.png";
import logo2 from "../assets/images/logo2.png";
import { Link } from 'react-router-dom';
import { Container, Image, Form, Button } from 'react-bootstrap';




export const Footer= () => {


    return (
        <>
 <div>
        <div class='footer-main'>
            <div class="foot-content">
                <div class="foot-logo-txt">
                   <Image src={logo2} className='foot-logo'></Image>
                   <p>myTamilDate (MTD) is a leading dating community for the global Tamil diaspora. Join today to find your special someone!</p>

                </div>




                <div class='flinks'>
                    {/* <span class="link-heading">Links</span> */}

                    <a target="_blank"  href="#/SuccessPage" class='linkf'>Success Stories </a>
                    <a target="_blank" href="https://tamilculture.com/user/mytamildatecom" class='linkf'> Blogs</a>
                    <a target="_blank" href="#" class='linkf'> About Us</a>
                    <a target="_blank" href="/GetInTouch" class='linkf'> Contact Us</a>
      


                </div>
                <div class='flinks'>

                    {/* <span class="link-heading">Links</span> */}

                    <a  target="_blank" href="/FaqPage"   class='linkf'> FAQs</a>
                    <a target="_blank" href="/Tnc" class='linkf'> Terms & Conditions </a>
                    <a target="_blank" href="/PrivacyPolicy" class='linkf'> Privacy Policy</a>
            

                </div>

                <div class='flinks'>
                    <span class="link-heading">Social Links</span>

                    <div class='social '>
                        <a  target="_blank" href="https://www.linkedin.com/company/5349365/admin/feed/posts/"   class='linkf'>
                         <Image className="socio" src={lin}></Image>
                        </a>
                        <a  target="_blank" href="https://www.instagram.com/mytamildate/"   class='linkf'>
                        <Image className="socio" src={gram}></Image>
                        </a>
                        <a target="_blank" href="https://www.tiktok.com/@mytamildate?lang=en"   class='linkf'>
                        <Image className="socio" src={tiktok}></Image>
                        </a>

                    </div>




                </div>
            </div>
            <div class="copyrights">
                <div class="copy-content">
                    <span class="copy-text">© 2024 myTamilDate | All Rights Reserved</span>

    

                </div>

            </div>
        </div>
    </div>
            
        </>
    );
}