import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/form";
import Cotizacion from "./components/cotizacion";
import Spinner from "./components/spinner"

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rm;
  }
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  text-align: left;
  color: #fff;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100%;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
  
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptoMoneda, guardarCripto] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando,guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (!moneda) return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
      
      const resultado = await axios.get(url);

      //mostrar Spinner
      guardarCargando(true)
      // ocultar spiner

      setTimeout(() =>{
        guardarCargando(false);

        //guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);

      },3000)

    };
    cotizarCriptomoneda();
  }, [moneda, criptoMoneda]);

  //mostrar spiner o resultado
  const componente = (cargando)? <Spinner /> : <Cotizacion resultado = {resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen cripto" />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
