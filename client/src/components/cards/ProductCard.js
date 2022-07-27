import React from "react";

function ProductCard({ content }) {
  return (
    <div className="container">
      <div className="m-2 mt-5 mb-5 row align-items-center p-2 rounded bg-light shadow-custom">
        <div className="col-xs-12 col-md-6">
          <div className="h-0">
            <h2 className="card-title-top p-1 w-50 m-auto shadow-custom rounded text-center bg-light-fade">
              {content.title}
            </h2>
          </div>
          <div>
            <figure className="m-0">
              <img
                className="w-100 rounded"
                src={content.image}
                alt={content.imageDescription}
              />
              <div className="h-0">
                <figcaption className="caption-custom bg-light-fade m-auto text-center">
                  {content.details}
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <h3>{content.information}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
