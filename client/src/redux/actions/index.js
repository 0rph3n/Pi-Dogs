import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const ORIGIN_FILTER = "ORIGIN_FILTER";
export const NAME_FILTER = "NAME_FILTER";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/dogs");
    return dispatch({ type: GET_DOGS, payload: response.data });
  };
}
export function getDogsByName(name) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/dogs/?name=${name}`);
    return dispatch({ type: GET_DOGS_BY_NAME, payload: response.data });
  };
}
export function getDogDetail(id) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/dogs/${id}`);
    return dispatch({ type: GET_DOGS_DETAIL, payload: response.data });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/temperaments`);
    return dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
  };
}
export function temperamentsFilter(filter) {
  return {
    type: TEMPERAMENT_FILTER,
    payload: filter,
  };
}
export function dogByOrigin(filter) {
  return {
    type: ORIGIN_FILTER,
    payload: filter,
  };
}
export function orderByName(filter) {
  return {
    type: NAME_FILTER,
    payload: filter,
  };
}
