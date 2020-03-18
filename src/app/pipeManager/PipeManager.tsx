import React, { useEffect, useState } from "react";

import { GameField } from "../gameField/GameField";

import IPipe from "../../models/pipe";

export const PipeManager = () => {
  const WIDTH = 800;
  const HEIGHT = 500;

  const PIPE_WIDTH = 80;
  const MIN_PIPE_HEIGHT = 40;

  const TARGET_FPS = 120;

  const [pipes, setPipes] = useState<IPipe[]>([]);

  let space = 80;
  let frameCount = 0;

  useEffect(() => {
    setInterval(run, 1000 / TARGET_FPS);
  }, []);

  const createPipe = () => {
    const firtsPipeHeight =
      MIN_PIPE_HEIGHT + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2);
    const secondPipeHeight = HEIGHT - firtsPipeHeight - space;

    const pipeTop: IPipe = {
      x: WIDTH,
      y: 0,
      width: PIPE_WIDTH,
      height: firtsPipeHeight,
      isDead: false
    };
    const pipeBottom: IPipe = {
      x: WIDTH,
      y: firtsPipeHeight + space,
      width: PIPE_WIDTH,
      height: secondPipeHeight,
      isDead: false
    };

    setPipes(pipes => [...pipes, pipeTop, pipeBottom]);
  };

  const update = (pipe: IPipe) => {
    pipe.x -= 1;

    if (pipe.x < 0 - PIPE_WIDTH) {
      pipe.isDead = true;
    }
  };

  const run = () => {
    setPipes(pipes =>
      pipes.map(pipe => {
        update(pipe);
        return pipe;
      })
    );

    if (frameCount % (TARGET_FPS * 3) === 0 || frameCount === 0) {
      createPipe();
    }
    frameCount++;
  };

  return <div>{pipes.length > 0 && <GameField pipes={pipes} />}</div>;
};
