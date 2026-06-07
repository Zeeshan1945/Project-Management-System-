import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDocument(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.style.colorScheme = mode
}

const initialTheme = getInitialTheme()
applyThemeToDocument(initialTheme)

interface ThemeState {
  mode: ThemeMode
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initialTheme } satisfies ThemeState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      localStorage.setItem(STORAGE_KEY, action.payload)
      applyThemeToDocument(action.payload)
    },
    toggleTheme: (state) => {
      const next = state.mode === 'light' ? 'dark' : 'light'
      state.mode = next
      localStorage.setItem(STORAGE_KEY, next)
      applyThemeToDocument(next)
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
