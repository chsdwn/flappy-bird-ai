import React, { useRef, useEffect } from "react";

import IPipe from "../../models/pipe";

import classes from "./GameField.module.scss";

interface IProps {
  pipes: IPipe[];
}

export const GameField: React.FC<IProps> = ({ pipes }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;

  useEffect(() => {
    if (canvas && canvas.current) {
      context = canvas.current.getContext("2d");
      context?.clearRect(0, 0, 800, 500);

      if (context) {
        context.fillStyle = "#000";

        pipes
          .filter(pipe => !pipe.isDead)
          .forEach(pipe => {
            context?.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
          });
      }
    }
  });

  return (
    <canvas
      ref={canvas}
      width={800}
      height={500}
      className={classes.GameField}
    ></canvas>
  );
};
