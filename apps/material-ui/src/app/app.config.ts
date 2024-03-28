import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/data/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 })),
  ],
};
