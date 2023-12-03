import { createContext, useReducer } from 'react'

export const FoodsContext = createContext()

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': 
      return {
        foods: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        foods: [action.payload, ...state.foods]
      }
    case 'DELETE_WORKOUT':
      return {
        foods: state.foods.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const FoodsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodsReducer, {
    foods: null
  })

  return (
    <FoodsContext.Provider value={{...state, dispatch}}>
      { children }
    </FoodsContext.Provider>
  )
}