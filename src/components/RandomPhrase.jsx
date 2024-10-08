// src/components/RandomPhrase.jsx
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";
import { db } from "../firebase"; // Importar la configuración de Firebase
import { collection, addDoc } from "firebase/firestore"; // Importar métodos necesarios

const RandomPhrase = () => {
  const phrases = ["frase 1", "frase 2", "frase 3"];
  const [selectedPhrase, setSelectedPhrase] = useState(
    localStorage.getItem("generatedPhrase") || ""
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const { userData } = useUser(); // Usamos userData para mantener datos del usuario
  const { dni, birthDate, registrationDate } = userData;

  // Validar si el usuario ya generó una frase en las últimas 24 horas
  useEffect(() => {
    const lastGenerated = localStorage.getItem("lastGenerated");

    if (lastGenerated && Date.now() - new Date(lastGenerated) < 86400000) {
      window.location.href = "/phrase-display"; // Redirige si ya generó una frase
    }
  }, []);

  // Función para generar una frase aleatoria
  const generatePhrase = () => {
    const now = new Date();
    const lastGenerated = localStorage.getItem("lastGenerated");

    // Si ya generó una frase en las últimas 24 horas, no le permitimos generar una nueva
    if (lastGenerated && now - new Date(lastGenerated) < 86400000) {
      alert("Debes esperar 24 horas antes de generar otra frase.");
      return;
    }

    setIsSpinning(true);
    setSelectedPhrase("");

    setTimeout(async () => {
      // Generar una frase aleatoria
      const randomIndex = Math.floor(Math.random() * phrases.length);
      const phrase = phrases[randomIndex];
      setSelectedPhrase(phrase); // Guardamos en el estado local la frase generada
      setIsSpinning(false);

      // Guardar la fecha y la frase en localStorage
      localStorage.setItem("lastGenerated", now.toISOString());
      localStorage.setItem("generatedPhrase", phrase);

      try {
        // Guardar en Firestore
        console.log(dni, birthDate, registrationDate);
        await addDoc(collection(db, "users"), {
          dni,
          birthDate,
          registrationDate,
        });
        // Redirigir a la vista de generación de frases
        window.location.href = "/random-phrase";
      } catch (error) {
        console.error("Error al guardar en Firestore:", error);
        alert("Hubo un error al guardar tus datos.");
      }
    }, 3000); // Simular el "spin" por 3 segundos
  };

  return (
    <div>
      <h2>Bienvenido, {userData?.dni}</h2> {/* Mostramos datos del usuario */}
      <button onClick={generatePhrase}>Generar frase aleatoria</button>
      {isSpinning && <p>Girando...</p>}
      {!isSpinning && selectedPhrase && <h1>{selectedPhrase}</h1>}
    </div>
  );
};

export default RandomPhrase;
