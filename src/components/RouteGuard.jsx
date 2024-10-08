// // src/components/RouteGuard.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RouteGuard = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const lastGenerated = localStorage.getItem("lastGenerated");
//     const now = new Date();

//     if (lastGenerated) {
//       const timeSinceLast = now - new Date(lastGenerated);
//       if (timeSinceLast < 86400000) {
//         // Si no han pasado 24 horas, redirigir a "/phrase-display"
//         navigate("/phrase-display");
//       } else {
//         // Si ya pasaron 24 horas, eliminar el registro y permitir navegación normal
//         localStorage.removeItem("lastGenerated");
//       }
//     }
//   }, [navigate]);

//   return children;
// };

// export default RouteGuard;
