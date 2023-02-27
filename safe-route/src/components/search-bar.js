import React from "react";
//import { useState } from 'react';
//import { OutlinedInput, Button } from '@mui/material'
//import { height } from "@mui/system";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
//import '@geoapify/geocoder-autocomplete/styles/minimal.css'


export default function SearchBar() {

    function onPlaceSelect(value) {
        console.log(value);
    }

    function onSuggestionChange(value) {
        console.log(value);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <div style={{ backgroundColor: "white", height: "50%", color: "black" }}>
                    <GeoapifyContext apiKey = "61d80f898ec14823899e64c8324a3f40">
                        <GeoapifyGeocoderAutocomplete
                            placeholder="search address"
                            type="street"
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