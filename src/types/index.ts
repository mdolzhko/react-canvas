export type TMode = "stroke" | "line";

export type Viewport = {
  width: number;
  height: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Line = {
  start: Coordinate;
  end: Coordinate;
};
