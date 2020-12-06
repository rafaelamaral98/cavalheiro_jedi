import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/Estilo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap';
import Header from './componentes/cabecalho';
import Footer from './componentes/footer';

ReactDOM.render(
  <React.StrictMode>

    <Header/>



    <Footer/>

  </React.StrictMode>,
  document.getElementById('root')
);