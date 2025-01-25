import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	getCategories,
  getProducts,
  loadCategories,
  loadProducts
} from './products.actions';
import { of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiFetcherService } from 'src/app/services/apiFetcher';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private apiFetcherService: ApiFetcherService
  ) {}
  getProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(() => {
        return this.apiFetcherService.getAllProducts();
      }),
      switchMap((products) => {
        return of(loadProducts({ products }));
      })
    )
  );
  getCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      switchMap(() => {
        return this.apiFetcherService.getCategories();
      }),
      switchMap((categories) => {
        return of(loadCategories({ categories }));
      })
    )
  );
}
