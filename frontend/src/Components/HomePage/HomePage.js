import React, { useEffect, useState } from "react";
import "./HomePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from "../../Images/1.png";
import img2 from "../../Images/2.png";
import img3 from "../../Images/3.png";
import img4 from "../../Images/4.png";
import img5 from "../../Images/5.png";

const images = [img1, img2, img3, img4, img5];
const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="Home">
        <div className="Home1">
          <img
            src={images[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="slide-image"
          />
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
