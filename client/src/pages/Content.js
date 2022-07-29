import React from "react";
import ProductCard from "../components/cards/ProductCard";
import placeholder from "../images/placeholder.jpg";

const Content = () => {
  const products = [
    {
      title: "Title",
      image: placeholder,
      imageDescription: "Image Description",
      details: "Details",
      information: "Informations",
    },
    {
      title: "Title",
      image: placeholder,
      imageDescription: "Image Description",
      details: "Details",
      information: "Informations",
    },
  ];

  return (
    <main>
      {products.map((product, index) => (
          <ProductCard content={product} key={index} />
      ))}
    </main>
  );
};

export default Content;
