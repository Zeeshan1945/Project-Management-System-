import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosRequest from '../../APIRoutes/axiosCall'
import { projectRoutes } from '../../APIRoutes'
import type { ApiError, CreateProjectPayload, Project, UpdateProjectPayload } from '../../types'
import { mapList, mapProject } from '../../utils/apiMappers'
import { logout } from './authSlice'
import type { RootState } from '../index'

interface ProjectsState {
  items: Project[]
  loading: boolean
  loaded: boolean
  error: string | null
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  loaded: false,
  error: null,
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest.get(projectRoutes.BASE)
      return mapList(response.data, mapProject)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to fetch projects',
        },
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading, loaded } = (getState() as RootState).projects
      return !loading && !loaded
    },
  },
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (payload: CreateProjectPayload, thunkAPI) => {
    try {
      const response = await axiosRequest.post(projectRoutes.BASE, payload)
      if (!response.data) {
        return thunkAPI.rejectWithValue({ message: 'Failed to create project' })
      }
      return mapProject(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to create project',
        },
      )
    }
  },
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async (payload: UpdateProjectPayload, thunkAPI) => {
    try {
      const { id, ...data } = payload
      const response = await axiosRequest.put(`${projectRoutes.BASE}/${id}`, data)
      if (!response.data) {
        return thunkAPI.rejectWithValue({ message: 'Project not found' })
      }
      return mapProject(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: ApiError } }).response?.data || {
          message: 'Failed to update project',
        },
      )
    }
  },
)

export const deleteProject = createAsyncThunk('projects/delete', async (id: string, thunkAPI) => {
  try {
    await axiosRequest.delete(`${projectRoutes.BASE}/${id}`)
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as { response?: { data?: ApiError } }).response?.data || {
        message: 'Failed to delete project',
      },
    )
  }
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.loaded = true
        state.items = action.payload
      })
      .addCase(logout, () => initialState)
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Failed to fetch projects'
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Failed to create project'
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Failed to update project'
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error =
          (action.payload as ApiError | undefined)?.message || 'Failed to delete project'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
  },
})

export const { clearProjectsError } = projectsSlice.actions
export default projectsSlice.reducer
