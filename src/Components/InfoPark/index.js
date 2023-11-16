import { keyframes, styled } from "styled-components";
import mapIcone from "../../Icones/marker.svg";
import Button from "react-bootstrap/Button";
import MiniMap from "../MiniMap";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import { useLocation, useNavigate } from "react-router-dom";
import { device } from "../../Variables/TailleEcran";

const cardAnim = (debut, next) => keyframes`
0%{
  opacity: ${debut};
}100%{
  opacity: ${next};
}
`;

const StyleInfoPark = styled.div`
  padding: 10px 30px 10px 30px;
  opacity: ${(props) => props.$opacity};
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
  animation-delay: ${(props) => props.$delay};
  transition: 2s;
`;

const StyleTitle = styled.h2`
  border: solid;
  width: fit-content;
  margin: auto;
  padding: 10px 40px 10px 40px;
  border-radius: 10px;
  font-size: 25px;
`;

const StyleTitlePart = styled.h3`
  margin-bottom: 30px;
  font-size: 25px;
  padding: 0 30px 0 30px;
  width: fit-content;
  border-bottom: solid white;
`;

const StylePart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const StyleListeInfoLieu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleP = styled.p`
  font-size: 20px;
  margin: 2px 0 2px 0;
`;

const StyleInstallation = styled.p`
  background-color: green;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
`;

const StylePartLieu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  row-gap: 10px;
  column-gap: 10px;

  @media (max-width: ${device.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StylePartInstallation = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 30px;
`;

const InfoLocalisation = ({ longitude, latitude, ville, setFlagModalMap }) => {
  return (
    <StylePart>
      {/* <StyleTitlePart> Locatisation </StyleTitlePart> */}
      <StylePartLieu>
        <MiniMap latitude={latitude} longitude={longitude} />
        <StyleListeInfoLieu>
          <StyleP>
            {" "}
            <img src={mapIcone} alt="ville" style={{ width: "20px" }} /> {ville}
          </StyleP>

          <StyleP>
            {" "}
            <img src={mapIcone} alt="ville" style={{ width: "20px" }} /> GPS [
            {latitude} ; {longitude}]
          </StyleP>
          <Button
            style={{ marginTop: "4px", width :"90px" }}
            onClick={() => setFlagModalMap(true)}
          >
            {" "}
            Plan{" "}
          </Button>
        </StyleListeInfoLieu>
      </StylePartLieu>
    </StylePart>
  );
};

const InfoInstallation = ({ liste }) => {
  return (
    <StylePart>
      <StylePartInstallation>
        {liste.map((item) => (
          <StyleInstallation key={item}> {item} </StyleInstallation>
        ))}
      </StylePartInstallation>
    </StylePart>
  );
};


const InfoPark = ({ parkSelect }) => {
  const { setFlagModalMap } = useContext(GestionContext);
  const [opacity, setOpacity] = useState(0);
  const [anim, setAnim] = useState(cardAnim(0, 1));
  const [startAnim, setStartAnim] = useState(true);
  const [delay, setDelay] = useState("2s");

  const { nextURL } = useContext(GestionContext);
  const navigation = useNavigate();
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setDelay("0s");
      setAnim(cardAnim(1, 0));
      setStartAnim(false);
    }
  }, [nextURL]);

  const ChangeWindo = () => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      navigation(nextURL);
    }
  };

  return (
    <StyleInfoPark
      $anim={anim}
      $opacity={opacity}
      $delay={delay}
      onAnimationEnd={ChangeWindo}
      onAnimationStart={() => (startAnim ? setOpacity(1) : setOpacity(0))}
    >
      <StyleTitle> {parkSelect.title} </StyleTitle>
      {parkSelect.latitude !== false && (
        <InfoLocalisation
          latitude={parkSelect.latitude}
          longitude={parkSelect.longitude}
          ville={parkSelect.ville}
          setFlagModalMap={setFlagModalMap}
        />
      )}
      <InfoInstallation liste={parkSelect.installations} />
     
    </StyleInfoPark>
  );
};

export default InfoPark;
