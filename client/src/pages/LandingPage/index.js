import React, { useEffect, useState } from "react";
import { Carousel } from "element-react";
import CarouselImage1 from "../../assets/carousel/1.png";
import CarouselImage2 from "../../assets/carousel/2.png";
import CarouselImage3 from "../../assets/carousel/3.png";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const [windowHeight, setWindowHeight] = useState("0px");
  useEffect(() => {
    setWindowHeight(`${window.innerHeight.toString() - 69}px`);
  });

  return (
    <div className={styles.landingPageDiv}>
      <Carousel interval="4000" height={windowHeight}>
        {[CarouselImage1, CarouselImage2, CarouselImage3].map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <div className={styles[`carouselImage${index + 1}`]}></div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default LandingPage;
