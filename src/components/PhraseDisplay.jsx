// src/components/PhraseDisplay.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../utils/localStorage";
import "../styles/PhraseDisplay.css";

const PhraseDisplay = () => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const lastGenerated = getItem("lastGenerated");
    const generatedImage = getItem("generatedImage");

    // Verificar si han pasado más de 24 horas
    if (!lastGenerated || Date.now() - new Date(lastGenerated) >= 86400000) {
      // Limpiar localStorage y redirigir
      removeItem("lastGenerated");
      removeItem("generatedImage");
      navigate("/");
    } else {
      setImage(generatedImage);
    }
  }, [navigate]);

  return (
    <section className="frase">
      {image && <img src={image} alt="Imagen generada" />}
      <img src="./logo.png" alt="Logo de la Cerveceria Santa Fe" />
    </section>
  );
};

export default PhraseDisplay;
