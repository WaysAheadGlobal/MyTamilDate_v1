import React from 'react';

import { Routes, Route } from 'react-router-dom';


import { Header} from './header';
import { Pictext} from './pic-text';
import { Stories} from './stories';
import {Join} from './join';
import {Footer} from './footer';
import {Video} from './video';

export const LP=()=>{
    return(
        <>

        <Header/>
        <Pictext/>
        <Stories/>
        <Video/>
        <Join/>
        <Footer/>
        

</>

    );
}

