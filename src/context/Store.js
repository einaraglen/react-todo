import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer";

/**
 * Kinda serializes your data, so that it persists between refreshes
 * Uses JSON parsing so we can get back the object list we sendt into it
 * And ofc we give it an empty array if no session data is found (this helps to not break absolutly erything)
 * @param {String} localStorageKey 
 * @returns 
 */
const useStateWithLocalStorage = (localStorageKey) => {

    const [data, setData] = React.useState(
      (localStorage.length !== 0) ? JSON.parse(localStorage.getItem(localStorageKey)) : []
    )
   
    //stores data on change of data
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }, [localStorageKey, data]);
   
    return [data, setData];
  }

const initialState = {
    data: []
}

const Store = ({children}) => {

    const [data, setData] = useStateWithLocalStorage("data");

    initialState.data = data;

    const [state, dispatch] = useReducer(Reducer, initialState);

    //listens for state to be updated, and sets the session data 
    React.useEffect(() => {
        setData(state.data)
    }, [state, setData]);


    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext(initialState);
export default Store;