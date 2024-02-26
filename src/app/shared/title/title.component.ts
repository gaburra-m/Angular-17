import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: ` <h1 class="mb-5 text-3xl font-semibold">{{ title }}</h1> `,
  styles: ``,
})
export class TitleComponent {
  // public title = input.required<string>();
  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
