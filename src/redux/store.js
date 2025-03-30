import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import rootReducer from "./libraryReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore (rootReducer, composeEnhancers(
    applyMiddleware()
));

export default store;


//use este codigo por que vi que al final del video anterior tenia esta estructura, supongo que para evitar la primera opcion que ya esta precaviada, cierto?