import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ProductStore } from 'src/app/store/app.state';
import { IonicModule } from '@ionic/angular';
import { Category } from 'src/app/interfaces/product';
import { mockProductsStore } from 'src/app/testing/mocks';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        return of(mockProductsStore); // Simula el selector para productos y categorías
      }),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and categories from the store', () => {
    component.ngOnInit(); // Asegúrate de que ngOnInit se ejecute

    // Comprobar que los productos y categorías se asignan correctamente
    expect(component.products.length).toBe(2);
    expect(component.categories.length).toBe(2);

    // Comprobar que los sliders de productos se renderizan
    const sliderElements =
      fixture.nativeElement.querySelectorAll('products-slider');
    expect(sliderElements.length).toBe(2); // 2 categorías -> 2 sliders
  });

  it('should display one slider for each category', () => {
    const mockProductsStoreWithMoreCategories: ProductStore = {
      products: [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description 1',
          price: 10,
          category: Category.ELECTRONICS,
          image: '',
          rating: { rate: 4.5, count: 10 },
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description 2',
          price: 20,
          category: Category.ELECTRONICS,
          image: '',
          rating: { rate: 4.0, count: 5 },
        },
      ],
      categories: [Category.ELECTRONICS, Category.JEWELERY, Category.MEN],
      favourites: [],
    };

    mockStore.select.and.returnValue(of(mockProductsStoreWithMoreCategories));

    component.ngOnInit(); // Recarga los datos

    fixture.detectChanges(); // Detecta los cambios

    // Verifica que se han renderizado sliders para todas las categorías
    const sliderElements =
      fixture.nativeElement.querySelectorAll('products-slider');
    expect(sliderElements.length).toBe(3); // 3 categorías -> 3 sliders
  });
});
