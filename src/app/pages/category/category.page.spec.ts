import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPage } from './category.page';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { IonicModule } from '@ionic/angular';
import { TitleCasePipe } from '@angular/common';
import {
  mockActivatedRouteElectronics,
  mockProducts,
} from 'src/app/testing/mocks';

describe('CategoryPage', () => {
  let component: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake((selector) => {
        if (selector === selectProducts) {
          return of(mockProducts);
        }
        return of([]);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TitleCasePipe],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRouteElectronics },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CategoryPage component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products based on category from the store on init', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(1);
    expect(component.products[0].category).toBe('electronics');
  });

  it('should render category title correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const categoryTitle =
      fixture.nativeElement.querySelector('.category-title');
    expect(categoryTitle.textContent).toContain('Electronics');
  });

  it('should render product cards for products in the selected category', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const productCards = fixture.nativeElement.querySelectorAll('product-card');
    expect(productCards.length).toBe(1);
  });

  it('should filter products by category and show only the relevant products', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products).toEqual([mockProducts[0]]);
  });
});
