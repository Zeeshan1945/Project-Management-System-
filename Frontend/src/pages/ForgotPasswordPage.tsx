import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { Button } from '../components/ui/Button'
import { FormInput } from '../components/form/FormInput'
import { Icon } from '../components/ui/Icon'
import { showSuccessAlert } from '../lib/swal'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../utils/validation'

export function ForgotPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    await showSuccessAlert(
      'Check your email',
      `We've sent a password reset link to ${values.email}.`,
    )
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <main className="flex-grow flex items-center justify-center px-margin-mobile">
        <div className="w-full max-w-md bg-surface-container-lowest stitch-border rounded-xl p-stack-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center text-center mb-stack-lg">
            <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-4">
              <Icon name="lock_reset" className="text-on-primary-fixed text-2xl" />
            </div>
            <h1 className="text-headline-lg font-bold tracking-tight text-primary mb-2">Reset Password</h1>
            <p className="text-body-md text-on-surface-variant max-w-[280px]">
              Enter your email address and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-stack-md" noValidate>
            <FormInput
              control={control}
              name="email"
              label="Email Address"
              icon="mail"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
            />

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              icon={<Icon name="arrow_forward" className="text-lg" />}
            >
              Send Reset Link
            </Button>
          </form>

          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon name="keyboard_backspace" className="text-sm" />
              Back to login
            </Link>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <footer className="w-full py-stack-md px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-gutter">
          <a href="#" className="text-metadata text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-metadata text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="text-metadata text-on-surface-variant hover:text-primary transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  )
}
