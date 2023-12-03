import React, { useState } from 'react';
import Dummy from '../../assets/g1.jpg'
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 400px;
`;

const Sliders = styled.div`
  width: 100%;
  display: inline-flex;
  transition: transform 0.3s ease-in-out;
`;

const Slide = styled.div`
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &.active {
    opacity: 1;
    transform: scale(1);
  }

  img {
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .caption {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  left: 10px;

  &:hover {
    background-color: #555;
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  right: 10px;

  &:hover {
    background-color: #555;
  }
`;

const ImageSlider = ({ blogData }) => {
    console.log(blogData, "blogdata")
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % blogData.length);

    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? blogData.length - 1 : prevSlide - 1
        );
    };

    // const prevSlide = () => {
    //     setCurrentSlide((prev) => (prev === 0 ? blogData.length - 1 : prev - 1));
    // };

    // const nextSlide = () => {
    //     setCurrentSlide((prev) => (prev === blogData.length - 1 ? 0 : prev + 1));
    // };

    console.log(currentSlide, "currentSlide", blogData.length)


    return (
        <SliderContainer>
            {blogData?.map((blog, index) => (
                <React.Fragment key={blog?._id}>
                    <Sliders>
                        <Slide className={index === currentSlide ? 'active' : ''}>
                            <img src={blog?.picture || Dummy} alt={blog.title} />
                            <div className="caption">{blog?.title}</div>
                        </Slide>
                    </Sliders>
                </React.Fragment>
            ))}
            <PrevButton onClick={prevSlide}>Prev</PrevButton>
            <NextButton onClick={nextSlide}>Next</NextButton>
        </SliderContainer>
    );

};

export default ImageSlider;
