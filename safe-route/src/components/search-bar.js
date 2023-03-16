import React from "react";
import Recenter from "./recenter";
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import "./search-bar.css"
import appsettings from './../appsettings.json'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';



export default function SearchBar() {

    function onPlaceSelect(value) {
        let coords = [value.properties.lat, value.properties.lon];
        console.log(coords);
        Recenter(coords[0], coords[1]);
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