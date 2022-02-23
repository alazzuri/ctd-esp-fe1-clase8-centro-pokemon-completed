import React, { useContext } from "react";
import propTypes from "prop-types";
import { ContextoFormulario } from "../../context/ContextoFormulario";

// Creamos el componente Select con los props que necesitamos para poder usarlo en el componente Formulario
const Select = ({ name, label, options = [], disabled = false }) => {
  const { handleInputBlur } = useContext(ContextoFormulario);

  const onChange = (e) => {
    e.preventDefault();

    handleInputBlur("ACTUALIZAR_POKEMON", {
      campo: "tipoPokemon",
      valor: e.target.value,
    });
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange} disabled={disabled}>
        <option value="">Seleciona el tipo de pokemon</option>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.array,
  disabled: propTypes.bool,
};

export default Select;
