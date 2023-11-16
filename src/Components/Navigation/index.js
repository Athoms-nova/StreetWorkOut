import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { GestionContext } from "../../Context/GestionContext";
import { TranslX, TranslY } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";
import { AnimContext } from "../../Context/AnimContext";

const StyleNavigation = styled.nav`
  position: fixed;
  z-index: 2500;
  overflow: hidden;
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleUl = styled.ul`
  display: flex;
  color: white;
  padding: 10px 0 10px 0;
  overflow: hidden;
`;

const StyleLien = styled.p`
  margin: 0px 30px 0px 30px;
  padding: 3px 20px 3px 20px;
  font-size: 30px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transform: ${(props) => props.$posX};
  transition: ${(props) => props.$transition};
  &:hover {
    transition: ${(props) => props.$transition};
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  @media (max-width: ${device.tablet}) {
    font-size: 25px;
    margin: 0px 15px 0px 15px;
    padding: 3px 10px 3px 10px;
  }

  @media (max-width: ${device.mobileL}) {
    font-size: 20px;
    margin: 0px 10px 0px 10px;
    padding: 3px 5px 3px 5px;
  }

  @media (max-width: ${device.mobileS}) {
    font-size: 16px;
    margin: 0px 10px 0px 10px;
    padding: 3px 5px 3px 5px;
  }
`;

const Navigation = () => {
  const { setNextURL } = useContext(GestionContext);
  const { setOnAnimation } = useContext(AnimContext);
  const [posLien1, setPosLien1] = useState(TranslX(-150));
  const [posLien2, setPosLien2] = useState(TranslY(-50));
  const [posLien3, setPosLien3] = useState(TranslX(150));
  const [transition, setTransition] = useState("2s");
  let urlActuel = useLocation();

  useEffect(() => {
    setNextURL(urlActuel.pathname);
    setTimeout(() => {
      setPosLien1(TranslX(0));
      setPosLien2(TranslY(0));
      setPosLien3(TranslX(0));
    }, [1000]);

    setTimeout(() => {
      setTransition("0.4s");
    }, [2000]);

  }, []);

  const OnClickLien = (info) => {
    if (info === "Home") {
      if (urlActuel.pathname !== "/") {
        setNextURL("/Home");
        setOnAnimation(true);
      }
    } else if (info === "Park") {
      if (urlActuel.pathname !== "/Parks") {
        setNextURL("/Parks");
        setOnAnimation(true);
      }
    }
  };

  return (
    <StyleNavigation>
      <StyleUl>
        <li>
          <StyleLien
            onClick={() => OnClickLien("Home")}
            $posX={posLien1}
            $transition={transition}
          >
            {" "}
            Home{" "}
          </StyleLien>
        </li>
        <li>
          <StyleLien
            onClick={() => OnClickLien("Park")}
            $posX={posLien2}
            $transition={transition}
          >
            {" "}
            Les Parks{" "}
          </StyleLien>
        </li>
        <li>
          <StyleLien $posX={posLien3} $transition={transition}>
            {" "}
            Event{" "}
          </StyleLien>
        </li>
      </StyleUl>
    </StyleNavigation>
  );
};

export default Navigation;
