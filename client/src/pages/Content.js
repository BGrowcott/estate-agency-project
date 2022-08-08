import React, { useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import { useQuery } from "@apollo/client";
import { QUERY_PROPERTIES } from "../utils/queries";
import { PROPERTY_VIEW } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { Link } from "react-router-dom";

const Content = () => {
  const [state, dispatch] = useStoreContext();
  const { loading, data: propertyData } = useQuery(QUERY_PROPERTIES);

  useEffect(() => {
    if (propertyData && state.propertyView.length < 1) {
      dispatch({ type: PROPERTY_VIEW, propertyView: propertyData.properties });
    }
  }, [propertyData?.properties]);

  return (
    <main>
      {loading ? (
        <div>loading</div>
      ) : (
        state.propertyView.map((property) => (
          <Link className="text-black text-decoration-none" to={`../property/${property._id}`} key={property._id}>
            <ProductCard content={property}/>
          </Link>
        ))
      )}
    </main>
  );
};

export default Content;
