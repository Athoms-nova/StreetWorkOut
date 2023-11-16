import { keyframes, styled } from "styled-components";
import PropTypes from "prop-types";
import { TranslY } from "../../Fonctions";
import { device } from "../../Variables/TailleEcran";


const cardAnim = (debut, next) => keyframes`
0%{
  transform: ${debut};
  border-color: rgba(255, 255, 255, 0);
}
20%{
  transform: ${debut};
  border-color: rgba(255, 255, 255, 0);
}

80%{
  border-color: rgba(255, 255, 255, 0);
}

100%{
  transform: ${next};
}
`;

const StyleTitlePage = styled.h1`
  color: white;
  font-size: 40px;
  width: fit-content;
  text-align: center;
  padding: 0px 40px 0px 40px;
  border-bottom: solid white;
  max-width: 500px;
  transform: ${(props) => props.$posY};
  animation: ${(props) => props.$anim};
  animation-duration: 1.5s;
  transition: 1.5s;

  @media (max-width: ${device.mobileS}){
    font-size: 30px;
    width: fit-content;
    padding: 0px 20px 0px 20px;
  }
`;

const StyleBorder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  visibility: ${(props) => props.$visible};
  overflow: hidden;
`;


const TitlePage = ({ title, visible = true, posY = TranslY(0, "%") }) => {
  return (
    <StyleBorder>
      <StyleTitlePage $posY={posY} $anim={cardAnim(TranslY(-100, "%"), TranslY(0, "%"))} $visible={visible ? "visible" : "hidden"}> {title} </StyleTitlePage>
    </StyleBorder>
  );
};

TitlePage.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
};

export default TitlePage;
