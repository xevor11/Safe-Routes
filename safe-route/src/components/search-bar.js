import React from "react";
import { OutlinedInput, Button } from '@mui/material'
import { height } from "@mui/system";
import { GeocoderAutocomplete, GeoapifyContext } from '@geoapify/geocoder-autocomplete'



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
                    <GeoapifyContext>
                        <GeocoderAutocomplete
                            placeholder="search address"
                            type="street"
                            lang="en"
                            limit="10"
                            countryCodes="us"

                        >

                        </GeocoderAutocomplete>
                    </GeoapifyContext>

                </div>
                {/* <Button variant="contained" color="primary">
                    Search
                </Button> */}
            </div>
        </div>
    )

}