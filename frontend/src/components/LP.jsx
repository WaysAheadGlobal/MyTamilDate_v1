import React from 'react';

import { Routes, Route } from 'react-router-dom';


import { Headerlp } from './header';
import { Pictext } from './pic-text';


import { Join } from './join';
import { Footer } from './footer';
import { Video2 } from './video2';
import { NavBar } from './nav';
import { TheirStories } from "./theirstories";


export const LP = () => {
    return (
        <>
            <NavBar />
            <Headerlp />
            <Pictext />
            <TheirStories />
            <Video2 />
            <Join />
            <Footer />
        </>

    );
}

