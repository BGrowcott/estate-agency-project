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

  function sortLowest(){
    state.propertyView.sort((a,b)=>{
      return a.price - b.price
    })
    dispatch({type: PROPERTY_VIEW, propertyView: state.propertyView})
  }

  function sortHighest(){
    state.propertyView.sort((a,b)=>{
      return b.price - a.price
    })
    dispatch({type: PROPERTY_VIEW, propertyView: state.propertyView})
  }

  return (
    <main className="pe-3 ps-3">
      {loading ? (
        <div>loading</div>
      ) : (
        <section>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 ms-2">{state.propertyView.length} properties available</p>
            <div className="d-flex justify-content-between align-items-center">
            <p className="m-0 me-2 ms-2">Sort by Price:</p>
            <button className="btn btn-light me-2 ms-2" onClick={sortHighest}>Highest</button>
            <button className="btn btn-light me-2 ms-2" onClick={sortLowest}>Lowest</button>
            </div>
          </div>
        <div>
          {state.propertyView.map((property) => (
            <Link
              className="text-black text-decoration-none"
              to={`../property/${property._id}`}
              key={property._id}
            >
              <ProductCard content={property} />
            </Link>
          ))}
        </div>
        </section>
      )}
    </main>
  );
};

export default Content;
