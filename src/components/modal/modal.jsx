import CerrarModal from "../../img/cerrar.svg";
const Modal = ({ setModal, animarModal, setAnimarModal }) => {
  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const categories = ["Ahorro", "Comida", "Casa", "Gastos Varios", "Ocio", "Salud", "Suscripciones"];

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo Gasto</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del Gasto"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del Gasto: ej. 300"
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
            <select id="categoria">
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
