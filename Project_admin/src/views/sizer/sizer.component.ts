import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  standalone: true,
  imports: [],
  templateUrl: './sizer.component.html',
  styleUrl: './sizer.component.css',
})
export class SizerComponent {
  constructor() {
    this.size = 10;
  }

  @Input() size: number;
  @Output() sizeChange = new EventEmitter<number>();

  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(+1);
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
