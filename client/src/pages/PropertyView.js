import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { QUERY_SINGLE_PROPERTY } from "../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ImageCarousel from "../components/carousel/ImageCarousel";
import Auth from "../utils/auth";
import FileUpload from "../components/fileUpload/FileUpload";

function PropertyView() {
  const { id } = useParams();
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

          <div>
            <div className="row">
              <div className="col-xs-12 col-md-7">
                <ImageCarousel imageArray={property.imageUrl} />
                {Auth.loggedIn() && Auth.getProfile().data.role === "admin" ? (
                  <FileUpload />
                ) : null}
              </div>

              <div className="col-xs-12 col-md-5">
                <div>
                  <h2 className="h5">{property.title}</h2>
                  <p>{property.address}</p>
                  <p>£{property.price}/week</p>
                  <p>{property.description}</p>
                </div>

                <div className="mb-3">
                  <ul className="list-group list-group-horizontal">
                    <li className="list-unstyled me-3">
                      <div className="d-flex flex-column">
                        <span>Bedrooms </span>
                        <span>
                          <FontAwesomeIcon icon={solid("bed")} /> x
                          {property.bedroom}
                        </span>
                      </div>
                    </li>

                    <li className="list-unstyled">
                      <div className="d-flex flex-column">
                        <span>Bathrooms </span>
                        <span>
                          <FontAwesomeIcon icon={solid("bath")} /> x
                          {property.bathroom}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <a
                  className="btn btn-primary"
                  rel="noreferrer"
                  target="_blank"
                  href={property.vrUrl}
                >
                  View VR
                </a>
                <Link
                  className="btn btn-primary"
                  to={`/reserveproperty/${property._id}`}
                >
                  Reserve Property
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default PropertyView;
