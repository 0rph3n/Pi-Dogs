import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_DETAIL } from "../actions";

//?Alldogs se utiliza para traer todos los perros, dogsCopy es una copia del estado original para modificarlo en los filtros.

let initialState = {
  allDogs: [],
  dogsCopy: [],
  dogDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_DOGS_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;