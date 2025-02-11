import React, { useState } from "react";
import styles from "./styles.module.scss";

const ImageSlider = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className={styles.sliderContainer}>
      {/* Full-width large image */}
      <div className={styles.imgDisplay}>
        <img
          className={styles.displayImage}
          src={images[selectedImageIndex]}
          alt={`Selected plant ${selectedImageIndex + 1}`}
        />
      </div>

      {/* Image thumbnails */}
      <div className={styles.imgSelect}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.imgItem} ${
              selectedImageIndex === index ? styles.active : ""
            }`}
          >
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                setSelectedImageIndex(index);
              }}
            >
              <img
                className={styles.imgSlide}
                src={image}
                alt={`plant ${index + 1}`}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
