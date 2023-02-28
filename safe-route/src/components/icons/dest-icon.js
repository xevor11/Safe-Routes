import L from 'leaflet';
import icon from "../../images/dest-icon.svg";

var destinationIcon = L.icon({
    iconUrl: icon,
    iconSize: new L.point(32, 45),
});

export { destinationIcon };