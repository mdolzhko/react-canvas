import { useCallback, useEffect, useRef, useState } from "react";
import { Coordinate, Line, TMode, Viewport } from "../../types";
import { LINE_COLOR, LINE_SIZE } from "../../constants";

export const useCanvas = (mode: TMode, defaultSize: Viewport) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineList, setLineList] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  /**
   * Drawing Starts with mouse down and save first point;
   */
  const drawingStart = useCallback((ev: MouseEvent) => {
    const coordinates = getCoordinates(ev);

    if (coordinates) {
      setIsDrawing(true);
      setMousePosition(coordinates);
      drawPoint(coordinates);
    }
  }, []);

  /**
   * Event Listener for Start drawing when mouse down;
   */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", drawingStart);
    return () => {
      canvas.removeEventListener("mousedown", drawingStart);
    };
  }, [drawingStart]);


  /**
   * Drawing Starts with mouse down and save first point;
   */
  const drawingProcess = useCallback(
    (ev: MouseEvent) => {
      if (isDrawing) {
        const newMousePosition = getCoordinates(ev);

        if (mousePosition && newMousePosition) {
          if (mode === "stroke") {
            drawStroke(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
          }
          if (mode === "line") {
            getLine(mousePosition, newMousePosition);
          }
        }
      }
    },
    [isDrawing, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", drawingProcess);
    return () => {
      canvas.removeEventListener("mousemove", drawingProcess);
    };
  }, [drawingProcess]);

  /**
   * Stop Drawing with mouse up;
   */
  const drawingStop = useCallback(() => {
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", drawingStop);
    canvas.addEventListener("mouseleave", drawingStop);
    return () => {
      canvas.removeEventListener("mouseup", drawingStop);
      canvas.removeEventListener("mouseleave", drawingStop);
    };
  }, [drawingStop]);


  /**
   * Claer and redraw lines;
  */
  useEffect(() => {
    clearCanvas();
    lineList.map((item) => drawStroke(item.start, item.end));
  }, [lineList]);

  /**
   * Draw point when just mouse down; 
  */
  const drawPoint = (originalMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.fillStyle = LINE_COLOR;
      context.lineWidth = LINE_SIZE;
      context.beginPath();
      context.arc(
        originalMousePosition.x,
        originalMousePosition.y,
        2.5,
        0,
        2 * Math.PI,
        false
      );
      context.closePath();
      context.fill();
    }
  };

  /**
   * Draw stroke line when mouse move; 
  */
  const drawStroke = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.fillStyle = LINE_COLOR;
      context.lineWidth = LINE_SIZE;
      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    }
  };

  /**
   * Calculate a vector of line and save to state; 
  */
  const getLine = (
    mousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    const rectangleW = Math.abs(newMousePosition.x - mousePosition.x);
    const rectangleH = Math.abs(newMousePosition.y - mousePosition.y);
    const isWLessH = rectangleW < rectangleH;
    const endPoint = {
      x: isWLessH ? mousePosition.x : newMousePosition.x,
      y: isWLessH ? newMousePosition.y : mousePosition.y,
    };
    setLineList([{ start: mousePosition, end: endPoint }, ...lineList]);
  };

  /**
   * Get coordinates of moving mouse on canvas; 
  */
  const getCoordinates = (ev: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const canvasArea = canvas.getBoundingClientRect();
    const x =
      (ev.clientX - canvasArea.left) * (defaultSize.width / canvasArea.width);
    const y =
      (ev.clientY - canvasArea.top) * (defaultSize.height / canvasArea.height);

    return { x, y };
  };


  /**
   * Clear canvas; 
  */
  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const { width, height } = canvas;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, width, height);
    }
  };

  /**
   * Clear line list state; 
  */
  const clearList = () => setLineList([]);

  return { canvasRef, lineList, clearCanvas, clearList };
};
