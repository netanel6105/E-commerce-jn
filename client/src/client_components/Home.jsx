import React from "react";
import ImgStrip from "./home/ImgStrip";
import CategoryList from "./home/CategoryList";
import CategoryStrip from "./home/CategoryStrip";

const Home = () => {
  return (
    <React.Fragment>

      <ImgStrip/>
      
      <CategoryStrip/>

      <main>
        <CategoryList/>
      </main>
    </React.Fragment>
  );
};

export default Home;
