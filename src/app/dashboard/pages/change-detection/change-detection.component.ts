import { TitleComponent } from '@/app/shared/title/title.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />

    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      // this.frameworkAsProperty.name = 'React'; // con changeDetection: ChangeDetectionStrategy.default

      // se puede, pero no tan recomendada
      // this.frameworkAsSignal.update((value) => {
      //   value.name = 'React';
      //   return { ...value };
      // });

      this.frameworkAsSignal.update((value) => ({
        ...value,
        name: 'React',
      }));

      console.log('Hecho');
    }, 3000);
  }
}
