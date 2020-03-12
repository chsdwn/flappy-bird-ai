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
  let x = 20;

  let frameCount = 0;

  useEffect(() => {
    setInterval(draw, 1000 / 60);
  }, []);

  const draw = () => {
    const firtsPipeHeight =
      MIN_PIPE_HEIGHT + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2);
    const secondPipeHeight = HEIGHT - firtsPipeHeight - space;

    const pipe1: IPipe = {
      x: WIDTH,
      y: 0,
      width: PIPE_WIDTH,
      height: firtsPipeHeight
    };
    const pipe2: IPipe = {
      x: WIDTH,
      y: firtsPipeHeight + space,
      width: PIPE_WIDTH,
      height: secondPipeHeight
    };

    setPipes((pipes) => [...pipes, pipe1, pipe2]);
  }

  const update = () => {
    frameCount++;
    if (frameCount % 30) {
      draw();
    }
  }

  return <div>{pipes.length > 0 && <Pipe pipes={pipes} />}</div>;
};
