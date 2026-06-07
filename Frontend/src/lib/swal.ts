import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function getThemeColors() {
  const styles = getComputedStyle(document.documentElement)
  return {
    background: styles.getPropertyValue('--color-surface-container-lowest').trim() || '#ffffff',
    color: styles.getPropertyValue('--color-on-surface').trim() || '#191c1d',
    confirmColor: styles.getPropertyValue('--color-secondary').trim() || '#4648d4',
    cancelColor: styles.getPropertyValue('--color-outline').trim() || '#777682',
    errorColor: styles.getPropertyValue('--color-error').trim() || '#ba1a1a',
  }
}

const baseConfig = () => {
  const theme = getThemeColors()
  return {
    background: theme.background,
    color: theme.color,
    confirmButtonColor: theme.confirmColor,
    cancelButtonColor: theme.cancelColor,
    customClass: {
      popup: 'swal-themed-popup',
      title: 'swal-themed-title',
      htmlContainer: 'swal-themed-text',
      confirmButton: 'swal-themed-btn',
      cancelButton: 'swal-themed-btn',
    },
    buttonsStyling: true,
  }
}

export async function confirmDelete(itemName: string): Promise<boolean> {
  const theme = getThemeColors()
  const result = await MySwal.fire({
    ...baseConfig(),
    title: 'Are you sure?',
    html: `This will permanently delete <strong>${itemName}</strong>. This action cannot be undone.`,
    icon: 'warning',
    iconColor: theme.errorColor,
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    focusCancel: true,
  })
  return result.isConfirmed
}

export async function confirmLogout(): Promise<boolean> {
  const result = await MySwal.fire({
    ...baseConfig(),
    title: 'Sign out?',
    text: 'You will need to sign in again to access your dashboard.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sign Out',
    cancelButtonText: 'Stay signed in',
    reverseButtons: true,
    focusCancel: true,
  })
  return result.isConfirmed
}

export async function showSuccessAlert(title: string, text?: string): Promise<void> {
  await MySwal.fire({
    ...baseConfig(),
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 2500,
    timerProgressBar: true,
  })
}
