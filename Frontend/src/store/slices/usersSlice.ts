import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosRequest from '../../APIRoutes/axiosCall'
import { userRoutes } from '../../APIRoutes'
import type { ApiError, User } from '../../types'
import { mapList, mapUser } from '../../utils/apiMappers'
import { logout } from './authSlice'
import type { RootState } from '../index'

interface UsersState {
  items: User[]
  loading: boolean
  loaded: boolean
  error: string | null
}

const initialState: UsersState = {
  items: [],
  loading: false,
  loaded: false,
  error: null,
}

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest.get(userRoutes.BASE)
      return mapList(response.data, mapUser)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to fetch users',
        },
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading, loaded } = (getState() as RootState).users
      return !loading && !loaded
    },
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.loaded = true
        state.items = action.payload
      })
      .addCase(logout, () => initialState)
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as ApiError | undefined)?.message || 'Failed to fetch users'
      })
  },
})

export default usersSlice.reducer
