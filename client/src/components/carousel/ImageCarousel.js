import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ImageCarousel({ imageArray }) {
  return (
    <Carousel interval={null} variant="dark">
      {imageArray.map((image, index) => (
        <Carousel.Item key={index}>
          <div className="w-100" style={{backgroundImage: 'url(https://hizoom.oss-cn-beijing.aliyuncs.com/hizoomNewProject/propertyImages/' +
              image +')', height: '300px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}}></div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
