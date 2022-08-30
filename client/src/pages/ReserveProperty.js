import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import UpdateUserForm from "../components/forms/UpdateUserForm";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_ME, QUERY_SINGLE_PROPERTY } from "../utils/queries";

function ReserveProperty() {
  const { propertyId } = useParams();
  const { loading: loadUser, data: userData } = useQuery(QUERY_ME);
  const { loading: loadProperty, data: propertyData } = useQuery(QUERY_SINGLE_PROPERTY, {
    variables: { id: propertyId },
  });

  const user = userData?.me || "";
  const property = propertyData?.property || "";

  return <main>{loadUser && loadProperty ? <div>loading</div> : 
    <section className="container">
        <div>
            <h2>Reserving Property</h2>
            <h3>{property.address}</h3>
        </div>
        <UpdateUserForm user={user} reserving={true} property={property}/>
    </section>
  }</main>;
}

export default ReserveProperty;
