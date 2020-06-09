import React, { useState, useEffect } from "react";

interface Props {
  wait: number;
}

/**
 * Hides the children until the specified wait (ms) duration is over.
 */
const Delayed: React.FC<Props> = (props) => {
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, props.wait);
  }, []);

  return hidden ? null : <>{props.children}</>;
};

export default Delayed;
