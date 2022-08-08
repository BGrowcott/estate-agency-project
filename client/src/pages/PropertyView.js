import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PROPERTY } from "../utils/queries";

function PropertyView() {
  const { id } = useParams();

  const { loading, data: propertyData } = useQuery(QUERY_SINGLE_PROPERTY, {
    variables: { id: id },
  });

  const property = propertyData?.property || ""

  return <main>{loading ? <div>loading</div> :

    <section>
        <h1>{property.title}</h1>
        <div>{property.description}</div>
    </section>
    
    }</main>;
}

export default PropertyView;
