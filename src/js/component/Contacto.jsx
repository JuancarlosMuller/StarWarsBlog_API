import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../store/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacto = () => {
  const { userData, setUserData, getagenda } = useContext(UserContext);

  useEffect(() => {
    getagenda();
  }, []);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000); // Genera un ID aleatorio entre 0 y 999
  };


  const handleDelete = (idToDelete) => {
    const deleteUrl =
      "https://playground.4geeks.com/apis/fake/contact/" + idToDelete;

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(deleteUrl, deleteOptions)
      .then((response) => {
        if (response.ok) {
          console.log("DELETE: Contacto eliminado exitosamente");
          // Actualizar el estado del contexto eliminando el contacto
          const updatedUserData = userData.filter(
            (contact) => contact.id !== idToDelete
          );
          setUserData(updatedUserData);
        } else {
          console.log(`Error en la solicitud DELETE ${response.status}`);
          throw new Error("Error en la solicitud DELETE");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud DELETE:", error);
      });
  };


  return (
    <div className="container mt-4">
      <h2>Contactos</h2>
      <div className='mt-2 mb-2 d-md-flex justify-content-md-end'>
        <Link to="/NewContact" className="btn btn-success">Add new contact</Link>
      </div>
      {userData.map((contact) => (
        <div key={contact.id} className="card container p-2 mt-0 mb-0">
          <div className="row">
            <div className="col-md-2 d-flex align-items-center justify-content-center">
              <img
                src={`https://picsum.photos/id/${generateRandomId()}/100/100`} // Genera un nuevo ID aleatorio para cada contacto
                alt={`${contact.full_name} Avatar`}
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{contact.full_name}</h5>
                <p className="card-text">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />Email: {contact.email}</p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faLocationDot} className="me-2 text-muted" />Dirección: {contact.address}</p>
                <p className="card-text">
                  <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />Teléfono: {contact.phone}</p>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-start">
              <Link to={`/EditContact/${contact.id}`} className="btn">
                <FontAwesomeIcon icon={faEdit} />
              </Link>

              <button className="btn">
                <FontAwesomeIcon onClick={() => handleDelete(contact.id)} icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default Contacto;
