import markerIcone from "../../Icones/marker.svg";
import { styled, keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../Context/GestionContext";
import { TranslY } from "../../Fonctions";
import { AnimContext } from "../../Context/AnimContext";

const cardAnim = (debut, next) => keyframes`
0%{
  transform: ${debut};
}
20%{
  transform: ${debut};
}
80%{
  transform: ${next};
}
`;

const StyleBordCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: 100ms;
  &:hover {
    background-color: rgba(79, 79, 79, 0.8);
    transform: scale(110%);
  }
`;

const StyleCard = styled.div`
  margin: auto;
  width: 220px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transform: ${(props) => props.$posY};
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
`;

const StyleDivImage = styled.div`
  width: 210px;
  height: 140px;
  overflow: hidden;
  border-radius: 5px;
`;

const StyleBody = styled.div`
  display: flex;
  width: 90%;
  height: 35%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyleTitle = styled.h2`
  color: white;
  font-size: 20px;
`;

const StyleVille = styled.p`
  color: white;
`;

const StyleExos = styled.div`
  display: flex;
`;

const CardPark = ({ id, title, mignature, ville, delay = "0s", last }) => {
  const {setOnAnimation} = useContext(AnimContext)
  const [posY, setPosY] = useState(TranslY(0, "%"));
  const [anim, setAnim] = useState(
    cardAnim(TranslY(-100, "%"), TranslY(0, "%"))
  );

  const navigation = useNavigate();
  const { nextURL, setNextURL, ResteVariable } = useContext(GestionContext);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosY(TranslY(-100, "%"));
      setAnim(cardAnim(TranslY(0, "%"), TranslY(-110, "%")));
    }
  }, [nextURL]);

  const ChangeWindo = () => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname && last) {
      setOnAnimation(false)
      navigation(nextURL);
      ResteVariable();
    }
  };

  return (
    <StyleBordCard>
      <StyleCard
        onClick={() => setNextURL("/Parks/:" + id)}
        $anim={anim}
        $delay={delay}
        $posY={posY}
        onAnimationEnd={ChangeWindo}
      >
        <StyleDivImage>
          <img src={mignature} alt={title} style={{ width: "100%" }} />
        </StyleDivImage>
        <StyleBody>
          <StyleTitle>{title}</StyleTitle>
          <StyleVille>
            {" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            {ville}{" "}
          </StyleVille>
          <StyleExos>
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
          </StyleExos>
        </StyleBody>
      </StyleCard>
    </StyleBordCard>
  );
};

export default CardPark;
