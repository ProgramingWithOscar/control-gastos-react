import { useState } from "react";
import Mensaje from "./Mensaje";
const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [message, setMessage] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    console.log("Enviando...");

    // console.log(Number(presupuesto))

    if (!presupuesto || presupuesto <= 0) {
      setMessage("No es un presupuesto valido");

      return;
    }

    setMessage("");
    setIsValidPresupuesto(true)
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto != 0 ? presupuesto : ''}
            onChange={(value) => setPresupuesto(Number(value.target.value))}
          />

          <input type="submit" value="Añadir" />

          {message && <Mensaje tipo={"error"}>{message}</Mensaje>}
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
