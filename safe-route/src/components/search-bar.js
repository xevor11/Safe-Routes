import React from "react";
import Recenter from "./recenter";
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
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <div style={{ backgroundColor: "white", height: "50%", color: "black" }}>
                    <GeoapifyContext apiKey="61d80f898ec14823899e64c8324a3f40">
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
                {/* <Button variant="contained" color="primary">
                    Search
                </Button> */}
            </div>
        </div>
    )

}