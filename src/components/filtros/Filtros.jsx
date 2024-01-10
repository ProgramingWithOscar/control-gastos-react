import { useState, useEffect } from "react";

const Filtros = ({ categories, filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value=""> --- Seleccione ---</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
