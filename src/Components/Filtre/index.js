import { keyframes, styled } from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import iconeMap from "../../Icones/marker.svg";
import "./index.scss";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useRef, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import { useInstallationsRefInit, useVillesRefInit } from "../../Hook";
import { useLocation } from "react-router-dom";
import { TranslY } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";

const cardAnim = (debut, next) => keyframes`
0%{
  transform: ${debut};
}
20%{
  transform: ${debut};
}
100%{
  transform: ${next};
}
`;

const StyleFiltre = styled.div`
  width: 95%;
  margin: auto;
  padding: 0px 30px 0px 30px;
  margin: 20px 0 20px 0;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: ${(overflow) => overflow.$overflow};
  z-index: 2000;
`;

const StyleGroupButton = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 15px;
  column-gap: 40px;
  row-gap: 20px;
  overflow: ${(overflow) => overflow.$overflow};
  @media (max-width: ${device.tablet}){
    flex-direction: column;
    button{
      width: 180px;
    }
    .button-map{
      display: none;
    }
  }
`;

const StyleDropdown = styled(Dropdown)`
  animation: ${(props) => props.$anim};
  transform: ${(props) => props.$possY};
  animation-duration: 2s;
  transition: 2s;
  z-index: ${(props) => props.$zIndex};
`;

const StyleButtonMap = styled(Button)`
  transform: ${(props) => props.$possY};
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
  transition: 2s;
`;

const StyleRecherche = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  transform: ${(props) => props.$possY};
  animation: ${(props) => props.$anim};
  animation-duration: 1.5s;
  transition : 1.5s;

  @media (max-width: ${device.laptop}){
    max-width: 700px;
  }

  @media (max-width: ${device.tablet}){
    max-width: 300px;
  }

  @media (max-width: ${device.mobileS}){
    max-width: 200px;
  }
`;

const StyleBorder = styled.div`
  overflow: ${(props) => props.$overflow};
  display: flex;
  justify-content: center;
`;

/******
 *
 */

const DropdownCheck = ({ title, OnClick, refSelect, posY, anim, overflow, zIndex=1, nbElement=0 }) => {
  return (
    <StyleBorder $overflow={overflow}>
      <StyleDropdown $possY={posY} $anim={anim} $zIndex={zIndex} autoClose={"outside"}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {title} ({nbElement})
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            overflow: Object.keys(refSelect).length > 5 ? "scroll" : "auto",
          }}
        >
          {Object.keys(refSelect).map((item) => (
            <Dropdown.Item key={item} onClick={() => OnClick(item)}>
              <div
                style={{ position: "absolute", width: "100%", height: "100%" }}
              ></div>
              <Form.Check
                type={"checkbox"}
                label={item}
                style={{ cursor: "pointer" }}
                ref={refSelect[item]}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </StyleDropdown>
    </StyleBorder>
  );
};

const ButtonMap = ({
  title,
  icone,
  OnClick,
  refSelect,
  etatFlag,
  posY,
  anim,
  overflow
}) => {
  return (
    <StyleBorder $overflow={overflow} className="button-map">
      <StyleButtonMap
        className="d-flex justify-content-center align-items-center overflow-hidden position-relative"
        onClick={() => OnClick()}
        $possY={posY}
        $anim={anim}
      >
        <div
          style={{
            width: "90%",
            height: "90%",
            position: "absolute",
          }}
        ></div>
        <input
          type="checkbox"
          style={{
            marginRight: "10px",
            width: "1em",
            height: "1em",
          }}
          ref={refSelect}
          defaultChecked={etatFlag ? true : false}
        />
        <p
          style={{
            display: "flex",
            fontSize: "18px",
          }}
        >
          <img
            src={icone}
            alt="title"
            style={{ width: "20px", marginRight: "5px" }}
          />
          {title}
        </p>
      </StyleButtonMap>
    </StyleBorder>
  );
};

const Filtre = () => {
  const {
    villesSelect,
    setVillesSelect,
    installationsSelect,
    setInstallationsSelect,
    flagMap,
    setFlagMap,
    setSaisieRecherche
  } = useContext(GestionContext);

  const villesRef = useVillesRefInit();
  const installationsRef = useInstallationsRefInit();
  const mapRef = useRef(false);
  const [overflow, setOverflow] = useState("hidden");
  const [posY, setPosY] = useState(TranslY(0, "%"));
  const [nbVilleSelect, setNbVilleSelect] = useState(0)
  const [nbInstallationSelect, setNbInstallationSelect] = useState(0)

  const { nextURL } = useContext(GestionContext);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosY(TranslY(-110, "%"))
      setOverflow("hidden")
    }
  }, [nextURL]);



  const OnClickVille = (title) => {
    let newListe = [...villesSelect];
    if (villesRef[title].current.checked) {
      villesRef[title].current.checked = false;
      newListe = newListe.filter((item) => title !== item);
      setNbVilleSelect(nbVilleSelect - 1)
    } else {
      villesRef[title].current.checked = true;
      setNbVilleSelect(nbVilleSelect + 1)
      newListe.push(title);
    }
    setVillesSelect(newListe);
  };

  const OnClickInstallation = (title) => {
    let newListe = [...installationsSelect];
    if (installationsRef[title].current.checked) {
      installationsRef[title].current.checked = false;
      newListe = newListe.filter((item) => title !== item);
      setNbInstallationSelect(nbInstallationSelect - 1)
    } else {
      installationsRef[title].current.checked = true;
      newListe.push(title);
      setNbInstallationSelect(nbInstallationSelect + 1)
    }
    setInstallationsSelect(newListe);
  };

  const OnClickMap = () => {
    setFlagMap(!mapRef.current.checked);
    mapRef.current.checked = !mapRef.current.checked;
  };

  return (
    <StyleFiltre className="Filtre" $overflow={overflow}>
      <StyleBorder style={{ width: "100%" }}>
        <StyleRecherche onAnimationEnd={() => setOverflow("none")} $possY={posY} $anim={cardAnim(TranslY(-100, "%"), TranslY(0, "%"))}>
          <Form.Control
            type="text"
            placeholder="Recherche"
            style={{ maxWidth: "800px", textAlign: "center" }}
            onChange={(e) => setSaisieRecherche(e.target.value)}
          />
        </StyleRecherche>
      </StyleBorder>
      <StyleGroupButton $overflow={overflow}>
        <DropdownCheck
          title={"Villes"}
          OnClick={OnClickVille}
          refSelect={villesRef}
          posY={posY}
          anim={cardAnim(TranslY(-100, "%"), TranslY(0, "%"))}
          overflow={overflow}
          zIndex={3}
          nbElement={nbVilleSelect}
        />
        <DropdownCheck
          title={"Installations"}
          refSelect={installationsRef}
          OnClick={OnClickInstallation}
          posY={posY}
          anim={cardAnim(TranslY(-100, "%"), TranslY(0, "%"))}
          overflow={overflow}
          zIndex={2}
          nbElement={nbInstallationSelect}
        />
        <ButtonMap
          title={"Carte"}
          icone={iconeMap}
          refSelect={mapRef}
          OnClick={OnClickMap}
          etatFlag={flagMap}
          posY={posY}
          anim={cardAnim(TranslY(-100, "%"), TranslY(0, "%"))}
          overflow={"hidden"}
        />
      </StyleGroupButton>
    </StyleFiltre>
  );
};

export default Filtre;
