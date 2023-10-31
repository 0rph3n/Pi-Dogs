import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing.component";
import Home from "./views/Home/Home.component";
import Detail from "./views/Detail/Detail.component";
import Create from "./views/Create/Create.component";

//? Se generan las rutas para cada pagina, estas son con exact path para que solo se pueda ingresar si la ruta es correcta
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" Component={Landing} />
        <Route exact path="/home" Component={Home} />
        <Route exact path="/dogs/:id" Component={Detail} />
        <Route exact path="/create" Component={Create} />
      </Routes>
    </div>
  );
}

export default App;
