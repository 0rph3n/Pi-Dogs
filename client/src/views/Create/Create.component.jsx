import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Form from "../../components/Form/Form.component";
import Card from "../../components/Card/Card.component";

//? El searchbar se va a mostrar en todas las paginas ya que muestra los link
function Create() {
  return (
    <div>
      <Navbar />
      <Form />
      <Card />
    </div>
  );
}

export default Create;
