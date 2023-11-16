import markerIcone from "../../Icones/marker.svg";
import { keyframes, styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
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
100%{
  transform: ${next};
}
`;

const StyleBordCard = styled.div`
  overflow: hidden;
  border-radius: 10px;
  padding: 10px;
`;

const StyleCard = styled.div`
  border-radius: 10px;
  margin: auto;
  width: 210px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transform: ${(props) => props.$posY} ${(props) => props.$scale};
  transition: 100ms;
  cursor: pointer;
  &:hover {
    background-color: rgba(79, 79, 79, 0.8);
    transform: scale(110%);
  }
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
  background-color: ${(props) => props.$color};
`;

const StyleDivImage = styled.div`
  width: 200px;
  height: 130px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
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
  justify-content: center;
  position: absolute;
  padding: 5px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(163, 163, 163, 0.7);
`;

const CardParkMap = ({
  id,
  title,
  mignature,
  ville,
  setCardHover,
  markerHover,
  last,
}) => {

  const {setOnAnimation} = useContext(AnimContext)
  const scrollRef = useRef(null);
  const [posY, setPosY] = useState(TranslY(0, "%"));
  const [anim, setAnim] = useState(
    cardAnim(TranslY(-100, "%"), TranslY(0, "%"))
  );
  const [colorHover, setColorHover] = useState("rgba(79, 79, 79, 0.0)");
  const [scaleHover, setScaleHover] = useState("scale(150%)");

  const navigation = useNavigate();
  const { nextURL, setNextURL, ResteVariable } = useContext(GestionContext);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosY(TranslY(-100, "%"));
      setAnim(cardAnim(TranslY(0, "%"), TranslY(-100, "%")));
    }
  }, [nextURL]);

  const OnHoverMouse = (item) => {
    setCardHover(item);
  };

  const LeaveHoverMouse = () => {
    setCardHover(false);
  };

  useEffect(() => {
    if (markerHover === id) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setScaleHover("scale(110%)");
      setColorHover("rgba(79, 79, 79, 0.8)");
    } else {
      setScaleHover("scale(100%)");
      setColorHover("rgba(79, 79, 79, 0.0)");
    }
  }, [markerHover]);

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
        onClick={() => {
          setOnAnimation(true)
          setNextURL("/Parks/:" + id)}}
        onMouseEnter={() => OnHoverMouse(id)}
        onMouseLeave={() => LeaveHoverMouse()}
        $anim={anim}
        $posY={posY}
        $scale={scaleHover}
        $color={colorHover}
        ref={scrollRef}
        onAnimationEnd={ChangeWindo}
      >
        <StyleDivImage>
          <img src={mignature.url} alt={title} style={{ width: "100%" }} />
          <StyleExos>
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
          </StyleExos>
        </StyleDivImage>
        <StyleBody>
          <StyleTitle>{title}</StyleTitle>
          <StyleVille>
            {" "}
            <img src={markerIcone} alt="ville" style={{ width: "20px" }} />{" "}
            {ville}{" "}
          </StyleVille>
        </StyleBody>
      </StyleCard>
    </StyleBordCard>
  );
};

export default CardParkMap;
