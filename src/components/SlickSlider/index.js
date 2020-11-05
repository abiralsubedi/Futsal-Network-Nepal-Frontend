import React from "react";
import PropTypes from "prop-types";

import Slider from "react-slick";

import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import useStyles from "./style";
import "./style.css";

const SlickSlider = ({ children }) => {
  const classes = useStyles();

  const ArrowButton = props => {
    // eslint-disable-next-line react/prop-types
    const { className, onClick, arrowType } = props;
    return (
      <div
        className={`${className} ${classes.arrowButton}`}
        onClick={onClick}
        role="presentation"
      >
        {arrowType === "prev" ? (
          <KeyboardArrowLeftRoundedIcon fontSize="large" />
        ) : (
          <KeyboardArrowRightRoundedIcon fontSize="large" />
        )}
      </div>
    );
  };

  const sliderSettings = {
    speed: 300,
    infinite: false,
    slidesToShow: 4.25,
    slidesToScroll: 2,
    prevArrow: <ArrowButton arrowType="prev" />,
    nextArrow: <ArrowButton arrowType="next" />,
    draggable: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 1,
          infinite: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1,
          infinite: false
        }
      }
    ]
  };

  return (
    <div className="normal-slider">
      <Slider {...sliderSettings}>{children}</Slider>
    </div>
  );
};

SlickSlider.propTypes = {
  children: PropTypes.node
};

export default SlickSlider;
