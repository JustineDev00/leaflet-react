import { DivIcon } from "leaflet";


const custDivIcons = DivIcon.extend({
    options : {
        className : 'custDivIcon fs-2 opacity-100',
        html : '<i class="bi bi-geo-alt"></i>'
    }
})

export default custDivIcons;