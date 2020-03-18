import React, { useEffect, useState } from "react";

import { GameField } from "../gameField/GameField";

import IBird from "../../models/bird";
import IPipe from "../../models/pipe";

export const PipeManager = () => {
  const WIDTH = 800;
  const HEIGHT = 500;

  const PIPE_WIDTH = 60;
  const MIN_PIPE_HEIGHT = 40;

  const TARGET_FPS = 120;

  const [pipes, setPipes] = useState<IPipe[]>([]);
  const [bird, setBird] = useState<IBird | null>(null);
  
  let space = 120;
  let frameCount = 0;

  let gravity = 0;
  let velocity = .1;

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    setInterval(run, 1000 / TARGET_FPS);
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      jump();
    }
  };

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

  const createBird = () => {
    const bird: IBird = {
      x: 50,
      y: 150
    };

    setBird(bird);
  };

  const updatePipes = () => {
    setPipes(pipes =>
      pipes.map(pipe => {
        pipe.x -= 1;
        if (pipe.x < 0 - PIPE_WIDTH) {
          pipe.isDead = true;
        }
        return pipe;
      })
    );
  };

  const updateBird = () => {
    setBird(bird => {
      gravity += velocity;
      gravity = Math.min(5, gravity);
      bird!.y += gravity;
      return bird;
    });
  };

  const jump = () => {
    gravity = -4;
  };

  const run = () => {
    if (frameCount % (TARGET_FPS * 3) === 0 || frameCount === 0) {
      if (frameCount === 0) {
        createBird();
      }
      createPipe();
    }
    frameCount++;

    updatePipes();
    updateBird();
  };

  return (
    <div>
      {pipes.length > 0 && bird && <GameField pipes={pipes} bird={bird} />}
    </div>
  );
};
