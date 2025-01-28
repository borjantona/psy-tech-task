import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPage } from './product.page';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { addProduct } from 'src/app/store/cart/cart.actions';
import { addRemoveFavourite } from 'src/app/store/products/products.actions';
import { selectProductsStore } from 'src/app/store/products/products.selectors';
import { IonicModule } from '@ionic/angular';
import { TitleCasePipe } from '@angular/common';
import { mockProduct, mockProductsStore, MockStore } from 'src/app/testing/mocks';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        if (selector === selectProductsStore) {
          return of(mockProductsStore);
        }
        return of([]);
      }),
      dispatch: jasmine.createSpy(),
    };

    const mockActivatedRoute = {
      snapshot: { params: { id: '1' } },
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TitleCasePipe],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ProductPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data from the store on init', () => {
    component.ngOnInit();
    expect(component.product).toEqual(mockProduct);
    expect(component.isFavourite).toBe(true);
  });

  it('should dispatch addToCart when Add to cart button is clicked', () => {
    component.addToCart();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addProduct({ product: mockProduct })
    );
  });

  it('should dispatch addRemoveFavourite when Add to favourites button is clicked', () => {
    component.likeProduct();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addRemoveFavourite({ productId: mockProduct.id })
    );
  });

  it('should render product details correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const productName =
      fixture.nativeElement.querySelector('.product-info-name');
    const productCategory = fixture.nativeElement.querySelector(
      '.product-info-category'
    );
    const productPrice = fixture.nativeElement.querySelector(
      '.product-info-price'
    );
    const productDescription = fixture.nativeElement.querySelector(
      '.product-info-description'
    );

    const categoryTitleCase =
      String(mockProduct.category).charAt(0).toUpperCase() +
      String(mockProduct.category).slice(1);

    expect(productName.textContent).toContain(mockProduct.title);
    expect(productCategory.textContent).toContain(categoryTitleCase);
    expect(productPrice.textContent).toContain(`${mockProduct.price}€`);
    expect(productDescription.textContent).toContain(mockProduct.description);
  });
});
