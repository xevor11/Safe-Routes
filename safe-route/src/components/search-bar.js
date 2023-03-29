import { React, useContext, useState } from "react";
import Recenter from "./recenter";
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import "./search-bar.css"
import appsettings from './../appsettings.json'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';


export default function SearchBar() {

    const [coords, setCoords] = useState([]);

    function onPlaceSelect(value) {
        setCoords([value.properties.lat, value.properties.lon]);
        console.log(value.properties.lat, value.properties.lon);
        console.log("hello from onplaceselect");
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