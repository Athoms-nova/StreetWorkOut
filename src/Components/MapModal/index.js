import { useContext, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { styled } from "styled-components";
import { GestionContext } from "../../Context/GestionContext";
import { device } from "../../Variables/TailleEcran";
import { Button } from "react-bootstrap";

const StyleMapModal = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 3000;
  padding: 40px;

  .modal-map {
    width: 950px;
    height: 500px;
    border-radius: 5px;
  }

  text-align: center;

  .close-button{
    position: relative;
    transform: translateY(60px);
    z-index: 3500;
    border: solid white 2px;
    padding: 5px 15px 5px 15px;
    &:hover{
      border-color: rgb(255, 28, 28);
      background-color: rgb(255, 107, 107);
    }
  }

  @media (max-width: ${device.laptop}) {
    .modal-map {
      width: 650px;
      height: 400px;
    }
  }

  @media (max-width: ${device.tablet}) {
    .modal-map {
      width: 350px;
      height: 300px;
    }
  }

  @media (max-width: ${device.mobileL}) {
    .modal-map {
      width: 200px;
      height: 300px;
    }
  }
`;

const MapModal = ({ longitude, latitude }) => {
  const { setFlagModalMap } = useContext(GestionContext);

  const [onMap, setOnMap] = useState(false);

  const position = [latitude, longitude];
  return (
    <StyleMapModal onClick={() => !onMap && setFlagModalMap(false)}>
      <div
        onMouseEnter={() => setOnMap(true)}
        onMouseLeave={() => setOnMap(false)}
      >
        <Button className="close-button" onClick={() => setFlagModalMap(false)}> X Close </Button>

        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="modal-map"
        >
          <div onMouseEnter={() => ""}></div>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup></Popup>
          </Marker>
        </MapContainer>
      </div>
    </StyleMapModal>
  );
};

export default MapModal;
