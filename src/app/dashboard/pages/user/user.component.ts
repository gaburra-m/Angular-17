import { User } from '@interfaces/req-response';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />

    @if (user()) {
    <section class="flex p-4 gap-4 rounded bg-slate-50 shadow-sm">
      <img
        [srcset]="user()!.avatar"
        [alt]="user()!.first_name"
        class="rounded"
      />
      <div>
        <h3 class="text-xl font-semibold mb-3">
          {{ user()?.first_name }} {{ user()?.last_name }}
        </h3>
        <p class="flex flex-col text-slate-700 text-base">
          <span class="text-slate-500 text-sm">email:</span> {{ user()?.email }}
        </p>
      </div>
    </section>
    } @else {
    <p>Cargando información...</p>
    }
  `,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }
    return `Información del usuario`;
  });

  // constructor() {
  //   this.route.params.subscribe(params => {
  //     console.log({params});
  //   })
  // }
}
