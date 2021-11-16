import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from "./error";
import useMoneda from "../hooks/useMoneda";
import useCripto from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326a60;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCripto}) => {
  //state del listado de criptomonedas
  const [listaCripto, guardarCriptoMone] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar EEUU" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "ARS", nombre: "Peso Argentino" },
    { codigo: "EUR", nombre: "Euro" },
  ];

  //utilizar useMoneda
  const [moneda, SelecMoneda] = useMoneda("Elige tu Moneda", "", MONEDAS);

  //utilizar useCripto
  const [criptomoneda, SelecCripto] = useCripto(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  //Ejecutar llamado a la api

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      //console.log(resultado.data.Data)
      guardarCriptoMone(resultado.data.Data);
    };
    consultarApi();
  }, []);

  //Cuando el usuario hace submit

  const cotizarMoneda = (e) => {
    e.preventDefault();

    //Validar si ambos campos estan completos
    if (!moneda || !criptomoneda) {
      guardarError(true);
      return;
    }

    //Pasar los datos al campo principal
    guardarError(false);
    guardarCripto(criptomoneda);
    guardarMoneda(moneda)
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje= "Todos los campos son obligatorios"/> : null}
      <SelecMoneda />
      <SelecCripto />
      <Boton type="submit" value="Calcular"></Boton>
    </form>
  );
};

export default Formulario;
