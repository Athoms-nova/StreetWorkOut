import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const StyleChargement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyleSpinner = styled(Spinner)`
    width: 50px;
    height: 50px;
`;

const StyleGroupSpinner = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 25px;
  padding: 20px;
  width: 250px;
`;

const StyleTitle = styled.h1`
    color: white;
    margin-bottom: 30px;
`

const ChargementServeur = () => {
  return (
    <StyleChargement>
    <StyleTitle> CHARGEMENT  </StyleTitle>
      <StyleGroupSpinner>
        <StyleSpinner animation="grow" variant="light"></StyleSpinner>
        <StyleSpinner animation="grow" variant="light"></StyleSpinner>
        <StyleSpinner animation="grow" variant="light"></StyleSpinner>
      </StyleGroupSpinner>
    </StyleChargement>
  );
};

export default ChargementServeur;
