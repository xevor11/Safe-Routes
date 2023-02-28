import L from 'leaflet';
import icon from "../../images/curr-loc-icon.svg";

var currentLocIcon = L.icon({
    iconUrl: icon,
    iconSize: new L.point(32, 45),
});

export { currentLocIcon };
