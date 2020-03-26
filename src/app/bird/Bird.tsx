import React, { useCallback, useEffect } from "react";
import IBird from "../../models/bird";

interface IProps {
  setBird: (value: React.SetStateAction<IBird | null>) => void;
}

export const Bird: React.FC<IProps> = ({ setBird }) => {
  const create = useCallback(() => {
    const bird: IBird = {
      x: 50,
      y: 150
    };

    setBird(bird);
  }, [setBird]);

  useEffect(() => {
    create();
  }, [create]);

  return <div></div>;
};
