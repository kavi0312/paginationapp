import React, { useState,useRef } from "react";
import useIntersectionObserver from './hooks/use-intersection-observer';

const ImageContainer = props => {
  const ref = useRef();
  const [isVisible , setIsVisible] = useState(false);

  useIntersectionObserver({
      target:ref,
      onIntersect: ([{isIntersecting}],observerElement) => {
        if(isIntersecting){
        setIsVisible(true);
          observerElement.unobserve(ref.current);
        }
      }
  })

  const aspectRatio = (props.height/props.width) * 100;

  return (
      <div ref={ref}
      className="image-container"
      style={{paddingBottom: `${aspectRatio}%`}}>
          {isVisible && (
        <img className="image" src={props.src} alt={props.alt} />
       )}
      </div>
  )
}

export default ImageContainer;