import React from "react";
import Banner from "../compunents/Banner";
import ProductList from "../compunents/ProductList";
import OutstandingPrd from "../compunents/OutstandingPrd";
import Footer from "../compunents/Footer";

const HomePage = () => {
  return (
    <div className="bg-auto ">
      <Banner />
      <ProductList />
      <OutstandingPrd />
      <Footer />
    </div>
  );
};

export default HomePage;
