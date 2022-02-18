import React, { createContext, useReducer } from "react"
let SET_THEME     

export const darkModeContext = createContext()


export const darkModeReducer = (state, action) => {
    switch (action.type) {
        case SET_THEME:
          return {
            ...state,
            darkMode: action.payload
          }
        default:
          return state
      }
}