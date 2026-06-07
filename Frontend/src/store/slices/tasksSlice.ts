import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosRequest from '../../APIRoutes/axiosCall'
import { taskRoutes } from '../../APIRoutes'
import type {
  ApiError,
  CreateTaskPayload,
  Task,
  TaskStatus,
  UpdateTaskPayload,
} from '../../types'
import { mapList, mapTask } from '../../utils/apiMappers'
import { logout } from './authSlice'
import type { RootState } from '../index'

interface TasksState {
  items: Task[]
  loading: boolean
  loaded: boolean
  error: string | null
}

const initialState: TasksState = {
  items: [],
  loading: false,
  loaded: false,
  error: null,
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest.get(taskRoutes.BASE)
      return mapList(response.data, mapTask)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to fetch tasks',
        },
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading, loaded } = (getState() as RootState).tasks
      return !loading && !loaded
    },
  },
)

export const createTask = createAsyncThunk(
  'tasks/create',
  async (payload: CreateTaskPayload, thunkAPI) => {
    try {
      const response = await axiosRequest.post(taskRoutes.BASE, payload)
      if (!response.data) {
        return thunkAPI.rejectWithValue({ message: 'Failed to create task' })
      }
      return mapTask(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to create task',
        },
      )
    }
  },
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (payload: UpdateTaskPayload, thunkAPI) => {
    try {
      const { id, ...data } = payload
      const response = await axiosRequest.put(`${taskRoutes.BASE}/${id}`, data)
      if (!response.data) {
        return thunkAPI.rejectWithValue({ message: 'Task not found' })
      }
      return mapTask(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to update task',
        },
      )
    }
  },
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string, thunkAPI) => {
  try {
    await axiosRequest.delete(`${taskRoutes.BASE}/${id}`)
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as { response?: { data?: ApiError } }).response?.data || {
        message: 'Failed to delete task',
      },
    )
  }
})

export const changeTaskStatus = createAsyncThunk(
  'tasks/changeStatus',
  async ({ id, status }: { id: string; status: TaskStatus }, thunkAPI) => {
    try {
      const response = await axiosRequest.patch(taskRoutes.STATUS(id), { status })
      if (!response.data) {
        return thunkAPI.rejectWithValue({ message: 'Task not found' })
      }
      return mapTask(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to update task status',
        },
      )
    }
  },
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasksError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.loaded = true
        state.items = action.payload
      })
      .addCase(logout, () => initialState)
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as ApiError | undefined)?.message || 'Failed to fetch tasks'
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = (action.payload as ApiError | undefined)?.message || 'Failed to create task'
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = (action.payload as ApiError | undefined)?.message || 'Failed to update task'
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = (action.payload as ApiError | undefined)?.message || 'Failed to delete task'
      })
      .addCase(changeTaskStatus.rejected, (state, action) => {
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Failed to update task status'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export const { clearTasksError } = tasksSlice.actions
export default tasksSlice.reducer
