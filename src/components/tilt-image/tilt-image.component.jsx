import React, { useRef } from 'react';
import Tilt from 'react-tilt';

const TitlImage = ({ children }) => {
  const ref = useRef();

  return (
    <Tilt
      ref={ref}
      className="Tilt cursor-pointer"
      options={{ max: 25 }}
      style={{ height: 297 * 0.7, width: 210 * 0.7 }}
    >
      {children}
    </Tilt>
  );
};

export default TitlImage;
