import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORIES":
      return {
        ...state, //we can get a privious data which we store in "initialState" in context.jsx file so now we also can get the hits and nbPages data
        isLoading: false,
        hits: action?.payload?.hits,
        nbPages: action?.payload?.nbPages,
      };
    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter(
          (currentElement) => currentElement.objectID !== action.payload //return all the hits which we selected item will deleted
        ),
      };
    case "SEARCH_POST":
      let pageNumInc = state.page + 1;

      if (pageNumInc >= state.nbPages) {
        pageNumInc = 0;
      } else {
        pageNumInc = pageNumInc + 1;
      }
      return {
        ...state,
        query: action.payload,
      };
    case "PREV_PAGE":
      let pageNum = state.page;

      if (pageNum <= 0) {
        pageNum = 0;
      } else {
        pageNum = pageNum + 1;
      }

      return {
        ...state,
        page: pageNum,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
  }
  return state;
};

export default reducer;
