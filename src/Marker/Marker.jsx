
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import customIcon from '../Icons/Icons';
import custDivIcons from '../Icons/divIcons';


const CustMarker = ({name, position, description, isVisited}) => {
    // const myIcon = new customIcon();
    const myDivIcon = new custDivIcons();
    if(isVisited === true){
        myDivIcon.options.className += ' text-success'; 

    }
    else{
        myDivIcon.options.className += ' text-danger';
    }

    return (
        <>
           <Marker position = {position} icon = {myDivIcon}>
            <Popup> <h6>{name}</h6> <br></br> {description}</Popup>
           </Marker>
           
        </>
    );
};

export default CustMarker;