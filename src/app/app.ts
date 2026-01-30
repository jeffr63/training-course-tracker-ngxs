import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './shared/services/auth/auth-service';
import { Menu } from './menu/menu';
import { SourceStore } from '@services/source/source-store';
import { PathsStore } from '@services/path/path-store';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet],
  providers: [PathsStore, SourceStore],
  template: `
    <app-menu />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #pathsStore = inject(PathsStore);
  readonly #sourceStore = inject(SourceStore);

  ngOnInit() {
    this.#authService.checkLogin();
    this.#pathsStore.loadPaths();
    this.#sourceStore.loadSources();
  }
}
