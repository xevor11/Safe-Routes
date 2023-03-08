import React, { useEffect } from "react";
import { useMap } from "react-leaflet";


const Recenter = ({ lat, lng }) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

export default Recenter;