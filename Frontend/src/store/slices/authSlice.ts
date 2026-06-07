import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosRequest from '../../APIRoutes/axiosCall'
import { authRoutes } from '../../APIRoutes'
import type { ApiError, AuthResponse, AuthState, User } from '../../types'

const getStoredAuth = (): Pick<AuthState, 'user' | 'token' | 'isAuthenticated'> => {
  try {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    return {
      token,
      user: storedUser ? (JSON.parse(storedUser) as User) : null,
      isAuthenticated: !!token,
    }
  } catch {
    return { token: null, user: null, isAuthenticated: false }
  }
}

const storedAuth = getStoredAuth()

const initialState: AuthState = {
  ...storedAuth,
  isLoading: !!storedAuth.token,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosRequest.post<AuthResponse>(authRoutes.LOGIN, {
        email,
        password,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Login failed',
        },
      )
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { name, email, password }: { name: string; email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await axiosRequest.post<AuthResponse>(authRoutes.REGISTER, {
        name,
        email,
        password,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Registration failed',
        },
      )
    }
  },
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest.get<{ user: User }>(authRoutes.ME)
      return response.data.user
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Session expired',
        },
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Invalid credentials'
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Registration failed'
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
