import { React, useContext, useState } from "react";
import Recenter from "./recenter";
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import "./search-bar.css"
import appsettings from './../appsettings.json'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import { LocationProvider, useLocation, useLocationUpdate } from "./LocationProvider";



export default function SearchBar() {

    const setCoords = useLocationUpdate()


    function onPlaceSelect(value) {
        setCoords([value.properties.lat, value.properties.lon]);
    }

    function onSuggestionChange(value) {
        //onSuggestionChange, log value
        console.log(value);
    }

    return (
            <div className="searchBox">
                <GeoapifyContext apiKey={appsettings.geosearchKey}>
                    <GeoapifyGeocoderAutocomplete
                        placeholder="search address"
                        lang="en"
                        limit="10"
                        countryCodes="us"
                        placeSelect={onPlaceSelect}
                        suggestionsChange={onSuggestionChange}
                    >
                    </GeoapifyGeocoderAutocomplete>
                </GeoapifyContext>
            </div>
    )

}