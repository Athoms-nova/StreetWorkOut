import { useContext, useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { GestionContext } from "../../Context/GestionContext";
import { useLocation } from "react-router-dom";
import { TranslY } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";

const start = (debut, fin) => keyframes`
0%{
  transform: ${debut};
}
20%{
  transform: ${debut};
}
100%{
  transform: ${fin};
}
`;

const StyleTitleHome = styled.div`
    overflow: hidden;
    margin-bottom: 20px;
`;

const StyleTile = styled.h1`
  color: white;
  font-size: 70px;
  text-align: center;
  transform: ${props => props.$posY};
  opacity: ${props => props.$opacity};
  transition: 2s;
  animation: ${start(TranslY(-100, "%"), TranslY(0, "%"))};
  animation-duration: 2s;
  @media (max-width: ${device.tablet}){
    transform: 1s;
    font-size: 40px;
  }

  @media (max-width: ${device.mobileL}){
    transform: 1s;
    font-size: 35px;
  }
`;


const TitleHome = () => {
  const {nextURL} = useContext(GestionContext)
  const [posY, setPosY] = useState(TranslY(0, "%"))
  const [opacity, setOpacity] = useState(1)
  let urlActuel = useLocation()

  useEffect(() => {
      if( nextURL !== "" && nextURL !== urlActuel.pathname){
        setPosY(TranslY(-110, "%"))
        setOpacity(0)
      }
  }, [nextURL])
  return (
    <StyleTitleHome>
      <StyleTile $posY={posY} $opacity={opacity}>
        {" "}
        Street Workout <br /> Parks{" "}
      </StyleTile>
    </StyleTitleHome>
  );
};

export default TitleHome;
