import 'regenerator-runtime/runtime'
import loader from './lib-loader'
import { optionMergeStrategies } from './options'
import { initErrorHandling } from './utils/error'

import Circle from './components/Circle'
import Geocoder from './components/Geocoder'
import GeocoderEvent from './components/GeocoderEvent'
import Map from './components/Map.vue'
import Marker from './components/Marker'
import NearbyPlaces from './components/NearbyPlaces'
import PlaceDetails from './components/PlaceDetails'
import UserPosition from './components/UserPosition'
import Polyline from './components/Polyline'
import Rectangle from './components/Rectangle'
import Polygon from './components/Polygon'
import Direction from './components/Directions'
import DrawDirection from './components/DrawDirection'
import StreetViewRender from './components/StreetViewRender'

import MapElement from './mixins/MapElement'

export {
	Circle,
	Rectangle,
	Geocoder,
	GeocoderEvent,
	Map,
	Marker,
	NearbyPlaces,
	PlaceDetails,
	UserPosition,
	MapElement,
	Polyline,
	Polygon,
	Direction,
	DrawDirection,
	StreetViewRender,
}

function registerComponents (Vue, prefix) {
	Vue.component(`${prefix}circle`, Circle)
	Vue.component(`${prefix}rectangle`, Rectangle)
	Vue.component(`${prefix}geocoder`, Geocoder)
	Vue.component(`${prefix}geocoder-event`, GeocoderEvent)
	Vue.component(`${prefix}map`, Map)
	Vue.component(`${prefix}marker`, Marker)
	Vue.component(`${prefix}nearby-places`, NearbyPlaces)
	Vue.component(`${prefix}place-details`, PlaceDetails)
	Vue.component(`${prefix}user-position`, UserPosition)
	Vue.component(`${prefix}polyline`, Polyline)
	Vue.component(`${prefix}polygon`, Polygon)
	Vue.component(`${prefix}direction`, Direction)
	Vue.component(`${prefix}direction-draw`, DrawDirection)
	Vue.component(`${prefix}streetview-render`, StreetViewRender)
}

const plugin = {
	// eslint-disable-next-line no-undef
	version: VERSION,
	install (Vue, options) {
		const finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'googlemaps-',
		}, options)

		optionMergeStrategies(Vue)
		initErrorHandling(Vue)

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix)
		}

		if (finalOptions.load) {
			loader.load(finalOptions.load)
		}
	},
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}
