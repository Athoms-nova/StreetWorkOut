import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import { GestionContext } from "../../Context/GestionContext";
import { TranslX } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";
import { AnimContext } from "../../Context/AnimContext";

const cardAnim = (debut, next) => keyframes`
0%{
  opacity: ${debut};
}100%{
  opacity: ${next};
}
`;

const StyleGalerie = styled.div`
  padding: 20px;
  //width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyleBigImage = styled.div`
  width: 580px;
  height: 400px;
  overflow: hidden;
  border-radius: 20px;
  transform: ${(props) => props.$posX};
  transition: 2s;
  opacity: ${(props) => props.$opacity};

  @media (max-width: ${device.tablet}) {
    width: 400px;
    height: 300px;
    border-radius: 10px;
  }

  @media (max-width: ${device.mobileL}) {
    width: 250px;
    height: 160px;
  }
`;

const StyleGalerieImages = styled.div`
  position: relative;
  overflow-x: ${(props) => props.$scroll};
  display: flex;
  align-items: center;
  width: 100%;
  height: 160px;
  margin-top: 10px;
  transition: 2s;
  @media (max-width: ${device.tablet}) {
    height: 140px;
  }
`;

const StyleCardGalerie = styled.div`
  display: flex;
  width: 200px;
  height: 130px;
  position: absolute;
  overflow: hidden;
  //padding: 0 20px 0 20px;
  transition: 2s;
  opacity: ${(props) => props.$opacity};
  transform: ${(props) => props.$posX};
  animation: ${(props) => props.$anim};
  animation-duration: 2s;
  animation-delay: ${(props) => props.$delay};
  @media (max-width: ${device.tablet}) {
    height: 100px;
    width: 180px;
  }
`;

const CardGalerie = ({
  offset,
  OnClick,
  ulrImage,
  compteur,
  endWindo = false,
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), [3000]);
  }, []);

  useEffect(() => {
    endWindo && setOpacity(0);
  }, [endWindo]);

  return (
    <StyleCardGalerie
      onClick={OnClick}
      $posX={TranslX(offset)}
      $opacity={opacity}
      $anim={cardAnim(0, 1)}
      $delay={compteur * 0.5 + 2 + "s"}
    >
      <div style={{ width: "100%", borderRadius: "5px", overflow: "hidden" }}>
        <img src={ulrImage} alt="test" style={{ width: "100%" }} />
      </div>
    </StyleCardGalerie>
  );
};

const Galerie = ({ mignature, listeImage = {}, listeVideo = {} }) => {
  const [itemSelect, setItemSelect] = useState(mignature.url);
  const [posBigImgX, setPosBigImgX] = useState(TranslX(-100, "%"));
  const [scroll, setScroll] = useState("hidden");
  const [endWindo, setEnWindo] = useState(false);
  const [opacityTop, setOpacityTop] = useState(0);

  const {setOnAnimation} = useContext(AnimContext)
  const { nextURL } = useContext(GestionContext);
  const navigation = useNavigate();
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setScroll("hidden");
      setPosBigImgX(TranslX(-100, "%"));
      setEnWindo(true);
      setOpacityTop(0)
    }
  }, [nextURL]);

  useEffect(() => {
    setPosBigImgX(TranslX(0, "%"));
    setTimeout(() => {
      setScroll("auto");
    }, [3000]);
    setTimeout(() => {
      setOpacityTop(1)
    }, [1000]);
  }, []);

  useEffect(() => {
    setItemSelect(mignature.url);
  }, [mignature]);

  const OnClickImage = (val) => {
    setItemSelect(val);
  };

  const ChangeWindo = () => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setOnAnimation(false)
      navigation(nextURL);
    }
  };

  return (
    <StyleGalerie>
      <div style={{ overflow: "hidden" }}>
        <StyleBigImage $posX={posBigImgX} $opacity={opacityTop} onTransitionEnd={() => ChangeWindo()}>
          <img
            src={itemSelect}
            alt="ok"
            style={{ width: "100%" }}
            className="big-image"
          />
        </StyleBigImage>
      </div>
      <StyleGalerieImages $scroll={scroll}>
        {Object.keys(listeImage).map((item, compteur) => (
          <CardGalerie
            offset={220 * compteur}
            compteur={compteur}
            ulrImage={listeImage[item].url}
            OnClick={() => OnClickImage(listeImage[item].url)}
            key={compteur}
            endWindo={endWindo}
          />
        ))}
      </StyleGalerieImages>
    </StyleGalerie>
  );
};

export default Galerie;
