import React from "react";
import ProductCard from "../components/cards/ProductCard";
import placeholder from "../images/placeholder.jpg";
import { useQuery } from "@apollo/client";
import { QUERY_PROPERTIES } from "../utils/queries";

const Content = () => {

  const { loading, data: propertyData } = useQuery(QUERY_PROPERTIES);

  return (
    <main>
      {loading ? <div>loading</div> : propertyData?.properties.map((property, index) => (
          <ProductCard content={property} key={property._id} />
      ))}
    </main>
  );
};

export default Content;
