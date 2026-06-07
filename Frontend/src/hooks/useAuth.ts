import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { loginUser, logout, registerUser } from '../store/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth)

  const login = useCallback(
    (email: string, password: string) => dispatch(loginUser({ email, password })).unwrap(),
    [dispatch],
  )

  const register = useCallback(
    (name: string, email: string, password: string) =>
      dispatch(registerUser({ name, email, password })).unwrap(),
    [dispatch],
  )

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return { user, isAuthenticated, isLoading, error, login, register, logout: handleLogout }
}
