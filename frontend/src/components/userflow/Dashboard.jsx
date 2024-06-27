import React from 'react'
import Sidebar from './sidebar/sidebar';
import Card from './card/Card';

export default function Content() {
    return (
        <Sidebar>
            <Card />
            {/* <Card />
            <Card />
            <Card /> */}
        </Sidebar>
    )
}
