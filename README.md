## Getting Started

Start the app with fixtures mode. Fixtures mode is a mock data only mode, which points toward a local node server within the app

`npm run fixture` or `yarn fixture`

Start dev mode. Will run using the development environments variable.

`npm run dev` or `yarn dev`

### Structures

The structure are mainly opiniated from experience and mix and match combination of stacks. However, the `pages` folder are the main requirement due to the usage of Next.js. This is explained in detail at the routing section.

**Components** folder are where the component that related to UI, but not limit to, resides. It can be _stateful/smart_ component or _stateless/dumb/presentational_ component. Ideally, each components sits inside their own folder, while the root file named as `index.js`, as this will allow us to scale the component if in the future the component did group into a much smaller component within it.

For example, assuming we have a component called `LoginForm`, we might have a structure as below.

```
- components
  - LoginForm
    - index.js
    - SubmitButton.js
    - LoginInput.js
```

`SubmitButton` could be the button use to submit the login form, while the `LoginInput` could be a shared component used as the user name and password input. And both of this component used by the `LoginForm` which is exported by the `index.js`. This way, the consumer of the component will importly it with ease.

```
import LoginForm from '~/components/LoginForm';
```

Also, for component that are tied to a page, which probably not used by any other, should be inside a folder with the page name.

```
- components
  - Login // the name of the page
    - index.js // the UI component related to the page
    - LoginForm // the micro component used in the page
      - index.js
      - SubmitButton.js
      - LoginInput.js
- pages
  - login.js // the page
```

The folder name should be CapitalizeCamel, if its the component to be loaded. However, if the folder represent a group of components or category of it, it should stick to lower case.

```
- components
  - layout // the name of the group of component in small case
    - LoginLayout // the name of the component in CamelCase that is capitalize
      - index.js
    - DashboardLayout
      - index.js
- pages
  - login.js // the page files will always be in lower case
```

Those in the `api` folder are uses for the mock server. Consider using this when creating mock api. The pattern are the same with normal route eg if we have a file `login.js` in the `api` folder, it is accessible when we send a request to the `localhost/api/login`. When the app build/exported, this path will not be included.

**Config** folder are meant for configuration files that relates to the app. This usually doesn't have anything related to business logic etc, but on the app configurations, including routing.

**Fixtures** folder hold the mock data files and its entry points. Each data should be in their own JSON file. It should mimick the actual spec from the API

**Libs** folder would be place for any 3rd party library or scripts that doesn't exists in NPM. Chances for any JS library that is open sourced not to be in NPM are very low, so expect to see this folder to be a little bit lonely.

**Pages** folder holds the files that relate to the app pages. Describes more below.

**Public** folder is where all external resources that's depended by the app, such as images, external fonts etc, should be stored. This is requirement of Nextjs and the only folder recognize by Nextjs to load assets.

**Redux** folder store all redux related files with an entry point. `createStore` shouldn't be touch at all times. For each reducers added, it should be within a file, named with the reducer name and ended with a `dux`. For example, if we create a reducer for a todo list, we would create a file name `todoDux.js`. And then we need to add the slice of this reducer into the `index.js` file with its slice name.

```js
export const rootReducer = combineReducers({
  user,
  accounts,
  fav,
  ui,
  todos <--- add your new reducer
});
```

**Sagas** folder hold all of the app redux-saga files. Similar to redux folder, each of saga that tie to a reducer will have their own saga file. And the saga from the file that needed to be tied with reducer's action need to be imported and loaded in the `index.js` of the sagas. And similar to redux, the naming should start with the reducer name and append with `saga`. eg `todoSaga.js`

**Services** folder stored any files that related to the app services, for example the app APIs. The `api` hold the API endpoints, while the `fetcher.js` is where the app API creation and definition are defined.

**Styles** folder where you should put the CSS files into. It can then be loaded into the screen by directly importing it and use as `cssModules`. We will unlikely use much of this since we have material component and emotion as style component.

**Theme** folder are internally use by Material component, no need to bother.

**Utilites** folder hold the files of utilities functions. This will usually carry a generic but tedious chore function that can be use, or will be use across the app.

**Files**

- .babelrc: The babel configuration. Shouldn't be modified, unless by person in charge.
- .eslintrc: The linter configuration. Shouldn't be modified, unless by person in charge.
- .gitignore: The git ignore configuration. Shouldn't be modified, unless by person in charge.
- env._: The environment variable declaration and configurations. Shouldn't be modified, unless by person in charge. `_.local`are meant for your workspace and should not be comitted. Variable that starts with`NEXT_PUBLIC` will be accessible in the browser or the app, while those without only accessible from the server side render.
- next.config.js: The nextjs configuration file. Shouldn't be modified, unless by person in charge.
- package.json: The app details and dependencies configuration. Any data Shouldn't be modified, unless by person in charge, except on the dependencies whenever necessary. Do notify the team whenever a new dependencies are added.
- readme.md: The app readme. Do not change nor edit, unless you're responsible with the docs.

### Server Side Rendering (SSR)

**SSR** is the ability of a front-end framework to render markup while running on a back-end system. Applications that have the ability to render both on the server and on the client are called universal apps. React has been a client side rendering (CSR) for years and many other front-end framework are the same. This is because it started as an Single page Application (SPA). SPAs offer great advantages in speed and UX over traditional server-rendered apps. But there is a catch. The initial server request is generally returning an empty HTML file with a bunch of CSS and JavaScript (JS) links. Then the external files need to be fetched in order to render relevant markup.

This means that the user will have to wait longer for the initial render. This also means that crawlers may interpret your page as empty.

So the idea is to render your app on the server initially, then to leverage the capabilities of SPAs on the client.

With SSR, now the user does not have to wait for your JS to load and gets a fully rendered HTML as soon as the initial request returns a response. And web crawlers will now see your website as any other static site on the web and will index all the content you render on the server.

Although React has provided support for SSR in recent years, setting it up has been tedious. Thankfully, Next.js provide SSR out of the box with **_zero_** configuration. Everything is SSR ready as long as you don't require anything client specific, for which then make a much sense to wait for the client to render for that specific component, and the rest of the page can already be loaded without waiting.

Next.js extends React to provide a powerful method for loading a page's initial data, no matter where it is coming from. With a single place to prepopulate page context, server-side rendering with Next.js seamlessly integrates with any existing data-fetching strategy.

### Routing

Next.js have one thing that is opinionated -- the folder structure. And the only folder they concern with are called the `pages`. In Next.js, any files place in the folder will be treated as a page or path. Imaging you have a file called `about.js` in the folder. That means you will be able to render the file at the path of `localhost/about`. That's pretty straightforward, no?

This assumptions gives the flexibility to developer to create path or route without the need to know the path beforehand. So you don't have to maintain a routing files that map the path with the view or what not.

However, for a complex app and those that require you to know the list of pages beforehand, you might want to maintain those pages and path in a config file, while is where the `config/routes.js` can come in handly, because routes might also be used by other components such as sidebar that need to display list of pages. It is also a good place to configure the routes viewing permission. So we can use it across the app. This file also loaded by the export route map which defined in the `next.config.js` which needed for us to export the project into static HTML.

#### Routes Naming convention

The naming convention for routes will be abit different from others (functions, components, utils). The structure should be arrange and name in accordance to the routing path. So for that, if path name contained more that 1 words, it needed to be separated by hypen (-). For example, if we intend to have a route of `/user/public-profile`, we will create a folder called `user` in the `pages` folder, and create a file `public-profile.js`. This will ease the standardization for the path name. Note that this special naming convention only applies to the files inside the `pages` folder. The other files will follows the naming convetion below.

Why not CamelCase or Under_score separated? Well, hypen are a more natural representation of spaces. Camel case is obviously not a right way to represent path and its harder to read. Same goes with under score. In SEO stand point of view hypen are the only way, confirmed by [Google](https://support.google.com/webmasters/answer/76329?hl=en)

> Google treats a hyphen as a word separator, but does not treat an underscore that way. Google treats and underscore as a word joiner — so red_sneakers is the same as redsneakers to Google. This has been confirmed directly by Google themselves, including the fact that using dashes over underscores will have a (minor) ranking benefit. - [source](https://www.ecreativeim.com/blog/index.php/2011/03/30/seo-basics-hyphen-or-underscore-for-seo-urls/)

**Dynamic routing**

For example, assuming we design a route for user account, which differ in the account type. And each account have a unique account number as an identifier. We could come out with below design.

```
/accounts/savings/12341231231
/accounts/current/12341231231
/accounts/mortgage/12341231231
```

This way, our routing will be more predictable as you understand the pattern, and we can keep it in uniformity across the app. But how do we do this and let Next know about it? To handle this, we can use the new support for parameterize page naming.

Let's go with the basic. We know we going to need to create a folder for `accounts` and the `savings`, `current` and `mortgage` in the folder. To handle the account no page, we can create a file and name it as `[accountNo].js`. The name of `accountNo` can be anything that you'd perceived as the parameter query you'd want to access within the app. _OR_ you can create a folder named `[accountNo]` and have an `index.js` within it, and it'd be fine too.

```
- pages
  - accounts
    - savings
      - [accountNo].js
    - current
      - [accountNo]
        - index.js <-- recommended
    ...
```

_Voila!_. Now to use it when linking, you just need to tell Next what's the path you're going, and the _actual_ path that you've map to it.

```js
// example when using <Link />
<Link
  href="/accounts/savings/[accountNo]"
  as={`/accounts/savings/${account.accountNo}`}>
  ...
</Link>;

// with Router
import { useRouter } from "next/router"; // use within component
// import Router from 'next/router' // outside of functional component, in saga etc

export default function() {
  const account = {
    accountNo: "12312312"
  };
  const router = useRouter();

  const handleNav = accountNo => {
    router.push(
      "/accounts/savings/[accountNo]",
      `/accounts/savings/${accountNo}`
    );
  };
  return (
    <div>
      <button onClick={() => handleNav(account.accountNo)}>
        Go to account
      </button>
    </div>
  );
}
```

With this, Next will know where to look up the page from. Even if you didn't supply those mapping, it will get to it, but it will cause the app to do routing in regular fashion (not in SPA way) and you may notice it will refresh the page. This is due to Next not able to find the path of `savings/1231231231` as in account number. So it'd refresh the page, and look into the actual page during page compilation.

#### Navigation

Use Next's `Link` component whenever you need to navigate into internal page (eg any route that resides inside the pages folder).

```js
import Link from "next/link";

export default () => (
  <>
    <div>
      Click{" "}
      <Link href="/about" passHref>
        <a>here</a>
      </Link>{" "}
      to read more
    </div>
    <div>
      <Link href="/contact" prefetch>
        <a>Contact Us</a>
      </Link>
    </div>
  </>
);
```

`passHref`props will make sure that the `Link` component delegate the given `href` towards it children, which _*should*_ be an anchor.

**Only in production build**

You can choose to prefetch the pages by using the `prefetch` props and Next will prefetch those pages in the background. Note that you must wrap the children of a `Link` with an anchor or some element.

`Link` also accept URL object for your utilization. Example below will generate the URL as `/about?name=John`

```js
import Link from "next/link";

export default () => (
  <div>
    <Link href={{ pathname: "/about", query: { name: "John" } }}>
      <a>About John</a>
    </Link>
  </div>
);
```

You can also use an Higher Order Component (HOC) provided by Next's `router`, which is the `withRouter`.

```js
import { withRouter } from "next/router";

const ActiveLink = ({ children, router, href }) => {
  const style = {
    color: router.pathname === href ? "red" : "black"
  };

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
```

And also hooks which is available in pure function component.

```js
import { useRouter } from "next/router";

export default function({ children }) {
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
```

Read more about `Link` and routing specific for Next [here](https://github.com/zeit/next.js#routing)

### Redux

[Redux](https://redux.js.org/) is a predictable state container for JS apps. Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

Redux main skeleton relies on multiple component; Reducers, actions, action types, dispatcher and store.

However, we use Autodux to simplify most of this. See the section below for details.

Domus uses react-redux's hook APIs extensively so that we can uses as less class component as possible. Most importantly, only 2 hooks that is used extensively, `useSelector` and `useDispatch`. We use `useSelector` to get the state, while `useDispatch` to dispatch the actions and possibly update the necessary state.

The example below shows the usage of it together with Autodux.

```js
// counterDux
const {
  reducer,
  initial,
  slice,
  actions: { increment }
} = autodux({
  slice: "counter",
  initial: 0,
  actions: {
    increment: state => state + 1
  }
});

// Counter.js
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, multiply } from "~/redux/counterDux"; // the reducer above

export default function Counter(props) {
  // initialize the redux's dispatcher
  const dispatch = useDispatch();

  // get the state from the slice
  const counter = useSelector(state => state.counter);

  // When passing a callback using dispatch to a child component,
  // it is recommended to memoize it with useCallback,
  // since otherwise child components may render
  // unnecessarily due to the changed reference.
  const incrementCounter = useCallback(
    // increment is the action from autodux,
    // which also provide the action type accessible in the type key
    () => dispatch({ type: increment.type }),
    [dispatch]
  );

  return (
    <div>
      <h1>Count: {counter}</h1>
      <Button onIncrement={incrementCounter} />
    </div>
  );
}

export const Button = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
));
```

### Autodux

[Autodux](https://github.com/ericelliott/autodux) is a library wrapper for Redux, which allows you to create reducers with a simple function and reduce the amount of boilerplate.

Once common issue with Redux is that it introduce a lot of boilerplate whenever you want to set up reducers, with `switch` statement every where to determine action type with its respective reducers.

```js
// with redux
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const MULTIPLY = 'MULTIPLY';

const counter = (state = 0, action = {}) {
  switch (action.type){
    case INCREMENT: return state + 1;
    case DECREMENT: return state - 1;
    case MULTIPLY : return state * action.payload
    default: return state;
  }
};
```

Autodux allows you to simplified this with a single function, that will create all the necessary redux functions, including reducers, action and action types

```js
// with autodux
const counter = autodux({
  slice: "counter",
  initial: 0,
  actions: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: (state, payload) => state * payload
  }
});
```

Or you can export the above example as below

```js
// with autodux
const {
  reducer,
  initial,
  slice,
  actions: { increment, decrement, multiply }
} = autodux({
  slice: "counter",
  initial: 0,
  actions: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: (state, payload) => state * payload
  }
});
```

Autodux also allows you to create your selectors. By default, every key in your initial state will have its own selector, prepended with get and camelCased. For example, if you have a key called userName, a getUserName selector will be created automatically. Only create and use selectors if you require some complex combination of states. Else, we always relies on redux's `useSelector` hook to pick our state. Read more about it at the `redux` section.

For actions, if the action's purpose is to set a singular value in the state, you can use the autodux's function `assign` and pass the string key of the state to be replace.

```js
...
intial: {
  username: ''
},
actions: {
    setUsername: assign('username')
  }
...
```

### next-redux-wrapper

To make the integration of Redux with the app, we require some special handling of the `Provider` especially between the client and server side. Thus, we used `next-redux-wrapper` that handles all this for us as an HOC. What it does is, it auto-creates Redux store when getInitialProps is called by Next.js and then passes this store down to React Redux's Provider, which is used to wrap the original component, also automatically. On the client side it also takes care of using same store every time, whereas on server new store is created for each request.

Our createStore will return a new instance of Redux store each time when called, no memoization needed here, as this done automatically inside the wrapper.

Shouldn't be primary concern for others, since we've set this up and configure it.

```js
// userDux.js

// actions
...
// the action will be called once we complete the login request
// assuming payload is the token
getAuthenticationSucces: (state, payload) => ({
  ...state, // spread all of the other states
  token: payload // assign the payload
})
...
```

### Redux-Saga and next-redux-saga

`redux-saga` is a library that aim to handle your `redux` side effect. If you familiar with `redux-thunk`, `redux-saga` aims to make the handling of the side-effects much easier to be manage, efficient and better at handling errors. Contrary to `redux-thunk`, you don't end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.

> The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects.`redux-saga` is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

If we implement `redux-saga` right away, you'll see that on the server side, it will get to dispatch all the redux action and do its job. However, it didn't reflected in the store on the client side. Since `redux-saga` is like a separate thread in our application, we need to tell the server to _END_ the running saga when all asynchronous actions are complete. So we make use of `next-redux-saga` as a HOC for our app to make saga works well with Next app especially for the server side call. With this, we only need one place to dispatch the call to load our data on page, which is in the `getInitialProps`. The data will only be fetched once from the client or the server, no more extra dispatching like when you place the dispatcher in the `componentDidMount`.

Below is an example of saga. Assuming we wanted to have a counter reducer that will update the counter each time the action dispatched, and call the API to update the counter in the DB

```js
// counterDux
const {
  reducer,
  initial,
  slice,
  actions: {
    increment,
    incrementSuccess,
    incrementFailure
  }
} = autodux({
  slice: 'counter',
  initial: 0,
  actions: {
    increment: state => state + 1,
    incrementSuccess: state => state,
    incrementFailure: (state, payload) => ({ ...state, error: true, errorObj: payload })
  }
});

// counterSaga
export function* incrementCount (api) {
  /**
   * We always wrap it in a try and catch to avoid breaking
   * the app. Also, we can utilize the finally in any case
   * where we uses loading toggle to clear the loader
   * when the request is success or failing
   *
   **/

  try {
    const response = yield call(api.updateIncrement)

    // if the request is fine
    if (response.ok) {
      yield put(incrementSuccess())
    } else {
      throw new Error(response)
    }
  } catch (err) {
      yield put(incrementSuccess(err))
  }
}

// index saga
import { increment } from '~/counterDux'
import { incrementCount } from '~/counterSaga'

yield all([
  ...,
  takeLatest(increment.type, incrementCount, api),
])
```

Again the wrapper shouldn't be concern of others since we've wired it up within the app.

#### `requestManager`

This function are a Saga's generator that focus on a unified error that can be handle as a same situation across all request. For example, handling authentication error, or network error. For error that are too specific to a reducer or need a special personalization, please handle it with the the reducer action.

Basic usage

```js
import { action } from "~/reducers";
import requestManager from "~/saga/requestSaga";

export function* loadData(api, { payload }) {
  const { response, error, handled } = yield call(
    requestManager,
    api.loadData,
    payload
  );

  if (response) yield put(loadDataSuccess(response.data));
  else if (error) yield put(loadDataFailure(error));
  else if (handled) console.log("error handled by requestManager");
}
```

The example usage of this function is in the `startupSaga`. To test this within the app, try to search for a non-sensible, random name of repo. You'll see the error come from a different action, instead of the `getRepoFailure`.

The function accept 2 arguments: `api` and `paramaters`. The `api` function are the one that will call the fetch of the API, and it should be defined in `api.js` while the `paramaters` to be passed to the API to be use as request params and it is optional.

The function will return three paramaters: `response`, `error`, `handled`.

- `response` will be the original response from the API, when the status is OK
- `error` will be the an error object, contain the response status code, and the error message, formed from the response data or from the problem property, when the status is not 200
- `handled` will be a boolean, indicating that there's an error and it has been handled from the `requestManager`

### Apisauce

[Apisauce](https://github.com/infinitered/apisauce) is library for AJAX request, that uses Axios at its core and standardize the request/response and errors transforms and making it predictable.

To see Domus API service, look in `services/api.js`. The API has been configure and all needed to be done is to add API definition to it.

To create an API definition, define it based on your request method. For example, we going to create an API that retrieve a user's list of accounts and another API to shoot a transaction. We assumed both API needed an auth token.

```js
...
const getUserAccounts = (id, token) => api.get(
  `/user/${id}/accounts`,
  {},
  headers: {
    Authorization: `Bearer ${token}`
  }
);

const submitPayment = (args, token) => api.post(
    '/payment',
    args,
    headers: {
      Authorization: `Bearer ${token}`
    }
  )

exports {
  getUserAccounts
}
```

The API is simple. The `api` is the API function we've created. You can use the method of your request (`get`, `post`, `delete` etc) to make the request. The first argument will be the URL of the API, while the second arguments is for the request's body object, like query etc, and the last argument are for the request headers.

You can then use this API by calling it.

```js
import api from "~/services/api";

const request = await api.getUserAccounts(1234, "token");
```

However, you will mostly see this used in the `sagas` folder, because we use `redux-saga` to handle any side-efffects. See saga section for more.

### Emotions and React-emotions

[Emotion](https://emotion.sh/docs/introduction) is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities. Both string and object styles are supported.

Meanwhile, React-emotions are the packages made specifically for usage of emotion with React.

Emotion gave us a lot of useful features, but the commonly used in Domus is the `styled` features, which gaves us the ability to create a styled component.

```js
import styled from "@emotion/styled";

let SomeComp = styled.div({
  color: "hotpink"
});

// access the prop within the styled
let AnotherComp = styled.div`
  color: ${props => props.color};
`;

render(
  <SomeComp>
    <AnotherComp color="green" />
  </SomeComp>
);
```

### Misc

You might see the import path uses `~` everywhere. This is just a module transform shortcut towards the app root. So you do not have to indulge yourself in absolute path of hell.

So, instead of:

```js
import Component from '../../../../../../components/parentComponent/otherComponent/motherComponent/actualComponent'
```

You can do (assuming that components accessible at the root of the app structure)

```js
import Component from '~/components/parentComponent/otherComponent/motherComponent/actualComponent'
```

Babel and eslint has been configured to accept and map this value to the root, and also the vs code with the `jsconfig.json` so path look up should work.