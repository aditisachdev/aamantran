import React, { useEffect, useState } from "react";
import { Button, Carousel } from "element-react";
import CarouselImage1 from "../../assets/carousel/1.png";
import CarouselImage2 from "../../assets/carousel/2.png";
import CarouselImage3 from "../../assets/carousel/3.png";
import styles from "./LandingPage.module.scss";

const LandingPage = ({ history }) => {
  const [windowHeight, setWindowHeight] = useState("0px");
  useEffect(() => {
    // Update the document title using the browser API
    setWindowHeight(`${window.innerHeight.toString() - 69}px`);
  });

  return (
    <div className={styles.landingPageDiv}>
      {/* <Auth /> */}
      <nav class="flex justify-end bb b--white-10">
        <div class="flex-grow pa3 flex flex-end">
          <Button plain={true} onClick={() => history.push("/signup")}>
            Sign Up
          </Button>
        </div>
      </nav>
      <div>
        <Carousel interval="4000" height={windowHeight}>
          {[CarouselImage1, CarouselImage2, CarouselImage3].map(
            (item, index) => {
              return (
                <Carousel.Item key={index}>
                  <div className={styles[`carouselImage${index + 1}`]}></div>
                </Carousel.Item>
              );
            }
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default LandingPage;
