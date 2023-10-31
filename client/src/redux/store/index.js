import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//?Nuestra store recibe a los reducer que luego son enviados a nuestra App.
//?Le brindamos a redux la posibilidad de trabajar con funciones asincronicas mediante thunk.

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
