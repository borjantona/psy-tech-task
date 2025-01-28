import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPage } from './cart.page';
import { Store } from '@ngrx/store';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { selectProductsStore } from 'src/app/store/products/products.selectors';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StyledButtonComponent } from 'src/app/components/elements/styled-button/styled-button.component';
import { ProductCheckoutCardComponent } from 'src/app/components/product-checkout-card/product-checkout-card.component';
import { ActivatedRoute } from '@angular/router';
import {
  mockActivatedRoute,
  mockCart,
  mockFavourites,
  mockProducts,
  MockStore,
} from 'src/app/testing/mocks';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        if (selector === selectCart) {
          return of(mockCart);
        } else if (selector === selectProductsStore) {
          return of({ products: mockProducts, favourites: mockFavourites });
        }
        return of(null);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        StyledButtonComponent,
        ProductCheckoutCardComponent,
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and products correctly on init', () => {
    expect(component.cart).toEqual(mockCart);
    expect(component.products).toEqual(mockProducts);
    expect(component.favourites).toEqual(mockFavourites);
  });

  it('should calculate the total price correctly', () => {
    component.updatePrice();
    expect(component.totalPrice).toBe(40);
  });

  it('should render the total price correctly in the template', () => {
    const fixture = TestBed.createComponent(CartPage);
    const component = fixture.componentInstance;

    component.totalPrice = 40;
    fixture.detectChanges();

    const totalPriceElement = fixture.nativeElement.querySelector(
      '.cart-summary-total span:nth-child(2)'
    );
    expect(totalPriceElement.textContent).toContain('40.00€');
  });

  it('should display the cart products in the template', () => {
    const compiled = fixture.nativeElement;
    const productElements = compiled.querySelectorAll('app-product-checkout-card');
    expect(productElements.length).toBe(mockCart.products.length);
  });

});
