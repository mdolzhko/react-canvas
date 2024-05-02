import { SetStateAction, useState } from "react";
import { useCanvas } from "./useCanvas";
import { TMode } from "../../types";
import { Sizes } from "../../constants";

import Toggle from "../../components/toggle";
import Button from "../buttons/Button";
import Buttons from "../../components/buttons";
import LineList from "../list";

const Canvas = () => {
  const [mode, setMode] = useState<TMode>("stroke");
  const [size, setSize] = useState(Sizes.LG);

  const { canvasRef, lineList, clearCanvas, clearList } = useCanvas(
    mode,
    Sizes.DEFAULT
  );

  const handlerSize = (
    size: SetStateAction<{ width: number; height: number }>
  ) => {
    setSize(size);
  };

  const handlerToggle = () =>
    setMode((mode) => (mode === "stroke" ? "line" : "stroke"));

  return (
    <>
      <div className="flex justify-between mb-6">
        <Buttons handler={handlerSize} />
        <Button
          label="Refresh Canvas"
          handler={() => {
            clearCanvas();
            clearList();
          }}
        />
      </div>

      <Toggle handler={handlerToggle} />

      <canvas
        ref={canvasRef}
        height={Sizes.DEFAULT.height}
        width={Sizes.DEFAULT.width}
        className="border-2 border-red-800 rounded-md mx-auto max-w-[900px] text-center"
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      />

      {!!lineList.length && <LineList list={lineList} />}
    </>
  );
};

export default Canvas;
