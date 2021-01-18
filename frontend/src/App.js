import React from "react"
import NavBar from "./components/NavBar"
import BootstrapForm from "./components/BootstrapForm"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
  return (
    <React.Fragment>
      <NavBar />
      <BootstrapForm amount={500} />
    </React.Fragment>
  );
}

export default App;