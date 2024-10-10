// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import MainView from "./components/MainView.jsx";
import RandomPhrase from "./components/RandomPhrase.jsx";
import PhraseDisplay from "./components/PhraseDisplay.jsx";
import { useEffect, useState } from "react";
import { getItem } from "./utils/localStorage";

const App = () => {
  const [lastGenerated, setLastGenerated] = useState(null);

  useEffect(() => {
    const savedLastGenerated = getItem("lastGenerated");
    if (savedLastGenerated) {
      setLastGenerated(savedLastGenerated);
    }
  }, []);

  const renderRoutes = () => {
    return lastGenerated ? (
      <>
        <Route path="/frase-seleccionada" element={<PhraseDisplay />} />
        <Route path="*" element={<Navigate to="/frase-seleccionada" />} />
      </>
    ) : (
      <>
        <Route path="/" element={<MainView />} />
        <Route path="/frase-random" element={<RandomPhrase />} />
        <Route path="/frase-seleccionada" element={<PhraseDisplay />} />
      </>
    );
  };

  return (
    <UserProvider>
      <Router>
        <Routes>{renderRoutes()}</Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
