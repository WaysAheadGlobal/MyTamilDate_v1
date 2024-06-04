import React from 'react';

import { Routes, Route } from 'react-router-dom';


import {  Headerlp} from './header';
import { Pictext} from './pic-text';
import { Stories} from './stories';
import {Join} from './join';
import {Footer} from './footer';
import {Video} from './video';

export const LP=()=>{
    return(
        <>

        <Headerlp/>
        <Pictext/>
        <Stories/>
        <Video/>
        <Join/>
        <Footer/>
        

</>

    );
}

