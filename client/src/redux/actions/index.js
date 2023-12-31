import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const ORIGIN_FILTER = "ORIGIN_FILTER";
export const NAME_FILTER = "NAME_FILTER";
export const WEIGHT_FILTER = "WEIGHT_FILTER";
export const RESET_FILTERS = "RESET_FILTERS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const POST_DOG = "POST_DOG";
export const DELETE_DOG = "DELETE_DOG";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get("/dogs");
    return dispatch({ type: GET_DOGS, payload: response.data });
  };
}
export function postDog(payload) {
  return async function () {
    const response = await axios.post(`/dogs`, payload);
    console.log(response);
    return response;
  };
}
export function getDogsByName(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `/dogs/?name=${name}`
    );
    return dispatch({ type: GET_DOGS_BY_NAME, payload: response.data });
  };
}
export function getDogDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`/dogs/${id}`);
    return dispatch({ type: GET_DOGS_DETAIL, payload: response.data });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios.get(`/temperaments`);
    return dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
  };
}
export function deleteDog(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/${id}`);
      return dispatch({ type: DELETE_DOG, payload: id });
    } catch (error) {
      alert("No se pudo borrar el perro");
    }
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
export function orderByWeight(filter) {
  return {
    type: WEIGHT_FILTER,
    payload: filter,
  };
}
export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}
export function cleanDetail() {
  return { type: CLEAN_DETAIL };
}
