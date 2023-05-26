import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { NavLink, Outlet } from 'react-router-dom';

export default function Content({ showAddForm, showUpdateForm }) {
  const [data, setData] = useState([]);

  function showVisible(item) {
    console.log(item);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({visible : !item.visible})
    };

    fetch(`http://localhost:8000/majOneBeer/${item._id}`, options)
      .then(response => response.json())
      .then(data => setData(data.beers))
      .catch(error => console.error(error));
  }

  function showDispo(item) {
    console.log(item);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({dispo : !item.dispo})
    };

    fetch(`http://localhost:8000/majOneBeer/${item._id}`, options)
      .then(response => response.json())
      .then(data => setData(data.beers))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    async function getAllBeers() {
        try {
            const response = await fetch('http://localhost:8000/getAllBeers')
            const beersFromBack = await response.json();
            console.log(beersFromBack);
            setData(beersFromBack.beers);
        } catch (error) {
            console.log(error);
        }
    }
    getAllBeers();
}, [])


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th  colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
              <Form>
                <Form.Check
                  type="switch"
                  id="visible"
                  label="Visible"
                  readOnly
                  checked={item.visible}
                  onClick={() => showVisible(item)}
                />
              </Form>
              </td>
              <td>
              <Form>
                <Form.Check
                  type="switch"
                  id="dispo"
                  label="Disponible"
                  readOnly
                  checked={item.dispo}
                  onClick={() => showDispo(item)}
                />
              </Form>
              </td>
              <td>
                <NavLink to={`form_update/${item._id}`} className='btn btn-primary'>Edit</NavLink>
              {/* <button className='btn btn-primary' onClick={() => showUpdateForm(item._id)}>Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
