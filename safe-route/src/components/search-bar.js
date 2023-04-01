import { React } from "react";
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import "./search-bar.css"
import appsettings from './../appsettings.json'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import { useLocation } from "./LocationProvider";
import { useDestLocationUpdate } from "./LocationProvider";

export default function SearchBar() {

    const setDestCoords = useDestLocationUpdate()
    //extrapolate object from useContext hook


    function onPlaceSelect(value) {
        setDestCoords({lat: value.properties.lat, lng: value.properties.lon});
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