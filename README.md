<h1>Technical test for a psychology company</h1>

This technical test is done using Angular 19 and Ionic 7

In order to install everything you must perform

```
npm i
ionic serve
```

### Project purpose

This project is a technical task performed in Ionic 7 and Angular 19. It emulates an e-commerce as a PWA.

The site structure is as follows:

- [x] **1.** Home: List of products, categories
- [x] **2.** Category: List of products filtered by category
- [x] **3.** Product: Product detail with image, text and price
- [x] **4.** Cart: Products added to the cart (subtotal and total)
- [x] **5.** Checkout: Checkout page with delivery options and payment.

The design is provided with this **[figma](https://www.figma.com/community/file/1235719100191160651)** that emulates the nike store.

> [!important]
> It is developed as an Angular APP and added service workers and webmanifest to work as a PWA. The deployment is out of the scope of this project. For this purpose you can go to the **[Ionic Official Documentation](https://ionicframework.com/docs/angular/pwa)**

### Extra features

- [x] **1.** Favourites: Implemented add/remove/show favourites
- [x] **2.** Responsiveness: All the views are made for small, medium and large screens
- [x] **3.** CI: Added a git workflow action to check tests, build and lint.
- [x] **4.** Searchbox: Added a searchbox in category page.
- [x] **5.** Toast: Added toast messaging across the app.

### Project structure

```sh
📁 src
├─📁 app
│ ├─📁 components    # Components with no page entity. Product cards, sliders and styled elements.
│ ├─📁 interfaces    # Interfaces to mainly support the store state
│ ├─📁 pages         # Views of the app
│ ├─📁 pipes         # Utilities to support angular formatting
│ ├─📁 services      # Api Fetcher to retrieve data from (https://fakestoreapi.com/)
│ ├─📁 store         # NgRx files (reducers, selectors, actions and effects) to manage the app state
│ └─📁 testing       # Mockups for testing
└─📁 theme           # App theming variables
```

### Included 3rd-party libraries

- **[NgRx](https://ngrx.io/)**: NgRx Store provides reactive state management for Angular apps inspired by Redux. 
- **[lodash](https://lodash.com/)**: A modern JavaScript utility library delivering modularity, performance & extras.
- **[Swiper](https://swiperjs.com/)**: Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior.
- **[Karma](https://karma-runner.github.io/latest/index.html)**: Tool for testing client-side JavaScript
- **[Angular](https://angular.dev/)**
- **[Ionic](https://ionicframework.com/)**

### Lighthouse

![Lighthouse analytics](https://github.com/user-attachments/assets/f6403d0c-4a94-4ffa-b47f-38b8559ef784)

The performance states that I'm running in dev mode. It lacks CSS and JS minified files. It has a value of 58 but it is not a truthy value.


### Screenshots

All the screenshots taken in large (1920px wide), medium (1300px wide) and small (500px wide) screens.

### Home
![Home large](https://github.com/user-attachments/assets/5e1ff690-e8f0-4d59-a2ec-1f9b9489c8a7)
![Home medium](https://github.com/user-attachments/assets/6746eb96-b58c-41ad-8fe8-a74317d770ba)
![Home small](https://github.com/user-attachments/assets/595ae7dd-e1e7-4b70-9f46-3c582e7a4a7a)
![Home small menu open](https://github.com/user-attachments/assets/696f838d-21ab-443f-88a1-7c5ceebb10a5)

### Category
![Category large](https://github.com/user-attachments/assets/614901d5-8e17-4a72-87ae-36e31b382f74)
![Category medium](https://github.com/user-attachments/assets/bfb7b85a-017c-4c53-8c8a-30e8adfcaedd)
![Category small](https://github.com/user-attachments/assets/d4c8f52f-b0ed-453a-a8b0-d03c2071ecca)

### Product
![Product large](https://github.com/user-attachments/assets/ae88cbf1-9bc4-43e0-9f22-6241c637eb76)
![Product medium](https://github.com/user-attachments/assets/06edcda0-32ab-4f76-bb94-98123b34a046)
![Product small](https://github.com/user-attachments/assets/075826c8-a31c-460e-88bd-ff9a5fa9af17)

### Cart
![Cart large](https://github.com/user-attachments/assets/cfdccbb5-1965-4bf1-b627-f612b6ef549d)
![Cart medium](https://github.com/user-attachments/assets/dd7b3498-a2a3-410d-b26c-53bf4787d87e)
![Cart small](https://github.com/user-attachments/assets/8e8a3559-df5e-41e2-8bf6-b051d44f2264)

### Checkout
![Checkout Delivery large](https://github.com/user-attachments/assets/94ebce98-67b7-45af-9b8e-b97c0966e2e6)
![Checkout Delivery medium](https://github.com/user-attachments/assets/53772384-151b-4713-ab94-8ccb4584f85f)
![Checkout Delivery small](https://github.com/user-attachments/assets/28fb296b-deeb-4ef5-becf-84646c08f379)

![Checkout Payment large](https://github.com/user-attachments/assets/cdff67c1-ec2b-4c16-ad66-1a15e3ce45c2)
![Checkout Payment medium](https://github.com/user-attachments/assets/d4e27393-5308-4540-9ff8-dc98e64403a0)
![Checkout Payment small](https://github.com/user-attachments/assets/e17cfe28-7dde-495d-8584-1ca6a804530e)


