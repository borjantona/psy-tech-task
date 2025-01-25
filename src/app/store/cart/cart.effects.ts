import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProduct,
  cleanCart,
  createCart,
  initCart,
  loadCart,
  removeAllProducts,
  removeProduct,
} from './cart.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectCart } from './cart.selectors';
import { ApiFetcherService } from 'src/app/services/apiFetcher';
import { CartProduct } from 'src/app/interfaces/cart';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private apiFetcherService: ApiFetcherService
  ) {}
  saveProductCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProduct),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          if (cart.id) {
            const products = cart.products;
            let product: CartProduct | undefined = products.find(
              (product) => product.productId === action.product.id
            );
            if (!product) {
              product = { productId: action.product.id, quantity: 1 };
            }
            return this.apiFetcherService.updateProductInCart(cart.id, {
              userId: cart.userId,
              products: [product],
              date: cart.date,
            });
          } else {
            return of(null);
          }
        })
      ),
    { dispatch: false }
  );
  removeProductCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeProduct),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          if (cart.id) {
            const products = cart.products;
            let product: CartProduct | undefined = products.find(
              (product) => product.productId === action.productId
            );
            if (!product) {
              product = { productId: action.productId, quantity: 0 };
            }
            return this.apiFetcherService.updateProductInCart(cart.id, {
              userId: cart.userId,
              products: [product],
              date: cart.date,
            });
          } else {
            return of(null);
          }
        })
      ),
    { dispatch: false }
  );
  removeAllProductCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeAllProducts),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          if (cart.id) {
            let product = { productId: action.productId, quantity: 0 };
            return this.apiFetcherService.updateProductInCart(cart.id, {
              userId: cart.userId,
              products: [product],
              date: cart.date,
            });
          } else {
            return of(null);
          }
        })
      ),
    { dispatch: false }
  );
  cleanCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cleanCart),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          if (cart.id) {
            return this.apiFetcherService.deleteCart(cart.id);
          }
          return of(null);
        })
      ),
    { dispatch: false }
  );
  initCart = createEffect(() =>
    this.actions$.pipe(
      ofType(initCart),
      switchMap((action) => {
        return this.apiFetcherService.getUserCarts(action.userId);
      }),
      switchMap((cart) => {
        if (cart.length === 0) {
          const userId = +localStorage.getItem('userId')!;
          return of(createCart({ userId }));
        }
        return of(loadCart({ cart: cart[0] }));
      })
    )
  );
  createCart = createEffect(() =>
    this.actions$.pipe(
      ofType(createCart),
      switchMap((action) => {
        return this.apiFetcherService.createCart({
          userId: action.userId,
          products: [],
          date: Date.now().toString(),
        });
      }),
      switchMap((cart) => {
        return of(loadCart({ cart: cart }));
      })
    )
  );
}
