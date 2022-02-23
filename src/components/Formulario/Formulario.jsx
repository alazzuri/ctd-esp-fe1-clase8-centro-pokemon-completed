import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ProviderFormulario from "../../context/ContextoFormulario";
import pokebola from "../../assets/pokebola.png";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Detalle from "./Detalle";

// Creamos la función que obtiene los tipos de pokemon de la API.
const getPokemonTypes = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type/");
  const data = await response.json();
  return data.results;
};

/**
 * Componente que muestra los inputs del formulario.
 *
 * @returns {JSX.Element}
 */
const Formulario = () => {
  // Obtenemos los tipos de pokemon de la API usando el hook useQuery. Obtenemos el resultado de la consulta
  // y lo guardamos en la variable tipos. Además obtenemos las variables isLoading e isError para deshabilitar
  // el input.
  const {
    data: tipos,
    isLoading,
    isError,
  } = useQuery("pokemonTypes", getPokemonTypes);

  return (
    <>
      <header className="form-header">
        <div>
          <img src={pokebola} alt="pokebola" />
          <h2>Centro Pokemon de Ash</h2>
        </div>
        <Link className="volver" to="/">
          Home
        </Link>
      </header>
      <div className="formulario-ingreso">
        <h3>Solicitud de atención</h3>
        <p>
          Por favor, completa el formulario para que podamos atender a tu
          pokémon
        </p>
        <div className="cuerpo-formulario">
          <ProviderFormulario>
            <div className="inputs">
              <div>
                <p className="nombre-seccion">
                  <img src={entrenador} alt="entrenador" />
                  <span>ENTRENADOR</span>
                </p>
                <Input name="nombre" label="Nombre" shouldFocus={true} />
                <Input name="apellido" label="Apellido" />
                <Input name="email" label="Email" type="email" />
              </div>
              <div>
                <p className="nombre-seccion">
                  <img src={pikachu} alt="pikachu" />
                  <span>POKEMON</span>
                </p>
                <Input name="nombrePokemon" label="Nombre" isPokemon={true} />
                <Select
                  name="tipoPokemon"
                  label="Tipo"
                  options={tipos}
                  disabled={isLoading || isError} // Deshabilitamos el input si está cargando o si hay un error
                />
                <Input
                  name="elementoPokemon"
                  label="Elemento"
                  isPokemon={true}
                />
                <Input name="alturaPokemon" label="Altura" isPokemon={true} />
                <Input name="edadPokemon" label="Edad" isPokemon={true} />
              </div>
            </div>
            <Detalle />
          </ProviderFormulario>
        </div>
      </div>
    </>
  );
};

Formulario.propTypes = {};

export default Formulario;
