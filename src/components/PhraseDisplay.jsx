// src/components/PhraseDisplay.jsx
import { useEffect, useState } from "react";

const PhraseDisplay = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const lastGenerated = localStorage.getItem("lastGenerated");
    const generatedPhrase = localStorage.getItem("generatedPhrase");

    // Verificar si han pasado más de 24 horas
    if (!lastGenerated || Date.now() - new Date(lastGenerated) >= 86400000) {
      // Limpiar localStorage y redirigir
      localStorage.removeItem("lastGenerated");
      localStorage.removeItem("generatedPhrase");
      window.location.href = "/";
    } else {
      // Establecer la frase si existe en el localStorage
      setPhrase(generatedPhrase);
    }
  }, []);

  return (
    <div>
      <h1>Frase generada:</h1>
      <p>{phrase}</p>
    </div>
  );
};

export default PhraseDisplay;
