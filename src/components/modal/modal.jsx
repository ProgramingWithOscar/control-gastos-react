import { useState } from "react";


import CerrarModal from "../../img/cerrar.svg";
import Mensaje from "../Mensaje";
const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [message, setMessage] = useState('');

  const ocultarModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const categories = ["Ahorro", "Comida", "Casa", "Gastos Varios", "Ocio", "Salud", "Suscripciones"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre, cantidad, categoria].includes('')) {
      setMessage('Todos los campos son obligatorios');

      setTimeout(() => {
        setMessage('');
      }, 3000)
      console.log(message + 'hola')
      return;
    }

    guardarGasto({nombre, cantidad, categoria});
  }


  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo Gasto</legend>
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
                <input type="submit" value={"Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
