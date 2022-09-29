import React, { useEffect } from "react";
import AdminAccordion from "../components/accordion/AdminAccordion";
import { PROPERTY_VIEW } from "../utils/actions";
import Auth from "../utils/auth";
import { QUERY_PROPERTIES, QUERY_USERS } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from "@apollo/client";
import ModalUpdateProperty from "../components/modals/ModalUpdateProperty";

function Admin() {
  const [state, dispatch] = useStoreContext();
  const { loading, data: propertyData } = useQuery(QUERY_PROPERTIES);
  const { loading: loadingUsers, data: userData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (propertyData && state.propertyView.length < 1) {
      dispatch({ type: PROPERTY_VIEW, propertyView: propertyData.properties });
    }
  }, [propertyData?.properties]);

  const users = userData?.users || []


  return (
    <main>
      <section className="container">
        <h1>Admin Page</h1>
        <AdminAccordion properties={state.propertyView} users={users} />
      </section>
      <ModalUpdateProperty showUpdateModal={state}/>
    </main>
  );
}

export default Admin;
