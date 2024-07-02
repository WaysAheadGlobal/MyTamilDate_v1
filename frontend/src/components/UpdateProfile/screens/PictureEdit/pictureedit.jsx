import React from 'react'
import { Image } from 'react-bootstrap'
import picture from './pictureedit.module.css'
import questionmark from '../../../../assets/images/questionmark.png';

const Pictureedit = () => {



  return (
    <div>
        
        <div className={picture.container}>
            <p>Update Your Profile</p>
            <Image src={questionmark}/>
        </div>
        
        
    </div>
  )
}



export default Pictureedit;



