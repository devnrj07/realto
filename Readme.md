# Realto

Super simple Angular app with 1 module and 1 routes. This is a take home task by `kinetics` which is built using angular`v8`. It has both kinds of forms, routing, parent-child components and Observable service pattern. Angular material is been used for styling.  

# Highlights 
- <b>Retry Strategy on error </b>: using <b>RxJs</b> `retryWhen` and `concatMap`, we can easily try of a HTTP call again n times with `take` operator. Here, <u>user-list</u> components loads a list of registered user and incase the call fails, it tries again for 3 times before, displayig error message finally to user.

- <b>Lazy Caching </b>: while there are various strategies for caching on client side like `localstorgae` , `arrays` etc... I'm leveraging two operators namely `publishReplay` and `refCounf` from a wonderful <b>RxJs</b> library. 
  - <b>PublishReplay operator</b> : The publishReplay() operator turns a cold observable to a hot observable by    multi-casting the values. It creates a new Subject of type ReplaySubject(). The argument we pass determines the current index of the value we want to replay.
  - <b>refCount operator</b>  : refCount() keeps track of all subscribers so that it can unsubscribe from the original source when all the subscribers are gone.

- So, the logic is simple, check global `$cache` variable, if it exists serve the value from the variable(Subject) or if it doesn't (which is first the application loads) hit the server and save the response.
- A second `clearCache` method is used to clear `cache` variable and hence, the variable now gets updated on next call.
- Alternative we can use `timer` and `delay` to do polling and get updated response from the serve periodically.

- Ideally , an event or push notification from server should imitate about the change in response data, only then we should update our cache.

## Get the Code
```
git clone https://github.com/devnrj07/realto.git myapp
cd myapp
npm i
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go reach out on `niraj.mukta123@gmail.com`.
