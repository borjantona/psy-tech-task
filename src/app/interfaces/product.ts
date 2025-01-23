export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export enum Category {
	ELECTRONICS = 'electronics',
	JEWELERY = 'jewelery',
	MEN = 'Men\'s Clothing',
	WOMEN = 'Women\'s Clothing'
}
