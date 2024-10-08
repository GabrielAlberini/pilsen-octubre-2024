// src/components/MainView.js
import { useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const MainView = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dni, setDni] = useState("");
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthDate = new Date(year, month - 1, day);
    const age = calculateAge(birthDate);

    if (age < 18) {
      alert("Debes ser mayor de edad para continuar.");
      return;
    }

    // Guardar los datos en el estado global
    setUserData({
      dni,
      birthDate: birthDate.toISOString(),
    });

    // Redirigir a la vista de generación de frases
    navigate("/random-phrase");
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Día de nacimiento:
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </label>
      <label>
        Mes de nacimiento:
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </label>
      <label>
        Año de nacimiento:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </label>
      <label>
        DNI:
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </label>
      <button type="submit">Continuar</button>
    </form>
  );
};

export default MainView;
