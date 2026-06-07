import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { FormInput } from '../components/form/FormInput'
import { useAuth } from '../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../lib/toast'
import { loginSchema, type LoginFormValues } from '../utils/validation'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password)
      showSuccessToast('Welcome back! Signed in successfully.')
      navigate('/dashboard')
    } catch {
      showErrorToast('Invalid credentials. Please try again.')
      setError('email', { message: 'Invalid credentials. Please try again.' })
    }
  }

  return (
    <AuthLayout>

      <Card>
        <header className="mb-8">
          <h1 className="text-headline-lg font-semibold text-on-background tracking-tight">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant mt-2">
            Enter your credentials to access your project dashboard.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <FormInput
            control={control}
            name="email"
            label="Email Address"
            icon="mail"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-label-md font-medium text-on-surface-variant flex items-center gap-2">
                <Icon name="lock" className="text-sm" />
                Password
              </label>
              <Link to="/forgot-password" className="text-label-md text-secondary hover:underline transition-all">
                Forgot Password?
              </Link>
            </div>
            <FormInput
              control={control}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            icon={<Icon name="arrow_forward" className="text-xl" />}
          >
            Sign In
          </Button>
        </form>
      </Card>

      <p className="text-center mt-8 text-body-md text-on-surface-variant">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-secondary font-bold hover:underline transition-all ml-1">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  )
}
