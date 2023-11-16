import TrioImage from "../../Components/TrioImage";
import TitleHome from "../../Components/TitleHome";
import { styled } from "styled-components";
import { useContext} from "react";
import { useEndWindo } from "../../Hook";
import { GestionContext } from "../../Context/GestionContext";
import TransitionModal from "../../Components/TransitionModal";

const StyleHome = styled.div`
  background: black;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  align-items: center;
`;

const Home = () => {
  const { nextURL } = useContext(GestionContext);
  const endFlag = useEndWindo(nextURL);

  return (
    <StyleHome>
      {endFlag && <TransitionModal />}
      <TitleHome />
      <TrioImage />
    </StyleHome>
  );
};

export default Home;
