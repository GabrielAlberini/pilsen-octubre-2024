// src/components/MainView.js
import { useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/MainView.css";

const MainView = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dni, setDni] = useState("");
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthDate = new Date(year, month - 1, day);
    const age = calculateAge(birthDate);

    if (age < 18) {
      alert("Debes ser mayor de edad para continuar.");
      return;
    }

    // Guardar los datos en el estado global
    const registrationDate = new Date(); // Fecha actual para el registro
    setUserData({
      dni,
      birthDate: birthDate.toLocaleDateString(),
      registrationDate: registrationDate.toISOString(), // Guardar fecha de registro
    });

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
    <section className="home">
      <h2>
        FECHA DE <br /> NACIMIENTO:
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="cont-fecha-nacimiento">
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            min={1}
            max={31}
            placeholder="Día"
          />
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            min={1}
            max={12}
            placeholder="Mes"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            min={1930}
            max={2006}
            placeholder="Año"
          />
        </div>
        <div className="cont-dni">
          <input
            type="number"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            placeholder="DNI"
          />
        </div>
        <button type="submit">CONTINUAR</button>
      </form>
      <img src="./logo.png" alt="Logo de Cerveceria Santa Fe" />
    </section>
  );
};

export default MainView;
