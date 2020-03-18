import React, { useRef, useEffect } from "react";

import IBird from "../../models/bird";
import IPipe from "../../models/pipe";

import classes from "./GameField.module.scss";

interface IProps {
  pipes: IPipe[];
  bird: IBird;
}

export const GameField: React.FC<IProps> = ({ pipes, bird }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;

  useEffect(() => {
    if (canvas && canvas.current) {
      context = canvas.current.getContext("2d");
      context?.clearRect(0, 0, 800, 500);

      if (context) {
        drawBird();
        drawPipes();
      }
    }
  });

  const drawPipes = () => {
    context!.fillStyle = "#000";

    pipes
      .filter(pipe => !pipe.isDead)
      .forEach(pipe => {
        context!.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
      });
  };

  const drawBird = () => {
    context!.fillStyle = "#fa0a0a";
    context!.beginPath();
    context!.arc(bird.x, bird.y, 10, 0, 2 * Math.PI);
    context!.fill();
  };

  return (
    <canvas
      ref={canvas}
      width={800}
      height={500}
      className={classes.GameField}
    ></canvas>
  );
};
