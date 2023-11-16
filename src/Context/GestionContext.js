import { createContext, useEffect, useState } from "react";
import { FiltreCheckBox, FormatageListeElementVue, GestionListePage} from "../Fonctions";
import { useDownloadData } from "../Hook";

export const GestionContext = createContext();

export const GestionProvider = ({ children }) => {
  const [currentListe, setCurrentListe] = useState([])
  const [dataParId, setDataParId] = useState({});
  const [formatListePage, setFormatListePage] = useState([]);
  const [parkActuel, setParkActuel] = useState({});
  const [pageActuel, setPageActuel] = useState(0);
  const [listePagination, setListePagination] = useState([]);
  const [villesSelect, setVillesSelect] = useState([]);
  const [installationsSelect, setInstallationsSelect] = useState([]);
  const [saisieRecherche, setSaisieRecherche] = useState("");
  const [flagMap, setFlagMap] = useState(true);
  const [flagModalMap, setFlagModalMap] = useState(false);
  const [nextURL, setNextURL] = useState("")
  const {endDownloadFlag, data, errorFlag, typeError} = useDownloadData()




  const ResteVariable = () => {
    setPageActuel(0);
    setVillesSelect([]);
    setInstallationsSelect([]);
    setFormatListePage([]);
    setListePagination([]);
    setSaisieRecherche("");
  };

  const ActualisationPark = () => {
    flagMap
      ? setFormatListePage(FormatageListeElementVue(8, currentListe))
      : setFormatListePage(FormatageListeElementVue(8, currentListe));
  };

  useEffect(() => {
    ActualisationPark()
  }, [flagMap, currentListe])

  useEffect(() => {
    let newListeParId = {};
    data.map((item) => (newListeParId[item.id] = item));
    setCurrentListe(data)
    setDataParId(newListeParId);
  }, [data]);


  useEffect(() => {
    setListePagination(
      GestionListePage(formatListePage.length, pageActuel + 1, 4, 1)
    );
  }, [formatListePage]);


  useEffect(() => {
    let newListe = [...data];
    newListe = FiltreCheckBox(villesSelect, newListe, "ville");
    newListe = FiltreCheckBox(installationsSelect, newListe, "installations");
    if (saisieRecherche.length > 0) {
      newListe = newListe.filter(
        (item) =>
          item.title
            .toUpperCase()
            .indexOf(saisieRecherche.toUpperCase()) > -1
      );
    }
    setCurrentListe(newListe)
    ActualisationPark()
    setPageActuel(0);
  }, [villesSelect, installationsSelect, saisieRecherche]);



  return (
    <GestionContext.Provider
      value={{
        data,
        formatListePage,
        setFormatListePage,
        parkActuel,
        setParkActuel,
        pageActuel,
        setPageActuel,
        listePagination,
        setListePagination,
        villesSelect,
        setVillesSelect,
        installationsSelect,
        setInstallationsSelect,
        saisieRecherche,
        setSaisieRecherche,
        flagMap,
        setFlagMap,
        flagModalMap,
        setFlagModalMap,
        dataParId,
        nextURL, 
        setNextURL,

        ResteVariable,
        ActualisationPark,
        endDownloadFlag
      }}
    >
      {children}
    </GestionContext.Provider>
  );
};
