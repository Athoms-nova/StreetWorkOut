import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { device } from "../Variables/TailleEcran";
import { ref, child, get } from "firebase/database";
import { database } from "../Firebase/firebase";
import { FormatDataFireBase } from "../Fonctions";

export function useVillesRefInit() {
  return {
    "Saint-Denis": useRef(),
    "Sainte-Marie": useRef(),
    "Sainte-Suzanne": useRef(),
    "Saint-Andre": useRef(),
    "Bras-Panon": useRef(),
    "Saint-Benoit": useRef(),
    "Sainte-Rose": useRef(),
    "Saint-Philippe": useRef(),
    "Saint-Joseph": useRef(),
    "Petite-ile": useRef(),
    "Saint-Pierre": useRef(),
    "Saint-Louis": useRef(),
    "Etang-Sale": useRef(),
    "Les Avirons": useRef(),
    "Saint-Leu": useRef(),
    "Les Trois Bassins": useRef(),
    "Saint-Paul": useRef(),
    "Le Port": useRef(),
    "La Possession": useRef(),
    Salazie: useRef(),
    "Plaine des Palmistes": useRef(),
    "Le Tampon": useRef(),
    "Entre-Deux": useRef(),
    Cilaos: useRef(),
  };
}

export function useInstallationsRefInit() {
  return {
    parallele: useRef(),
    "bar fixe": useRef(),
    echelle: useRef(),
    "planche abdo": useRef(),
  };
}

export function useEndWindo(nextURL) {
  const [endAnim, setEndAnim] = useState(false);
  let urlActuel = useLocation();

  useEffect(() => {
    if (nextURL !== "" && nextURL !== urlActuel.pathname && nextURL) {
      setEndAnim(true);
    }
  }, [nextURL]);

  return endAnim;
}

export function useWidthMap() {
  const [width, setWidth] = useState("100px");
  const [height, setheight] = useState("100px");
  const mediaQuery = `(max-width: ${device.laptop})`;
  const mediaQueryList = window.matchMedia(mediaQuery);

  mediaQueryList.addEventListener("change", (event) => {
    if (event.matches) {
      setWidth("250px");
      setheight("250px");
    } else {
      setWidth("400px");
      setheight("400px");
    }
  });

  return { width, height };
}

export function useDownloadData() {
  const [endDownloadFlag, setEndDownloadFlag] = useState(false);
  const [data, setData] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [typeError, setTypeError] = useState({});
  const userId = "Projet_Street";

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(FormatDataFireBase(snapshot.val()))
          setEndDownloadFlag(true);
        } else {
          setErrorFlag(true);
          setTypeError("error data");
          setEndDownloadFlag(true);
        }
      })
      .catch((error) => {
        setErrorFlag(true);
        setTypeError("serveur");
        setEndDownloadFlag(true);
      });
  }, []);

  return { endDownloadFlag, data, errorFlag, typeError };
}
