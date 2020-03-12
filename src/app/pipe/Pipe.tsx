import React, { useRef, useEffect } from "react";

import IPipe from "../../models/pipe";

import classes from "./Pipe.module.scss";

interface IProps {
  pipes: IPipe[];
}

export const Pipe: React.FC<IProps> = ({ pipes }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null;

  useEffect(() => {
    if (canvas && canvas.current) {
      context = canvas.current.getContext("2d");

      if (context) {
        context.fillStyle = "#000";

        pipes.forEach(pipe => {
          context?.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        });

        console.log(pipes);
      }
    }
  });

  return (
    <canvas
      ref={canvas}
      width={800}
      height={500}
      className={classes.Pipe}
    ></canvas>
  );
};
