import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import 'sweetalert2/dist/sweetalert2.min.css'
import './index.css'
import App from './App.tsx'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface-container-lowest)',
            color: 'var(--color-on-surface)',
            border: '1px solid var(--color-outline-variant)',
          },
        }}
      />
    </Provider>
  </StrictMode>,
)
