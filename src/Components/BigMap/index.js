import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const BigMap = ({latitude, longitude}) => {
  const position = [longitude, latitude];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width : "230px", height: "150px", borderRadius : "5px"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default BigMap;
