import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shape } from 'src/Interface/IShape';
@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})

export class ShapeComponent {
  shapeId: number;
  selectedShape: Shape | null = null;
  colors: string[] = ['black', 'red', 'blue', 'green'];
  basicColor = 'black';

  shapes: Shape[] = [
    {
    shapeId: 1,
    lines: [
      { from: { x: 0, y: 0 }, to: { x: 150, y: 0 } },
      { from: { x: 150, y: 0 }, to: { x: 150, y: 150 } },
      { from: { x: 150, y: 150 }, to: { x: 0, y: 150 } },
      { from: { x: 0, y: 150 }, to: { x: 0, y: 0 } }
    ],
    selected: false,
    color: 'black'
    },
    {
    shapeId: 2,
    lines: [
      { from: { x: 200, y: 0 }, to: { x: 350, y: 0 } },
      { from: { x: 350, y: 0 }, to: { x: 350, y: 150 } },
      { from: { x: 350, y: 150 }, to: { x: 200, y: 150 } },
      { from: { x: 200, y: 150 }, to: { x: 200, y: 0 } }
    ],
    selected: false,
    color: 'black'
  }
  ];

  constructor() {
    this.shapeId = this.generateShapeId();
  }
  changeShapeColor(newColor: string): void {
    const selectedShape = this.shapes.find(shape => shape.selected);
    if (selectedShape) {
      selectedShape.color = newColor;
    }
  }

  onShapeClick(clickedShape: Shape): void {
    this.shapes.forEach(shape => {
      if (shape === clickedShape) {
        shape.selected = true;
      } else {
        shape.selected = false;
      }
    });
  }
  private generateShapeId(): number {
    return Math.floor(Math.random() * 1000);
  }
}

