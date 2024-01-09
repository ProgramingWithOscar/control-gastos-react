import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/modal/modal";
import { generarId } from "./components/helpers";
import ListadoGastos from "./components/gastos/ListadoGastos";


function App() {
  const [presupuesto, setPresupuesto] = useState(() => Number((localStorage.getItem('presupuesto')) ?? 0 ));
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
  );
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [gastoEditar, setGastoEditar] = useState({});
  console.log('valid' , isValidPresupuesto)
  useEffect(()=> {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout(() => {
        
        setAnimarModal(true);
      },500)
    }
  }, [gastoEditar])

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto ?? 0))
    console.log('presupuesto', presupuesto)
  }, [presupuesto])

  useEffect(() => {
   localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));
    console.log('presupuestoLS', presupuestoLS)

    presupuestoLS > 0 && setIsValidPresupuesto(true)
     
    
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      
      setAnimarModal(true);
    },500)
  }

  const guardarGasto = (gasto) => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map(gastoState =>  gastoState.id === gasto.id ? gasto : gastoState);
        setGastos(gastosActualizados)
        setGastoEditar({})
      
      
    }else {
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
  
      
    }

   
      setAnimarModal(false);
      setTimeout(() => {
        setModal(false);
      }, 500);
    
  
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id != id)

    setGastos(gastosActualizados);
  }
  return (
    < >
     <div className={modal ? 'fijar': ''}>
     <div >
        <Header
          disponible={disponible}
          setDisponible={setDisponible}
          gastado={gastado}
          setGastado={setGastado}
          gastos ={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      </div>

      {isValidPresupuesto && (
        <>
        <main>
          <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} />
        </main> 
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
        </div>
        </>
      )}

      {modal && <Modal 
       gastoEditar={gastoEditar}
       gastado={gastado}
       disponible={disponible}
       setModal={setModal}
       animarModal={animarModal}
       setAnimarModal={setAnimarModal}
       guardarGasto ={ guardarGasto}
       setGastoEditar={setGastoEditar}
        />}
     </div>  
    </>
  );
}

export default App;
