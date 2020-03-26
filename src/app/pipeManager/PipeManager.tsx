import React, { useEffect, useState } from "react";

import { GameField } from "../gameField/GameField";
import { Pipe } from "../pipe/Pipe";

import IBird from "../../models/bird";
import IPipe from "../../models/pipe";
import { Bird } from "../bird/Bird";

export const PipeManager = () => {
  const WIDTH = 800;
  const HEIGHT = 500;

  const PIPE_WIDTH = 60;
  const MIN_PIPE_HEIGHT = 40;

  const TARGET_FPS = 120;

  const [pipes, setPipes] = useState<IPipe[]>([]);
  const [bird, setBird] = useState<IBird | null>(null);

  const [topPipeHeight, setTopPipeHeight] = useState(0);
  const [bottomPipeHeight, setBottomPipeHeight] = useState(0);

  let space = 120;
  let frameCount = 0;

  let gravity = 0;
  let velocity = 0.1;

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    setInterval(run, 1000 / TARGET_FPS);
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      jumpBird();
    }
  };

  const createPipe = () => {
    setTopPipeHeight(
      MIN_PIPE_HEIGHT + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2)
    );
    setBottomPipeHeight(HEIGHT - topPipeHeight - space);
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

  const jumpBird = () => {
    gravity = -4;
  };

  const run = () => {
    if (frameCount % (TARGET_FPS * 3) === 0 || frameCount === 0) {
      createPipe();
    }
    frameCount++;

    updatePipes();
    updateBird();
  };

  return (
    <div>
      <Bird setBird={setBird} />
      <Pipe
        topPipeHeight={topPipeHeight}
        bottomPipeHeight={bottomPipeHeight}
        PIPE_WIDTH={PIPE_WIDTH}
        SPACE={space}
        WIDTH={WIDTH}
        setPipes={setPipes}
      />
      {pipes.length > 0 && bird && <GameField pipes={pipes} bird={bird} />}
    </div>
  );
};
