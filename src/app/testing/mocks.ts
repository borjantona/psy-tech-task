import { Cart } from '../interfaces/cart';
import { Category, Product } from '../interfaces/product';
import { ProductStore } from '../store/app.state';

export const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy().and.returnValue(null),
    },
  },
};

export const mockActivatedRouteElectronics = {
  snapshot: { params: { cat: Category.ELECTRONICS } },
};

export const mockCart: Cart = {
  date: '',
  userId: 1,
  products: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
};

export const mockProducts: Product[] = [
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
    category: Category.JEWELERY,
    image: '',
    rating: { rate: 4.0, count: 5 },
  },
];

export const mockFavourites: Product[] = [
  {
    id: 3,
    title: 'Favourite 1',
    description: 'Description 3',
    price: 15,
    category: Category.ELECTRONICS,
    image: '',
    rating: { rate: 5.0, count: 8 },
  },
];

export const mockProductsStore: ProductStore = {
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
  categories: [Category.ELECTRONICS, Category.JEWELERY],
  favourites: [{
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 10,
    category: Category.ELECTRONICS,
    image: '',
    rating: { rate: 4.5, count: 10 },
  }],
};

export const mockProduct: Product = {
  id: 1,
  title: 'Product 1',
  description: 'Description 1',
  price: 10,
  category: Category.ELECTRONICS,
  image: '',
  rating: { rate: 4.5, count: 10 },
};
