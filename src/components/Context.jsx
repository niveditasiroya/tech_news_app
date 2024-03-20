import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";
import Stories from "./Stories";

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "css",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetApiDAta = async (url) => {
    dispatch({ type: "SET_LOADING" }); // this is define into action method in reducer.jsx file

    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json(); //for system read call a json
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          //for share extra data for reducer function we use payload
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //to remove the post
  const tabToRemove = (POST_ID) => {
    dispatch({ type: "REMOVE_POST", payload: POST_ID }); //whichnoperation we perform we have to tell the dispatch
  };

  //search
  const searchPost = (searchPost) => {
    dispatch({ type: "SEARCH_POST", payload: searchPost });
  };
  //to call the tech api function

  //pagination
  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  useEffect(() => {
    fetApiDAta(`${API}query=${state.query}&page=${state.page}`);
    console.log("Demoooo => ", API);
  }, [state.query, state.page]);
  //whenever we change the value of state.query it will be loaded

  return (
    <AppContext.Provider
      value={{ ...state, tabToRemove, searchPost, getPrevPage, getNextPage }}
    >
      {/*"tabToRemove" by this in Stories page remove click event know which post was deleted */}
      {children}
    </AppContext.Provider>
  );
};

//custom hook creater
const useGlobalContext = () => {
  //when we want to return or pass a function or component we use a custome hook when we write it we use "use" above the varname
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
