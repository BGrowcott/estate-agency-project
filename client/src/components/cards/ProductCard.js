import React from "react";
import placeholder from "../../images/placeholder.jpg";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductCard({ content }) {
  return (
    <div className="container">
      <div className="m-2 mt-5 mb-5 row align-items-center p-2 rounded bg-light shadow-custom">
        <div className="col-xs-12 col-md-6">
          <div className="h-0">
            <h2 className="font-sm h6 card-title-top p-1 w-90 m-auto shadow-custom rounded text-center bg-light-fade">
              {content.title}
            </h2>
          </div>
          <div>
            <figure className="m-0">
              <img
                className="w-100 rounded"
                src={placeholder}
                // alt={content.imageDescription}
              />
              <div className="h-0">
                <figcaption className="caption-custom bg-light-fade m-auto text-center">
                  <ul className="list-group list-group-horizontal justify-content-around">
                    <li className="list-unstyled">{content.bedroom} <FontAwesomeIcon icon={solid("bed")} /></li>
                    <li className="list-unstyled">{content.bathroom} <FontAwesomeIcon icon={solid("bath")} /></li>
                  </ul>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <h2 className="h6">${content.price} per month</h2>
          <p>{content.address}</p>
          <p>{content.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
