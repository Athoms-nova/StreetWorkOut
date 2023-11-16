import { keyframes, styled } from "styled-components";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import CardParkMap from "../../Components/CardParkMap";
import NumPages from "../../Components/NumPages";
import { useContext, useEffect, useState } from "react";
import { PointMilieuListeCoordonne, TranslX } from "../../Fonctions";
import { carteReunionPointSeul } from "../../Variables/GeoReunionJSON";
import PopUpCard from "../../Components/PopUpCard";
import { blackIcon, bleuIcon } from "../../Variables/LeafletVariable";
import { GestionContext } from "../../Context/GestionContext";
import { useLocation } from "react-router-dom";
import { device } from "../../Variables/TailleEcran";


const scrollAp = keyframes`
0%{
  overflow-y: hidden;
}
100%{
  overflow-y: hidden;
}
`;

const StyleParkMap = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  padding: 0 25px 25px 25px;

  @media (max-width: ${device.tablet}) {
    .all-map {
      display: none;
    }
  }
`;

const StyleBorderMap = styled.div`
  transform: ${(props) => props.$posX};
  transition: 2s;
  opacity: ${(props) => props.$opacity};
  margin-left: 20px;
  border-radius: 20px;
  overflow: hidden;
  .map-park {
    width: 550px;
    height: 550px;
  }

  @media (max-width: ${device.laptop}) {
    .map-park {
      width: 400px;
      height: 450px;
    }
  }
`;

const StyleListeCard = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  justify-content: space-around;
  column-gap: 40px;
  row-gap: 30px;
  max-width: 600px;
  max-height: 520px;
  margin-bottom: 15px;
  animation: ${scrollAp};
  animation-duration: 2s;
  overflow-y: ${(props) => props.$scroll};
  margin-right: 20px;
  @media (max-width: ${device.laptop}) {
    max-width: 300px;
  }

  @media (max-width: ${device.tablet}) {
    max-height: fit-content;
    max-width: fit-content;
  }
`;

const MapControl = ({ ville }) => {
  const map = useMap();
  useEffect(() => {
    if (ville === "All") {
      map.setView([-21.13, 55.53], 10);
    } else {
      map.setView(PointMilieuListeCoordonne(carteReunionPointSeul[ville]), 12);
    }
  }, [ville, map]);
  return null;
};

const MapLeflet = ({
  ville,
  listePark = [],
  setCardHover,
  cardHover,
  setMarkerHover,
}) => {
  const [posX, setPosX] = useState(TranslX(-100, "%"));
  const position = [-21.13, 55.53];
  const [opacity, setOpacity] = useState(0)
  const { nextURL } = useContext(GestionContext);
  let urlActuel = useLocation();


  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosX(TranslX(-100, "%"));
      setOpacity(0)
    }
  }, [nextURL]);

  const OnHoverMouse = (item) => {
    setCardHover(item);
    setMarkerHover(item);
  };

  const LeaveHoverMouse = () => {
    setCardHover(false);
    setMarkerHover(false);
  };

  useEffect(() => {
    setPosX(TranslX(0, "%"));
    setOpacity(1)
  }, []);

  return (
    <div style={{ overflow: "hidden" }} className="all-map">
      <StyleBorderMap $posX={posX} $opacity={opacity}>
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          className="map-park"
        >
          <MapControl ville={ville} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listePark.map((item) => (
            <Marker
              position={[item.latitude, item.longitude]}
              key={item.id}
              eventHandlers={{
                mouseover: (event) => OnHoverMouse(item.id),
                mouseout: (event) => LeaveHoverMouse(),
              }}
              icon={cardHover === item.id ? blackIcon : bleuIcon}
            >
              <PopUpCard
                title={item.title}
                mignature={item.mignature}
                id={item.id}
                OnHoverMouse={() => OnHoverMouse(item.id)}
                LeaveHoverMouse={() => LeaveHoverMouse()}
              />
            </Marker>
          ))}
        </MapContainer>
      </StyleBorderMap>
    </div>
  );
};

const ParkMap = ({
  listeParkFormat,
  pageActuel,
  listePagination,
  OnClickPage,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [markerHover, setMarkerHover] = useState(false);
  const [scroll, setScroll] = useState("visible");
  const { nextURL } = useContext(GestionContext);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setScroll("hidden");
    }
  }, [nextURL]);

  return (
    <StyleParkMap>
      <div className="d-flex flex-column align-items-center">
        <StyleListeCard $scroll={scroll} >
          {listeParkFormat.length > 0 &&
            listeParkFormat[pageActuel].map((item, indice) => (
              <CardParkMap
                key={item.id}
                id={item.id}
                title={item.title}
                ville={item.ville}
                mignature={item.mignature}
                setCardHover={setCardHover}
                cardHover={cardHover}
                markerHover={markerHover}
                last={
                  listeParkFormat[pageActuel].length > indice + 1 ? false : true
                }
              />
            ))}
        </StyleListeCard>
        <NumPages
          pageActuel={pageActuel}
          listePage={listePagination}
          OnClick={OnClickPage}
        />
      </div>
      <MapLeflet
        ville={"All"}
        listePark={
          listeParkFormat.length > 0 ? listeParkFormat[pageActuel] : []
        }
        setCardHover={setCardHover}
        cardHover={cardHover}
        setMarkerHover={setMarkerHover}
      />
    </StyleParkMap>
  );
};

export default ParkMap;
