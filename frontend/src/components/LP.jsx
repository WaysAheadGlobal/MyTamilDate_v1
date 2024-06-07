import React from 'react';

import { Routes, Route } from 'react-router-dom';


import {  Headerlp} from './header';
import { Pictext} from './pic-text';
import { Stories2} from './stories2';
import {Team} from "./Team";
import {Join} from './join';
import {Footer} from './footer';
import {Video2} from './video2';
import { NavBar } from './nav'; 



export const LP=()=>{
    return(
        <>
        <NavBar/>
        <Headerlp/>
        <Pictext/>
        <Stories2/>
        <Team/>
        <Video2/>
        <Join/>
        <Footer/>
        

</>

    );
}

