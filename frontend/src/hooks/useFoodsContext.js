import { FoodsContext } from '../context/FoodContext'
import { useContext } from 'react'

export const useFoodsContext = () => {
  const context = useContext(FoodsContext)

  if (!context) {
    throw Error('useFoodsContext must be used inside an FoodsContextProvider')
  }

  return context
}