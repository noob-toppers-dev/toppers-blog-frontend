import React, { useState } from 'react';
import './index.css'
import { Button } from '@mui/material';
const ImageSlider = () => {
    const images = [
        "https://dante.swiftideas.com/wp-content/uploads/2013/03/parallax_bridge1.jpg",
        'https://dante.swiftideas.com/wp-content/uploads/2013/03/parallax_bridge1.jpg',
        "https://www.jqueryscript.net/demo/Responsive-Full-Width-jQuery-Image-Slider-Plugin-skdslider/slides/1.jpg"
    ]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="image-slider">
            <div className="slider-image">
                <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
            </div>
            <div className="slider-controls">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
};

export default ImageSlider;
