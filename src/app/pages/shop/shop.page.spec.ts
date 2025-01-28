import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopPage } from './shop.page';
import { Store } from '@ngrx/store';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { StyledInputComponent } from 'src/app/components/elements/styled-input/styled-input.component';
import { StyledButtonComponent } from 'src/app/components/elements/styled-button/styled-button.component';
import { ProductSummaryCheckoutComponent } from 'src/app/components/product-summary-checkout/product-summary-checkout.component';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {
  mockActivatedRoute,
  mockCart,
  mockProducts,
  MockStore,
} from 'src/app/testing/mocks';

describe('ShopPage', () => {
  let component: ShopPage;
  let fixture: ComponentFixture<ShopPage>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        if (selector === selectCart) {
          return of(mockCart);
        } else if (selector === selectProducts) {
          return of(mockProducts);
        }
        return of(null);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        DecimalPipe,
        StyledInputComponent,
        StyledButtonComponent,
        ProductSummaryCheckoutComponent,
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and products correctly on init', () => {
    expect(component.cart).toEqual(mockCart);
    expect(component.products).toEqual(mockProducts);
  });

  it('should calculate the total price correctly', () => {
    component.updatePrice();
    expect(component.totalPrice).toBe(40);
  });

  it('should set the arrival date correctly', () => {
    const arrivalDate = new Date();
    const expectedArrival = `Arrives before ${arrivalDate.getDate()} ${arrivalDate.toLocaleString(
      'en',
      {
        month: 'long',
      }
    )}`;
    expect(component.arrival).toBe(expectedArrival);
  });

  it('should mark the form as submitted when submitForm is called', () => {
    expect(component.formDeliverySubmitted).toBeFalse();
    component.submitForm();
    expect(component.formDeliverySubmitted).toBeTrue();
  });

  it('should render the correct total price in the template', () => {
    const compiled = fixture.nativeElement;
    const totalPriceElement = compiled.querySelector(
      '.shop-summary-total span:last-child'
    );
    component.updatePrice();
    fixture.detectChanges();
    expect(totalPriceElement.textContent).toContain('40.00€');
  });

  it('should display the cart products in the template', () => {
    const compiled = fixture.nativeElement;
    const productElements = compiled.querySelectorAll(
      'app-product-summary-checkout'
    );
    expect(productElements.length).toBe(mockCart.products.length);
  });
});
