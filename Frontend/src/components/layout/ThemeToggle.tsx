import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { toggleTheme } from '../../store/slices/themeSlice'
import { Icon } from '../ui/Icon'

export function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector((state: RootState) => state.theme.mode)
  const isDark = mode === 'dark'

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <Icon name={isDark ? 'light_mode' : 'dark_mode'} />
    </button>
  )
}
