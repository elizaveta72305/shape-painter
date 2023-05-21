import {Line} from "./ILine";

export interface Shape {
  shapeId: number,
  lines: Line[],
  selected: boolean,
  color: string
}
