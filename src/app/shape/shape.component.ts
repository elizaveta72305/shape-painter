import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shape } from 'src/Interface/IShape';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})

export class ShapeComponent {
  //shapeId: number;
  selectedShape: Shape | null = null;
  colors: string[] = ['orange', 'red', 'blue', 'green', 'yellow', 'pink'];
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

  constructor(private http: HttpClient) {
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

//   loadShapes(event: Event): void {
//     const fileInput = event.target as HTMLInputElement;
//     const file = fileInput.files?.[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const fileData = reader.result as string;
//             this.http.get<Shape[]>('/assets/shapes.json').subscribe(
//       (data: Shape[]) => {
//         this.shapes = data;
//         try {
//           const loadedShapes = JSON.parse(fileData) as Shape[];
//           this.shapes = loadedShapes;
//         } catch (error) {
//           console.error('Error loading shapes:', error);
//         }
//       });
//       reader.readAsText(file);
//     }
//   }
// }

// loadShapes(): void {
//   this.http.get<Shape[]>('/assets/shapes.json').subscribe(
//     (data: Shape[]) => {
//       this.shapes = data;
//     },
//     (error: any) => {
//       console.error('Error loading shapes:', error);
//     }
//   );
// }

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


private generateShapeId(): number {
  return Math.floor(Math.random() * 1000);
}
}
