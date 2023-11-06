/* eslint-disable no-case-declarations */
import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  GET_DOGS_DETAIL,
  GET_TEMPERAMENTS,
  TEMPERAMENT_FILTER,
  ORIGIN_FILTER,
  NAME_FILTER,
  WEIGHT_FILTER,
  RESET_FILTERS,
  CLEAN_DETAIL,
} from "../actions";

//?Alldogs se utiliza para traer todos los perros, dogsCopy es una copia del estado original para modificarlo en los filtros.

let initialState = {
  allDogs: [],
  dogsCopy: [],
  dogDetail: {},
  temperaments: [],
  filter: "all",
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
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case TEMPERAMENT_FILTER:
      if (action.payload === "all") {
        return {
          ...state,
          allDogs: state.dogsCopy,
          filter: action.payload,
        };
      } else {
        return {
          ...state,
          filter: action.payload,
          allDogs: state.dogsCopy.filter((d) => {
            return d.temperament.includes(action.payload); //*Filtro los perros buscando que en cada perro se incluya el temperamento que me llega por payload.
          }),
        };
      }
    case ORIGIN_FILTER:
      const createdFilter =
        action.payload === "api"
          ? state.dogsCopy.filter((d) => !d.created)
          : state.dogsCopy.filter((d) => d.created);
      console.log(createdFilter);
      return {
        ...state,
        allDogs: action.payload === "all" ? state.dogsCopy : createdFilter,
      };
    case NAME_FILTER:
      let sortedDogs =
        action.payload === "Za"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortedDogs,
      };
    case WEIGHT_FILTER:
      let weightDogs =
        action.payload === "minWeight"
          ? state.allDogs.sort((a, b) => {
              const dogA = parseInt(a.weight.split("-")[0], 10);
              const dogB = parseInt(b.weight.split("-")[0], 10);
              if (dogA > dogB) {
                return 1;
              }
              if (dogB > dogA) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              const dogA = parseInt(a.weight.split("-")[1], 10);
              const dogB = parseInt(b.weight.split("-")[1], 10);
              if (dogA > dogB) {
                return -1;
              }
              if (dogB > dogA) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: weightDogs,
      };
    case RESET_FILTERS:
      window.location.reload();
      return {
        state,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        dogDetail: {},
      };
    default:
      return state;
  }
}

export default rootReducer;
