import { styled } from "styled-components";
import Galerie from "../../Components/Galerie";
import InfoPark from "../../Components/InfoPark";
import listeDataDefault from "../../Variables/ListeDataDefault";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import MapModal from "../../Components/MapModal";
import TitlePage from "../../Components/TitlePage";
import { useEndWindo } from "../../Hook";
import TransitionModal from "../../Components/TransitionModal";
import { TranslY } from "../../Fonctions";

const StylePresentation = styled.div`
  margin-top: 100px;
  color: white;
`;

const StyleBoby = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap-reverse;
  margin-top: 30px;
`;

const Presentation = () => {
  const { dataParId, flagModalMap } = useContext(GestionContext);
  const urlParam = useParams().id.replace(":", "");
  const [parkSelect, setParkSelect] = useState(listeDataDefault);
  const [posTitle, setPosTitle] = useState(TranslY(0, "%"));
  const { nextURL, setNextURL } = useContext(GestionContext);

  let urlActuel = useLocation();
  const endFlag = useEndWindo(nextURL);
  const navigation = useNavigate();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosTitle(TranslY(-110, "%"));
    }
  }, [nextURL]);

  useEffect(() => {
    try {
      Object.keys(dataParId).indexOf(urlParam) > -1 &&
        setParkSelect(dataParId[urlParam]);
    } catch (error) {}
  }, [dataParId]);

  return (
    <>
      <StylePresentation>
        {endFlag && <TransitionModal />}
        {flagModalMap && (
          <MapModal
            latitude={parkSelect.latitude}
            longitude={parkSelect.longitude}
          />
        )}
        <TitlePage title={"Presentation"} visible={false} posY={posTitle} />
        <StyleBoby>
          <Galerie
            mignature={parkSelect["mignature"]}
            listeImage={parkSelect["listeImage"]}
          />
          <InfoPark parkSelect={parkSelect} />
        </StyleBoby>
      </StylePresentation>
      )
    </>
  );
};

export default Presentation;
