import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // ✅ <-- This is essential for HttpClient to work
  ]
});


  //If you are using this new standalone bootstrap method, you might not need an app.module.ts at all.
  // Your dependencies like FormsModule, HttpClientModule, and others should be imported inside your appConfig or directly in the standalone component.

