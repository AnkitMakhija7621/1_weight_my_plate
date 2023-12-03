import { useAuthContext } from './useAuthContext'
import { useFoodsContext } from './useFoodsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchFoods } = useFoodsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchFoods({ type: 'SET_FOOD', payload: null })
  }

  return { logout }
}