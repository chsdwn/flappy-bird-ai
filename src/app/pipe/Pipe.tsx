import React, { useCallback, useEffect } from "react";

import IPipe from "../../models/pipe";

interface IProps {
  topPipeHeight: number;
  bottomPipeHeight: number;
  PIPE_WIDTH: number;
  SPACE: number;
  WIDTH: number;
  setPipes: (pipes: React.SetStateAction<IPipe[]>) => void;
}

export const Pipe: React.FC<IProps> = ({
  topPipeHeight,
  bottomPipeHeight,
  PIPE_WIDTH,
  SPACE,
  WIDTH,
  setPipes
}) => {
  const draw = useCallback(() => {
    const pipeTop: IPipe = {
      x: WIDTH,
      y: 0,
      width: PIPE_WIDTH,
      height: topPipeHeight,
      isDead: false
    };
    const pipeBottom: IPipe = {
      x: WIDTH,
      y: topPipeHeight + SPACE,
      width: PIPE_WIDTH,
      height: bottomPipeHeight,
      isDead: false
    };

    setPipes(pipes => [...pipes, pipeTop, pipeBottom]);
  }, [topPipeHeight, bottomPipeHeight, setPipes]);

  useEffect(() => {
    draw();
  }, [draw]);

  return null;
};
