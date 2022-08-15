import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";


function ImageCarousel({ imageArray }) {

  return (
    <Carousel interval={null} variant="dark">
      {imageArray.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={image} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
