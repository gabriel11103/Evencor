import React from "react";
import './Info.css';  

function About() {
  return (
    <div className="container" >
      <h3>
        Evencor es una pagina web de eventos en la ciudad de córdoba desarrollada por Gabriel Ulloque para la
        catedra 3k6 de desarrollo de software.
      </h3>
      <p>
        Este programa es una aplicación web de gestión de eventos que permite a
        los administradores crear, visualizar, actualizar y eliminar eventos,
        así como a los usuarios buscar y ver información sobre eventos. La
        aplicación se basa en un backend con Node.js y Express, y un frontend
        con React.
      </p>
      <h4>Componentes Principales</h4>
      <p>
        El programa se divide en dos partes principales: el backend y el
        frontend.
      </p>
      <h5>Backend</h5>
      <p>
        El backend maneja las solicitudes de la aplicación, se
        comunica con la base de datos, y proporciona datos y servicios a través
        de una API.
      </p>
      <h5>Frontend</h5>
      <p>
      El frontend permite a los usuarios
      interactuar con la aplicación a través de una interfaz web. Utiliza React
      para construir componentes de UI y manejar el estado.
      </p>
    </div>
  );
}

export default About;
