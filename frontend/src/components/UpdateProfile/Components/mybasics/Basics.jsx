import React from 'react'
import basics from './basics.module.css';
import { Image } from 'react-bootstrap';

const Basics = ({icon, detail}) => {
  return (
    <div className={basics.box}>
        <Image/>
        <p>Details</p>
    </div>
  )
}

export default Basics