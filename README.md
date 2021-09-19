# NgxVengeanceLib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Features
### 1. Table:

- Tree Table (deprecated)
- Light Tree Table

### 2. Toast Service

- Success Toast
- Error Toast
- Warning Toast
- Info Toast
- Custom Toast

### 3. Dialog Service

- Message Dialog (success, error, warning, info, custom)
- Confirm Dialog
- Custom Dialog

### 4. Loading Service (global loading)

### 5. Control:

- Auto Input
- File Input
- Tag Input
- Error Section
```angular2html
    // register error section in app module provider
    VgControlModule.forRoot({
      provide: VgErrorDictService,
      useFactory: (translateService: TranslateService) => {
        const vgErrorDictService: VgErrorDictService = new VgErrorDictService();
        vgErrorDictService.register('validation.message.', translateService, 'instant');
        return vgErrorDictService;
      },
      deps: [TranslateService]
    })
```

### 7. Layout:

- Infinitive Scroll

### 6. Directives:

- Number Input
- Currency Input
- Focus First Invalid Input (Form)
- Delay click

### 7. Utilities:

- Upload Progress

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
