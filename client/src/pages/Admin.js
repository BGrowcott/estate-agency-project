import React, { useEffect } from "react";
import AdminAccordion from "../components/accordion/AdminAccordion";
import { PROPERTY_VIEW } from "../utils/actions";
import Auth from "../utils/auth";
import { QUERY_PROPERTIES } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from "@apollo/client";
import ModalUpdateProperty from "../components/modals/ModalUpdateProperty";

function Admin() {
  const [state, dispatch] = useStoreContext();
  const { loading, data: propertyData } = useQuery(QUERY_PROPERTIES);

  useEffect(() => {
    if (propertyData && state.propertyView.length < 1) {
      dispatch({ type: PROPERTY_VIEW, propertyView: propertyData.properties });
    }
  }, [propertyData?.properties]);

  return (
    <main>
      <section className="container">
        <h1>Admin Page</h1>
        <AdminAccordion properties={state.propertyView}/>
      </section>
      {/* set below to open on state variable */}
      <ModalUpdateProperty showUpdateModal={state}/>
    </main>
  );
}

export default Admin;
