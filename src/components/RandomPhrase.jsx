import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../styles/RandomPhrase.css";

const RandomPhrase = () => {
  const images = ["./1.png", "./2.png", "./3.png"];
  const [isGif, setIsGif] = useState(false);
  const { userData } = useUser();
  const { dni, birthDate, registrationDate } = userData || {};
  const navigate = useNavigate();
  const [lastGenerated, setLastGenerated] = useState(
    localStorage.getItem("lastGenerated")
  );

  useEffect(() => {
    if (lastGenerated && Date.now() - new Date(lastGenerated) < 86400000) {
      navigate("/frase-seleccionada");
    }
  }, [lastGenerated, navigate]);

  const generateImage = async () => {
    const now = new Date();
    if (lastGenerated && now - new Date(lastGenerated) < 28800000) {
      alert("Debes esperar 8 horas antes de generar otra imagen.");
      return;
    }

    setIsGif(true);
    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];
      localStorage.setItem("generatedImage", selectedImage);
      localStorage.setItem("lastGenerated", now.toISOString());
      setLastGenerated(now.toISOString());

      if (userData) {
        try {
          await addDoc(collection(db, "users"), {
            dni,
            birthDate,
            registrationDate,
          });
          setIsGif(false);
          navigate("/frase-seleccionada");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("No se encontraron datos de usuario.");
      }
    }, 5000);
  };

  return (
    <section className="gif">
      {isGif && (
        <div className="cont-gif">
          {/* Reemplazar las imágenes aleatorias por el GIF */}
          <img
            src="./frases.gif"
            alt="GIF animado"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
      <div className="cont-content">
        {!isGif && <button onClick={generateImage}>¡GIRAR!</button>}
        <img src="./logo.png" alt="Logo de la Cerveceria Santa Fe" />
      </div>
    </section>
  );
};

export default RandomPhrase;
