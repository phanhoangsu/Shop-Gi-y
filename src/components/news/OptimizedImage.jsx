import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OptimizedImage = ({ src, alt, className }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    className={className}
    loading="lazy"
    placeholderSrc={`${src}?w=50`}
  />
);

export default OptimizedImage;
