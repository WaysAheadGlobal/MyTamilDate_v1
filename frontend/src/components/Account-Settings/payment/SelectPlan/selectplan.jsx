import React from 'react';
import CarouselComponent from './Carousel';
import { Container, Image } from 'react-bootstrap';
import backarrow from "../../../../assets/images/backarrow.jpg";
import logo2 from "../../../../assets/images/logo2.png";
import styles from './selectplan.module.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Modal, Button, Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import PricingCarousel from './plandetails';

const Selectplan = () => {
  return (
    <div>
      <div>
        <Container className='logo-progressbar1'>
          <Container className='logo-arrow1'>
            <Image src={backarrow} className='backarrow' onClick={() => window.history.back()} />
            <Image src={logo2} alt="Logo" className='logo1' style={{ backgroundColor: 'transparent' }} />
          </Container>
        </Container>
      </div>
      <CarouselComponent />
      <div className={styles.currencyselected}>
      <div className={styles.currencyselected}>
      <div className={styles.selectWrapper}>
        <select
          name="currency"
          id="currency-select"
          className={`form-select ${styles.formSelectCurrency}`}
        >
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <div className={styles.iconContainer}>
        <IoMdArrowDropdown className={styles.dropdownIcon} />
        </div>
      </div>
    </div>
    </div>
    <div>
    <PricingCarousel/>
    </div>

    </div>
  );
}

export default Selectplan;