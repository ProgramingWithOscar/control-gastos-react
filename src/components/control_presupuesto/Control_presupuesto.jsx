import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const ControlPresupuesto = ({
  presupuesto,
  gastos,
  disponible,
  setDisponible,
  gastado,
  setGastado,
  setGastos, 
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => {
      return gasto.cantidad + total;
    }, 0);

    const totalDisponible = presupuesto - totalGastado;
    //calcular porcentaje gastado
    const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto) * 100).toFixed(2);
    setTimeout(() => {
    setPorcentaje(nuevoPorcentaje);

    }, 1000)
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

    if(resultado) {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#4F6F52',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : '#86A789'
        })} 
        value={porcentaje}
        text={`${porcentaje}% Gastado`}

        
        ></CircularProgressbar>
      </div>
      <div className="contenido-presupuesto">
       <button onClick={handleResetApp} className="reset-app">Resetear App</button>  
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
