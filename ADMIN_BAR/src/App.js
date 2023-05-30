import { useState } from "react";
import { Outlet } from "react-router-dom";
import Content from "./components/content/Content";
import AddBeer from "./components/form/AddBeer";
import UpdateBeer from "./components/form/UpdateBeer";
import Header from "./components/header/Header";
import './moment/fr';

function App() {

  const [showAddForm, setShowAddForm] = useState("0");
  const [oneBeer, setOneBeer] = useState({});

  function showAddBeerForm() {
    setShowAddForm("2");
  }

  function showUpdateOneBeerForm(id) {
    console.log(id);
      async function getOneBeer() {
          try {
              const response = await fetch(`http://localhost:8000/getOneBeer/${id}`)
              const oneBeerFromBack = await response.json();
              console.log(oneBeerFromBack);
              setOneBeer(oneBeerFromBack.beer)
          } catch (error) {
              console.log(error);
          }
      }
  
      getOneBeer();
      setShowAddForm("3");
  }

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
