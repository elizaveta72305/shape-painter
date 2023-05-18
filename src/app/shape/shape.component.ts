import { Component, EventEmitter, Output } from '@angular/core';

interface Line {
  from: { x: number, y: number };
  to: { x: number, y: number };
}

interface Shape {
  id: string;
  lines: Line[];
  selected: boolean;
}

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
  @Output() shapeSelected = new EventEmitter<string>();
  @Output() colorChanged = new EventEmitter<string>();

  shapes: Shape[] = [
    {
      id: 'shape1',
      lines: [
        { from: { x: 100, y: 100 }, to: { x: 200, y: 100 } },
        { from: { x: 200, y: 100 }, to: { x: 200, y: 200 } },
        { from: { x: 200, y: 200 }, to: { x: 100, y: 200 } },
        { from: { x: 100, y: 200 }, to: { x: 100, y: 100 } }
      ],
      selected: false
    },
    {
      id: 'shape2',
      lines: [
        { from: { x: 250, y: 100 }, to: { x: 350, y: 100 } },
        { from: { x: 350, y: 100 }, to: { x: 350, y: 200 } },
        { from: { x: 350, y: 200 }, to: { x: 250, y: 200 } },
        { from: { x: 250, y: 200 }, to: { x: 250, y: 100 } }
      ],
      selected: false
    }
  ];

  selectedColor = 'black';

  selectShape(shapeId: string) {
    this.shapes.forEach((shape) => {
      shape.selected = shape.id === shapeId;
    });
    this.shapeSelected.emit(shapeId);
  }

  changeColor(color: string) {
    this.selectedColor = color;
    this.colorChanged.emit(color);
  }
}
