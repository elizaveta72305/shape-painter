import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
    shapeId = 'myShape';
    selectedColor = '';

    changeColor(color: string) {
      this.selectedColor = color;
    }
}
