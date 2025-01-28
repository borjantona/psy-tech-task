import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { initCart } from './store/cart/cart.actions';
import { getCategories, getProducts } from './store/products/products.actions';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mockActivatedRoute, mockProductsStore } from './testing/mocks';
import { Category, Product } from './interfaces/product';

type Selector = 'selectProducts' | 'selectCategories';

interface MockStore {
  select: jasmine.Spy<(selector: Selector) => Observable<Product[] | Category[]>>;
  dispatch: jasmine.Spy<(action: unknown) => void>;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        if (selector === 'selectProducts') {
          return of(mockProductsStore.products);
        } else if (selector === 'selectCategories') {
          return of(mockProductsStore.categories);
        }
        return of([]);
      }),
      dispatch: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch initCart, getProducts, and getCategories on init', () => {
    component.ngOnInit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(initCart({ userId: 1 }));
    expect(mockStore.dispatch).toHaveBeenCalledWith(getProducts());
    expect(mockStore.dispatch).toHaveBeenCalledWith(getCategories());
  });

  it('should store userId in localStorage on init', () => {
    spyOn(localStorage, 'setItem');

    component.ngOnInit();

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', '1');
  });
});
