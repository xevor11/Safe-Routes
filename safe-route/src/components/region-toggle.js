import { FormControlLabel, Switch } from "@mui/material"
import { useRegionUpdate } from "./region"


const RegionToggle = () => {

    const regionUpdate = useRegionUpdate()


    function handleChange() {
        regionUpdate()
    }

    return (
        <FormControlLabel control={<Switch            
            onChange={handleChange} />} 
            style={{zIndex:5}}/>
    )
}

export default RegionToggle;