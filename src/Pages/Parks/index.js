import { styled } from "styled-components";
import TitlePage from "../../Components/TitlePage";
import CardPark from "../../Components/CardPark";
import NumPages from "../../Components/NumPages";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import ParkMap from "../ParkMap";
import Filtre from "../../Components/Filtre";
import { useLocation } from "react-router-dom";
import { useEndWindo } from "../../Hook";
import TransitionModal from "../../Components/TransitionModal";
import { TranslY } from "../../Fonctions";

const StyleParks = styled.div`
  margin-top: 70px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  column-gap: 40px;
  row-gap: 30px;
`;

const StyleListCard = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 40px;
  row-gap: 30px;
  max-width: 1200px;
  margin-bottom: 10px;
`;

const StyleBlockCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
`;

const ContenuSansMap = ({
  listeParkFormat,
  pageActuel,
  listePagination,
  OnClickPage,
}) => {
  return (
    <StyleBlockCard>
      <StyleListCard >
        {listeParkFormat.length > 0 &&
          listeParkFormat[pageActuel].map((item, index) => (
            <CardPark
              key={item.id}
              id={item.id}
              title={item.title}
              ville={item.ville}
              mignature={item.mignature.url}
              delay={`${index * 0.25}s`}
              last={
                  listeParkFormat[pageActuel].length > index + 1 ? false : true
                }
            />
          ))}
      </StyleListCard>
      <NumPages
        pageActuel={pageActuel}
        listePage={listePagination}
        OnClick={OnClickPage}
      />
    </StyleBlockCard>
  );
};

const Parks = () => {
  const {
    pageActuel,
    setPageActuel,
    formatListePage,
    listePagination,
    flagMap,
    ActualisationPark,
  } = useContext(GestionContext);

  const { nextURL } = useContext(GestionContext);
  const [posYTitle, setPosYTitle] = useState(TranslY(0, "%"));
  let urlActuel = useLocation();
  const endFlag = useEndWindo(nextURL);

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosYTitle(TranslY(-105, "%"));
    }
  }, [nextURL]);

  useEffect(() => {
    ActualisationPark();
  }, []);

  const OnClickPage = (value) => {
    if (value === "<<") {
      setPageActuel(0);
    } else if (value === ">>") {
      setPageActuel(formatListePage.length - 1);
    } else if (value === "<") {
      if (pageActuel > 0) {
        setPageActuel(pageActuel - 1);
      }
    } else if (value === ">") {
      if (pageActuel < formatListePage.length - 1) {
        setPageActuel(pageActuel + 1);
      }
    } else {
      setPageActuel(value);
    }
  };

  return (
    <StyleParks>
      {endFlag && <TransitionModal />}
      <TitlePage title={"Les Parks"} posY={posYTitle} />
      <Filtre />
      {flagMap ? (
        <ParkMap
          listeParkFormat={formatListePage}
          pageActuel={pageActuel}
          listePagination={listePagination}
          OnClickPage={OnClickPage}
        />
      ) : (
        <ContenuSansMap
          listeParkFormat={formatListePage}
          pageActuel={pageActuel}
          listePagination={listePagination}
          OnClickPage={OnClickPage}
        />
      )}
    </StyleParks>
  );
};

export default Parks;
