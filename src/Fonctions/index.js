import { useNavigate } from "react-router-dom";

// Gestion Filtre
export const FiltreCheckBox = (listeSelect, liste, keySelect) => {
  try {
    if (listeSelect.length > 0) {
      return liste.filter((item) =>
        keySelect === "installations"
          ? VerificationListeDansListe(item[keySelect], listeSelect)
          : listeSelect.indexOf(item[keySelect]) > -1
      );
    } else {
      return [...liste];
    }
  } catch (error) {
    return [...liste];
  }
};

export const FormatageListeElementVue = (group, liste) => {
  const newListe = [];
  if (liste.length > 0) {
    let nbPage = ConversionFloatSuperieur(liste.length / group);
    let indice = 0;
    let flagFin = false;
    for (let page = 0; page < nbPage; page++) {
      const listePage = [];
      for (let element = 0; (element < group) & !flagFin; element++) {
        listePage.push(liste[indice]);
        indice++;
        if (indice === liste.length) {
          flagFin = true;
        }
      }
      newListe.push([...listePage]);
    }
  }
  return newListe;
};

export const VerificationListeDansListe = (liste1, liste2) => {
  let flag = false;

  liste1.map((item) => {
    if (liste2.indexOf(item) > -1) {
      flag = true;
    }
  });
  return flag;
};

export const GestionListePage = (nbPage, actuelPage, pageVisible, espace) => {
  let listePage = [];
  if ((actuelPage > 0) & (espace > 0)) {
    if (nbPage < pageVisible) {
      for (let i = 0; i < nbPage; i++) {
        listePage.push(i + 1);
      }
    } else {
      if ((actuelPage > espace) & (actuelPage < nbPage - espace)) {
        for (let i = actuelPage - espace; listePage.length < pageVisible; i++) {
          listePage.push(i);
        }
      } else if (actuelPage <= espace) {
        for (let i = 0; i < pageVisible; i++) {
          listePage.push(i + 1);
        }
      } else if (actuelPage >= nbPage - espace) {
        for (
          let i = nbPage - pageVisible + 1;
          listePage.length < pageVisible;
          i++
        ) {
          listePage.push(i);
        }
      }
    }
  }
  return listePage;
};

export const PointMilieuListeCoordonne = (tableau) => {
  let x = [];
  let y = [];
  tableau.map((coordonne) => {
    x.push(coordonne[0]);
    y.push(coordonne[1]);
  });
  return [
    (Math.max(...x) + Math.min(...x)) / 2,
    (Math.max(...y) + Math.min(...y)) / 2,
  ];
};

export const ConversionFloatSuperieur = (nombre) => {
  try {
    if (nombre.toString().indexOf(".") > -1) {
      return Math.trunc(nombre) + 1;
    } else {
      return nombre;
    }
  } catch (error) {
    return false;
  }
};

export const GoNextURL = (nextURL) => {
  const navigation = useNavigate();
  navigation(nextURL);
};

export const TranslY = (val, unite = "px") => {
  return "translateY(" + val + unite + ")";
};

export const TranslX = (val, unite = "px") => {
  return "translateX(" + val + unite + ")";
};

export const TranslZ = (val, unite = "px") => {
  return "translateZ(" + val + unite + ")";
};

export const FormatDataFireBase = (data) => {
  let newListe = [];
  try {
    Object.keys(data).map((item) => (newListe.push(data[item])));
  } catch (error) {
    console.log(error);
  }
  return newListe
};
