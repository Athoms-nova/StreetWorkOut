import { MapContainer, Marker, TileLayer } from "react-leaflet";
import styled from "styled-components";

const StyledBorder = styled.div`
  overflow: hidden;
  border-radius: 10px;
  .mini-map {
    width: 230px;
    height: 150px;
  }
`;

const MiniMap = ({ longitude, latitude }) => {
  const position = [latitude, longitude];

  return (
    <StyledBorder>
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        className="mini-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </StyledBorder>
  );
};

export default MiniMap;
