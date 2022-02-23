import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { ContextoFormulario } from "../../context/ContextoFormulario";

// Esta función se encarga de enviar el formulario al servidor cuando se invoca el metodo mutate.
const enviarFormulario = async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error al enviar el formulario");
  }
};

/**
 * Componente que muestra el detalle del formulario, con
 * la informde cada uno de los campos que han sido completados.
 *
 * @returns {JSX.Element}
 */
const Detalle = () => {
  // Utilizamos useMutation para enviar el formulario al servidor.
  const { data, isLoading, isError, mutate, isSuccess } =
    useMutation(enviarFormulario);

  const { formulario } = useContext(ContextoFormulario);

  const { nombre, apellido, email } = formulario?.entrenador;

  const {
    nombrePokemon,
    tipoPokemon,
    elementoPokemon,
    alturaPokemon,
    edadPokemon,
  } = formulario?.pokemon;

  // Utilizamos un useEffect para que se ejecute una vez realiza la mutación y mostrar el mensaje de éxito o error.
  useEffect(() => {
    if (isSuccess) {
      alert(`Formulario enviado correctamente, id ${data ? data?.id : ""}`);
    } else if (isError) {
      alert("Error al enviar el formulario. Por favor intente nuevamente");
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="detalle-formulario">
      <div className="encabezado">
        <h3>Vista Previa de la Solicitud</h3>
      </div>
      <section className="datos-cliente">
        <h4>Datos del Entrenador</h4>
        <div className="fila">
          <p>Nombre: {nombre}</p>
          <p>Apellido: {apellido}</p>
          <p>Email: {email}</p>
        </div>
      </section>
      <section className="datos-cliente">
        <h4>Datos del Pokémon</h4>
        <div className="fila">
          <p>Nombre: {nombrePokemon}</p>
          <p>Tipo: {tipoPokemon}</p>
          <p>Elemento: {elementoPokemon}</p>
          <p>Altura: {alturaPokemon}</p>
          <p>Edad: {edadPokemon}</p>
        </div>
      </section>
      <button className="boton-enviar" onClick={() => mutate(formulario)}>
        {isLoading ? "Enviando formulario..." : "Enviar Solicitud"}
      </button>
    </div>
  );
};
Detalle.propTypes = {};

export default Detalle;
