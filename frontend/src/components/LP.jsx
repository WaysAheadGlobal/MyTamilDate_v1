import React from 'react';

import { Routes, Route } from 'react-router-dom';


import {  Headerlp} from './header';
import { Pictext} from './pic-text';
import { Stories} from './stories';
import {Join} from './join';
import {Footer} from './footer';
import {Video} from './video';
import { NavBar } from './nav'; 

export const LP=()=>{
    return(
        <>
       <NavBar/>
        <Headerlp/>
        <Pictext/>
        <Stories/>
        <Video/>
        <Join/>
        <Footer/>
        

</>

    );
}

