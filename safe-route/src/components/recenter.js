import React, { useEffect } from "react";
import { useMap } from "react-leaflet";


const recenter = ({lat, lng}) => {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}
