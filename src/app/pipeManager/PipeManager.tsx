import React, { useEffect, useState } from "react";
import IPipe from "../../models/pipe";
import { Pipe } from "../pipe/Pipe";

export const PipeManager = () => {
  const WIDTH = 800;
  const HEIGHT = 500;
  const PIPE_WIDTH = 50;
  const MIN_PIPE_HEIGHT = 40;

  const [pipes, setPipes] = useState<IPipe[]>([]);

  let space = 80;
  let frameCount = 0;

  useEffect(() => {
    setInterval(update, 1000 / 60);
  }, []);

  const draw = () => {
    const firtsPipeHeight =
      MIN_PIPE_HEIGHT + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2);
    const secondPipeHeight = HEIGHT - firtsPipeHeight - space;

    const pipeTop: IPipe = {
      x: WIDTH,
      y: 0,
      width: PIPE_WIDTH,
      height: firtsPipeHeight
    };
    const pipeBottom: IPipe = {
      x: WIDTH,
      y: firtsPipeHeight + space,
      width: PIPE_WIDTH,
      height: secondPipeHeight
    };

    setPipes(pipes => [...pipes, pipeTop, pipeBottom]);
  };

  const update = () => {
    setPipes(pipes =>
      pipes.map(pipe => {
        pipe.x -= 3 / 2;
        return pipe;
      })
    );

    if (frameCount % 180 === 0 || frameCount === 0) {
      draw();
    }
    frameCount++;
  };

  return <div>{pipes.length > 0 && <Pipe pipes={pipes} />}</div>;
};
