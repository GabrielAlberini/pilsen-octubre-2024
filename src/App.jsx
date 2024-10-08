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

const App = () => {
  const [lastGenerated, setLastGenerated] = useState(null);

  useEffect(() => {
    const savedLastGenerated = localStorage.getItem("lastGenerated");
    if (savedLastGenerated) {
      setLastGenerated(savedLastGenerated);
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {lastGenerated ? (
            <>
              <Route path="/phrase-display" element={<PhraseDisplay />} />
              <Route path="*" element={<Navigate to="/phrase-display" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<MainView />} />
              <Route path="/random-phrase" element={<RandomPhrase />} />
              <Route path="/phrase-display" element={<PhraseDisplay />} />
            </>
          )}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
