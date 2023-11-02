import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";

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
