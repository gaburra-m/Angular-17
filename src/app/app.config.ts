import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true, //no hace efecto al inciar
        // onViewTransitionCreated(transitionInfo) {
        //   console.log({ transitionInfo });
        // },
      })
    ),
  ],
};
