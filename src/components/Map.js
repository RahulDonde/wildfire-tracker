import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import LocationInfoBox from './LocationInfoBox'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    return (
        <div className="map">
            <MapContainer center={[center.lat, center.lng]} zoom={zoom} minZoom={3} maxBounds={[[-90, -180], [90, 180]]} style={{ height: '100vh', width: '100vw' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {eventData.map((ev, index) => {
                    if (ev.categories[0].id === "wildfires") {
                        return (
                            <Marker
                                key={index}
                                position={[ev.geometry[0].coordinates[1], ev.geometry[0].coordinates[0]]}
                                eventHandlers={{
                                    click: () => setLocationInfo({ id: ev.id, title: ev.title })
                                }}
                            >
                                <Popup>{ev.title}</Popup>
                            </Marker>
                        )
                    }
                    return null
                })}
            </MapContainer>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 3
}

export default Map