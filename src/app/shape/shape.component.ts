import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shape } from 'src/Interface/IShape';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})

export class ShapeComponent {
  selectedShape: Shape | null = null;
  colors: string[] = ['orange', 'red', 'blue', 'green', 'yellow', 'pink'];
  basicColor = 'black';
  hoveredShape: Shape | null = null;

  shapes: Shape[] = [
    {
    shapeId: 1,
    lines: [
      { from: { x: 0, y: 0 }, to: { x: 150, y: 0 } },
      { from: { x: 150, y: 0 }, to: { x: 150, y: 150 } },
      { from: { x: 150, y: 150 }, to: { x: 0, y: 150 } },
      { from: { x: 0, y: 150 }, to: { x: 0, y: 0 } }
    ], selected: false, color: 'black'
    },
    {
    shapeId: 2,
    lines: [
      { from: { x: 200, y: 0 }, to: { x: 350, y: 0 } },
      { from: { x: 350, y: 0 }, to: { x: 350, y: 150 } },
      { from: { x: 350, y: 150 }, to: { x: 200, y: 150 } },
      { from: { x: 200, y: 150 }, to: { x: 200, y: 0 } }
    ], selected: false, color: 'black'
  }
];

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

  onCheckboxChange(shape: Shape): void {
    this.shapes.forEach(s => {
      if (s === shape) {
        s.selected = true;
      } else {
        s.selected = false;
      }
    });
  }

  saveShapes(): void {
    const data = JSON.stringify(this.shapes);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'shapes.json');
  }

  onFileSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result as string;
      if (contents) {
        try {
          const data = JSON.parse(contents);
          this.shapes = data;
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      }
    };
    reader.readAsText(file);
  }
}

shapeWidth(shape: Shape): number {
  const xCoordinates = shape.lines.map(line => [line.from.x, line.to.x]).flat();
  const minX = Math.min(...xCoordinates);
  const maxX = Math.max(...xCoordinates);
  return maxX - minX;
}

shapeHeight(shape: Shape): number {
  const yCoordinates = shape.lines.map(line => [line.from.y, line.to.y]).flat();
  const minY = Math.min(...yCoordinates);
  const maxY = Math.max(...yCoordinates);
  return maxY - minY;
}

shapeX(shape: Shape): number {
  const xCoordinates = shape.lines.map(line => [line.from.x, line.to.x]).flat();
  const minX = Math.min(...xCoordinates);
  return minX;
}

shapeY(shape: Shape): number {
  const yCoordinates = shape.lines.map(line => [line.from.y, line.to.y]).flat();
  const minY = Math.min(...yCoordinates);
  return minY;
}

onShapeHover(shape: Shape): void {
  this.hoveredShape = shape;
}

onShapeLeave(): void {
  this.hoveredShape = null;
}

}
