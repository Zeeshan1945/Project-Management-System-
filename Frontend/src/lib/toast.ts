import toast, { type ToastOptions } from 'react-hot-toast'

const defaultOptions: ToastOptions = {
  duration: 3500,
  style: {
    background: 'var(--color-surface-container-lowest)',
    color: 'var(--color-on-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '12px',
    fontSize: '14px',
    padding: '12px 16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}

export function showSuccessToast(message: string) {
  return toast.success(message, {
    ...defaultOptions,
    iconTheme: {
      primary: 'var(--color-secondary)',
      secondary: 'var(--color-on-secondary)',
    },
  })
}

export function showErrorToast(message: string) {
  return toast.error(message, {
    ...defaultOptions,
    duration: 4500,
    iconTheme: {
      primary: 'var(--color-error)',
      secondary: 'var(--color-on-error)',
    },
  })
}

export function showInfoToast(message: string) {
  return toast(message, {
    ...defaultOptions,
    icon: 'ℹ️',
  })
}
