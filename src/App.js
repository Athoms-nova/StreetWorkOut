import "./App.scss";
import Home from "./Pages/Home";
import Parks from "./Pages/Parks";
import Navigation from "./Components/Navigation";
import Presentation from "./Pages/Presentation";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AnimContext } from "./Context/AnimContext";
import TransitionModal from "./Components/TransitionModal";
import ChargementServeur from "./Components/ChargementServeur";
import { GestionContext } from "./Context/GestionContext";

function App() {
  const { onAnimation } = useContext(AnimContext);
  const {endDownloadFlag} = useContext(GestionContext)
  return (
    <div className="App">
      {onAnimation && <TransitionModal />}
      {endDownloadFlag ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Parks" element={<Parks />} />
            <Route path="/Ok" element={<Parks />} />
            <Route path="/Parks_:infoFiltre" element={<Parks />} />
            <Route path="/Parks/:id" element={<Presentation />} />
            <Route path="*" element={<Home />} />

          </Routes>
        </>
      ) : (
        <ChargementServeur />
      )}
    </div>
  );
}

export default App;
