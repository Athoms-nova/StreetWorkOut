import { keyframes, styled } from "styled-components";
import fond from "../../Images/Falaise.jpg";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GestionContext } from "../../Context/GestionContext";
import { TranslX, TranslY } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";
import { AnimContext } from "../../Context/AnimContext";

const animTop = (debut, next) => keyframes`
0%{
  transform: translateY(-120%) ${debut};
}
20%{
  transform: translateY(-120%) ${debut};
}
100%{
  transform: translateY(0%) ${next};
}
`;

const animBottom = (debut, next) => keyframes`
0%{
  transform: translateY(120%) ${debut};
}
20%{
  transform: translateY(120%) ${debut};
}
100%{
  transform: translateY(0%) ${next}
}
`;

const animEnd = (debut, next, Ynext) => keyframes`
0%{
  transform: translateY(0%) ${debut};
}
20%{
  transform: translateY(0%) ${debut};
}
100%{
  transform: ${Ynext} ${next};
  visibility: hidden;
}
`;

const StyleTrio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px 0 20px 20px;
  overflow: hidden;
  transition: 1s;
  @media (max-width: ${device.tablet}) {
    transform: scale(80%);
    transition: 1s;
  }

  @media (max-width: ${device.mobileL}) {
    transition: 1s;
    margin-top: 0px;
    .cadre-cotee {
      display: none;
    }
  }
`;

const Cadre = styled.div`
  clip-path: polygon(46% 0, 100% 0, 56% 100%, 0 100%);
  height: 300px;
  width: 200px;
  transition: 3s;
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
  transform: ${(props) => props.$nextX} ${(props) => props.$nextY};
  transition: 2s;
  visibility: ${(props) => props.$visible};
  &:hover {
    transition: 2s;
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    width: 400px;
    transform: ${(props) => props.$hoverTrans};
    border-radius: 10px;
    overflow: hidden;
  }

  @media (max-width: ${device.mobileL}) {
    height: 200px;
    width: 150px;
    &:hover {
    transition: 2s;
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    width: 250px;
  }
  }
`;

const StyleImage = styled.img`
  width: 400px;
  object-position: ${(props) => props.$position};
  transition: 2s;
`;

const FondImage = ({ imgPosition }) => {
  return (
    <StyleImage src={fond} alt="apercu" $position={imgPosition}></StyleImage>
  );
};

const TrioImage = () => {

  const {setOnAnimation} = useContext(AnimContext)
  const pas = 50;
  const position1 = pas;
  const position2 = 0;
  const position3 = -pas;
  const decalage = 10;
  const decalageCote = 500;

  const [visible, setVisible] = useState("visible");
  const [posFinal1, setPosFinal1] = useState(TranslX(position1 - decalage));
  const [posFinal2, setPosFinal2] = useState(TranslX(position2 - decalage));
  const [posFinal3, setPosFinal3] = useState(TranslX(position3 - decalage));
  const [posFinalY1, setPosFinalY1] = useState(TranslY(0, "%"));
  const [posFinalY2, setPosFinalY2] = useState(TranslY(0, "%"));
  const [posFinalY3, setPosFinalY3] = useState(TranslY(0, "%"));
  const [imgPosition1, setImgPosition1] = useState("-200px");
  const [imgPosition2, setImgPosition2] = useState("-200px");
  const [imgPosition3, setImgPosition3] = useState("-200px");
  const [animCadre1, setAnimCadre1] = useState(
    animTop(TranslX(100 - decalage), TranslX(position1 - decalage))
  );
  const [animCadre2, setAnimCadre2] = useState(
    animBottom(TranslX(-150 - decalage), TranslX(position2 - decalage))
  );
  const [animCadre3, setAnimCadre3] = useState(
    animTop(TranslX(0 - decalage), TranslX(position3 - decalage))
  );
  const { nextURL, ResteVariable } = useContext(GestionContext);
  const navigation = useNavigate();
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosFinalY1(TranslY(120, "%"));
      setPosFinalY2(TranslY(-120, "%"));
      setPosFinalY3(TranslY(120, "%"));
      setAnimCadre1(
        animEnd(
          TranslX(position1 - decalage),
          TranslX(-50 - decalage),
          TranslY(120, "%")
        )
      );
      setAnimCadre2(
        animEnd(
          TranslX(position2 - decalage),
          TranslX(100 - decalage),
          TranslY(-120, "%")
        )
      );
      setAnimCadre3(
        animEnd(
          TranslX(position3 - decalage),
          TranslX(-150 - decalage),
          TranslY(120, "%")
        )
      );
    }
  }, [nextURL]);

  const OnHover = (info) => {
    if (info === 1) {
      setPosFinal2(TranslX(decalageCote - pas - decalage));
      setPosFinal3(TranslX(decalageCote + pas - decalage));
      setImgPosition1("0px");
    } else if (info === 2) {
      setPosFinal1(TranslX(-decalageCote + pas - decalage));
      setPosFinal3(TranslX(decalageCote - pas - decalage));
      setImgPosition2("0px");
    } else if (info === 3) {
      setPosFinal1(TranslX(-decalageCote - pas - decalage));
      setPosFinal2(TranslX(-decalageCote + pas - decalage));
      setImgPosition3("0px");
    }
  };

  const OnLeave = (info) => {
    if (info === 1) {
      setPosFinal2(TranslX(position2 - decalage));
      setPosFinal3(TranslX(position3 - decalage));
      setImgPosition1("-200px");
    } else if (info === 2) {
      setPosFinal1(TranslX(position1 - decalage));
      setPosFinal3(TranslX(position3 - decalage));
      setImgPosition2("-200px");
    } else if (info === 3) {
      setPosFinal1(TranslX(position1 - decalage));
      setPosFinal2(TranslX(position2 - decalage));
      setImgPosition3("-200px");
    }
  };

  const ChangeWindo = () => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setOnAnimation(false)
      setVisible("hidden");
      navigation(nextURL);
      ResteVariable();
    }
  };
  return (
    <StyleTrio>
      <div style={{ display: "flex" }}>
        <Cadre
          $nextX={posFinal1}
          $nextY={posFinalY1}
          $anim={animCadre1}
          $visible={visible}
          $hoverTrans={TranslX(50, "%")}
          onMouseEnter={() => OnHover(1)}
          onMouseLeave={() => OnLeave(1)}
          className="cadre-cotee"
        >
          <FondImage imgPosition={imgPosition1} />
        </Cadre>
        <Cadre
          $nextX={posFinal2}
          $nextY={posFinalY2}
          $anim={animCadre2}
          $visible={visible}
          $hoverTrans={TranslX(0, "%")}
          onMouseEnter={() => OnHover(2)}
          onMouseLeave={() => OnLeave(2)}
          onAnimationEnd={ChangeWindo}
        >
          <FondImage imgPosition={imgPosition2} />
        </Cadre>
        <Cadre
          $nextX={posFinal3}
          $nextY={posFinalY3}
          $anim={animCadre3}
          $visible={visible}
          $hoverTrans={TranslX(-50, "%")}
          onMouseEnter={() => OnHover(3)}
          onMouseLeave={() => OnLeave(3)}
          className="cadre-cotee"
        >
          <FondImage imgPosition={imgPosition3} />
        </Cadre>
      </div>
    </StyleTrio>
  );
};

export default TrioImage;
