import { Popup } from "react-leaflet";
import { styled } from "styled-components";
import "./index.scss";
import { useContext } from "react";
import { GestionContext } from "../../Context/GestionContext";

const StylePopUp = styled(Popup)`
  cursor: pointer;
`;

const StylePopImage = styled.div`
  max-width: 120px;
  max-height: 90px;
  overflow: hidden;
  margin-top: 5px;
`;

const StyleP = styled.p`
  text-align: center;
  font-weight: bold;
`;

const PopUpCard = ({ mignature, title, id, OnHoverMouse, LeaveHoverMouse }) => {
  const { setNextURL } = useContext(GestionContext);

  return (
    <StylePopUp>
      <div
        onClick={() => setNextURL(`/Parks/:${id}`)}
        onMouseEnter={OnHoverMouse}
        onMouseLeave={LeaveHoverMouse}
      >
        <StyleP> {title} </StyleP>
        <StylePopImage>
          <img
            src={mignature}
            alt={title}
            style={{ width: "120px", borderRadius: "5px" }}
          />
        </StylePopImage>
      </div>
    </StylePopUp>
  );
};

export default PopUpCard;
