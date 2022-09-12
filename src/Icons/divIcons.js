import { DivIcon } from "leaflet";


const custDivIcons = DivIcon.extend({
    options : {
        className : 'custDivIcon fs-1 opacity-100',
        html : '<i class="bi bi-geo-alt"></i>'
    }
})

export default custDivIcons;