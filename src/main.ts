import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgClass } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './app/store/cart/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './app/store/cart/cart.effects';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(NgClass),
    provideStore({
        cart: cartReducer
    }),
    provideEffects(CartEffects)
]
});
