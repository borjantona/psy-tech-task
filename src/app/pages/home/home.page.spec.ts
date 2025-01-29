import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { mockProductsStore, mockProductsStoreWithMoreCategories, MockStore } from 'src/app/testing/mocks';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.callFake(() => {
        return of(mockProductsStore);
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
    component.ngOnInit(); 

    expect(component.products.length).toBe(2);
    expect(component.categories.length).toBe(2);

    const sliderElements =
      fixture.nativeElement.querySelectorAll('app-products-slider');
    expect(sliderElements.length).toBe(2); 
  });

  it('should display one slider for each category', () => {
    

    mockStore?.select?.and.returnValue(of(mockProductsStoreWithMoreCategories));

    component.ngOnInit();

    fixture.detectChanges();

    const sliderElements =
      fixture.nativeElement.querySelectorAll('app-products-slider');
    expect(sliderElements.length).toBe(3);
  });
});
