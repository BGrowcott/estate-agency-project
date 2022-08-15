import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_SINGLE_PROPERTY } from "../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ImageCarousel from "../components/carousel/ImageCarousel";
import placeholder from "../images/placeholder.jpg";

function PropertyView() {
  const { id } = useParams();
  const imageArray = [placeholder, placeholder, placeholder];
  const { loading, data: propertyData } = useQuery(QUERY_SINGLE_PROPERTY, {
    variables: { id: id },
  });

  const property = propertyData?.property || "";

  return (
    <main>
      {loading ? (
        <div>loading</div>
      ) : (
        <section className="container-lg">
          <Link className="text-decoration-none" to={"/content"}>
            <FontAwesomeIcon icon={solid("arrow-left")} /> Back to all
            properties
          </Link>
          <div className="container-lg">
            <div className="row">
              <div className="col-xs-12 col-md-7">
                <ImageCarousel imageArray={imageArray} />
              </div>
              <div className="col-xs-12 col-md-5">
                <h2 className="h5">{property.title}</h2>
                <p>{property.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default PropertyView;
