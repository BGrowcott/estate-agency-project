import React from "react";
import placeholder from "../../images/placeholder.jpg";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCarousel from "../carousel/ImageCarousel";

function ProductCard({ content }) {
  const imageArray = [placeholder, placeholder, placeholder];

  return (
    <div>
      <div className="m-2 mt-3 mb-3 row p-2 rounded bg-light shadow-custom">
        <div className="col-xs-12 col-md-6">
          <div>
            <figure className="m-0">
              <ImageCarousel imageArray={content.imageUrl} />
            </figure>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 d-flex flex-column justify-content-between inset-box">
          <h2 className="font-sm h5 p-1 w-90 mb-2 text-center">
            {content.title}
          </h2>
          <h3 className="h6">£{content.price}/week</h3>
          <p>{content.address}</p>
          <p>{content.shortDescription}</p>
          <ul className="list-group list-group-horizontal justify-content-around">
            <li className="list-unstyled">
              {content.bedroom} <FontAwesomeIcon icon={solid("bed")} />
            </li>
            <li className="list-unstyled">
              {content.bathroom} <FontAwesomeIcon icon={solid("bath")} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
