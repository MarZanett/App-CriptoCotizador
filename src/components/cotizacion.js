import React from "react";
import styled from "@emotion/styled";

const ResultadoDiv= styled.div`
color: #fff;
`;

const Parrafo= styled.p`
font-size:18px;
span{
    font-weight:bold;
}
`;

const Precio= styled.p`
font-size:30px;
`;


const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;
  console.log(resultado);
  return (
    <ResultadoDiv>
      <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
      <Parrafo>El precio más alto del día fue: <span>{resultado.HIGHDAY}</span></Parrafo>
      <Parrafo>El precio más bajo del dia fue: <span>{resultado.LOWDAY}</span></Parrafo>
      <Parrafo>Variacion últimas 24hs: <span>{resultado.CHANGEPCT24HOUR}</span></Parrafo>
      <Parrafo>Última actualizacion: <span>{resultado.LASTUPDATE}</span></Parrafo>
    </ResultadoDiv>
  );
};

export default Cotizacion;
