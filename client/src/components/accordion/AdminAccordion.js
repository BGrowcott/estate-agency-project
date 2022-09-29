import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import NewPropertyForm from "../forms/NewPropertyForm";
import { useStoreContext } from "../../utils/GlobalState";
import {
  SELECTED_UPDATE_PROPERTY,
  SHOW_MODAL_UPDATE,
  SHOW_MODAL_DELETE,
  PROPERTY_VIEW,
} from "../../utils/actions";
import { Link } from "react-router-dom";
import ModalDeleteConfirm from "../modals/ModalDeleteConfirm";
import { useMutation } from "@apollo/client";
import { REMOVE_PROPERTY } from "../../utils/mutations";

function AdminAccordion({ properties, users }) {
  const [removeProperty, { error }] = useMutation(REMOVE_PROPERTY);
  const [state, dispatch] = useStoreContext();
  const [selectedProperty, setProperty] = useState();
  const [filteredUsers, setFilter] = useState([]);
  const [filteredProperties, setFilterProperties] = useState([]);

  useEffect(() => {
    setFilter(users);
  }, [users]);
  useEffect(() => {
    setFilterProperties(properties);
  }, [properties]);

  function toggleModalUpdate(e) {
    const selectedProperty = state.propertyView.find(
      (property) => property._id === e.target.dataset.id
    );
    dispatch({ type: SELECTED_UPDATE_PROPERTY, property: selectedProperty });
    dispatch({ type: SHOW_MODAL_UPDATE });
  }
  function toggleModalDelete(e) {
    setProperty(e.target.dataset.id);
    dispatch({ type: SHOW_MODAL_DELETE });
  }

  async function removePropertyHandler() {
    try {
      await removeProperty({
        variables: { propertyId: selectedProperty },
      });
      const remainingProperties = state.propertyView.filter(
        (property) => property._id !== selectedProperty
      );
      dispatch({ type: PROPERTY_VIEW, propertyView: remainingProperties });
      dispatch({ type: SHOW_MODAL_DELETE });
    } catch (error) {
      console.log(error);
    }
  }

  function filterUsers(e) {
    const input = e.target.value;
    const allUsers = users;
    setFilter(
      allUsers.filter((user) => {
        return (
          user.username
            .toLocaleLowerCase()
            .includes(input.toLocaleLowerCase()) ||
          user.email.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        );
      })
    );
  }

  function filterProperties(e) {
    const input = e.target.value;
    const allProperties = properties;
    setFilterProperties(
      allProperties.filter((property) => {
        return (
          property.title
            .toLocaleLowerCase()
            .includes(input.toLocaleLowerCase()) ||
          property.address.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        );
      })
    );
  }

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Property</Accordion.Header>
          <Accordion.Body>
            <NewPropertyForm />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit A Property</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={(e)=>e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="propertyFilter">
                  Search by title/address:
                </label>
                <input
                  className="form-control"
                  id="propertyFilter"
                  onChange={filterProperties}
                />
              </div>
            </form>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Address</th>
                  <th>£/week</th>
                  <th>Available</th>
                  <th>Edit</th>
                  <th>View</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property._id}>
                    <td>{property.title}</td>
                    <td>{property.address}</td>
                    <td>{property.price}</td>
                    <td>{property.isAvailable ? "Yes" : "No"}</td>
                    <td>
                      <a
                        data-id={property._id}
                        onClick={toggleModalUpdate}
                        href="#"
                      >
                        Edit
                      </a>
                    </td>
                    <td>
                      <Link target="_blank" to={`/property/${property._id}`}>
                        View
                      </Link>
                    </td>
                    <td>
                      <a
                        data-id={property._id}
                        onClick={toggleModalDelete}
                        href="#"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Find a User</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={(e)=>e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="userFilter">
                  Search by name/email:
                </label>
                <input
                  className="form-control"
                  id="userFilter"
                  onChange={filterUsers}
                />
              </div>
            </form>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>WeChat</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.title} {user.username}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.weChat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ModalDeleteConfirm callback={removePropertyHandler} />
    </>
  );
}

export default AdminAccordion;
