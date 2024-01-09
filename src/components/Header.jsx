import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./control_presupuesto/Control_presupuesto";
const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  disponible,
  setDisponible,
  gastado,
  setGastado,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          disponible={disponible}
          setDisponible={setDisponible}
          gastado={gastado}
          setGastado={setGastado}
          gastos={gastos}
          presupuesto={presupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
