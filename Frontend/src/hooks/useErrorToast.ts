import { useEffect } from 'react'
import { showErrorToast } from '../lib/toast'

export function useErrorToast(error: string | null) {
  useEffect(() => {
    if (error) {
      showErrorToast(error)
    }
  }, [error])
}
