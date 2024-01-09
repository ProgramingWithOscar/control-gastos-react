import { useState, useEffect } from "react";


import CerrarModal from "../../img/cerrar.svg";
import Mensaje from "../Mensaje";
const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, disponible, gastoEditar, setGastoEditar }) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  useEffect(()=> {
    if(Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
    }
  }, [gastoEditar])
  const categories = ["Ahorro", "Comida", "Casa", "Gastos Varios", "Ocio", "Salud", "Suscripciones"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre, cantidad, categoria].includes('')) {
      setMessage('Todos los campos son obligatorios');

      setTimeout(() => {
        setMessage('');
      }, 3000)
      return;
    }
    console.log(gastoEditar);
    console.log(cantidad);
    // if(cantidad > disponible){
    //   setMessage("No tienes suficiente dinero para realizar este gasto");
    //   setTimeout(() => {
    //     setMessage('');
    //   }, 3000)
    //   return;
    // }
 
    guardarGasto({nombre, cantidad, categoria, id});
  }


  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>{gastoEditar.nombre ? "Editar Gasto": "Nuevo Gasto"}</legend>
          {message && <Mensaje tipo="error">{message}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            value={nombre}
            type="text"
            placeholder="Añade el nombre del Gasto"
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            placeholder="Añade la cantidad del Gasto: ej. 300"
            onChange={ e => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
            <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value=""> ----Seleccione----</option>
                {
                    categories.map((item,index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )
                    })
                }
            </select>
        </div>
                <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios": "Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
