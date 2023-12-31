import React from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Form from "../../components/Form/Form.component";
import "./Create.styles.css";

function Create() {
  return (
    <div>
      <div className="tituloCreate">
        <h2>Api Dogs | Create Dog</h2>
      </div>
      <Navbar />
      <Form />
    </div>
  );
}

export default Create;
