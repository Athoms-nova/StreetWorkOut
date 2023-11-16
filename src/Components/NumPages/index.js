import { useContext, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { GestionContext } from "../../Context/GestionContext";
import { TranslY } from "../../Fonctions";

const StylePagination = styled(Pagination)`
  transform: ${(props) => props.$posY};
  transition: 2s;
`;

const NumPages = ({ pageActuel, listePage, OnClick }) => {
  const [posY, setPosY] = useState(TranslY(-100, "%"))
  const { nextURL } = useContext(GestionContext);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname) {
      setPosY(TranslY(-110, "%"))
    }
  }, [nextURL]);

  useEffect(() => {
    setPosY(TranslY(0, "%"))
  }, [])

  return (
    <div style={{overflow : "hidden"}}>
      <StylePagination $posY={posY}>
        <Pagination.First onClick={() => OnClick("<<")} />
        <Pagination.Prev onClick={() => OnClick("<")} />
        {listePage.map((item) => (
          <Pagination.Item
            active={pageActuel + 1 === item ? true : false}
            key={item}
            onClick={() => OnClick(item - 1)}
          >
            {item}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => OnClick(">")} />
        <Pagination.Last onClick={() => OnClick(">>")} />
      </StylePagination>
    </div>
  );
};

export default NumPages;
