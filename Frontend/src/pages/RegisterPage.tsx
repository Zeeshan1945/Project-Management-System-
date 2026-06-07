import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { FormCheckbox } from '../components/form/FormCheckbox'
import { FormInput } from '../components/form/FormInput'
import { Icon } from '../components/ui/Icon'
import { useAuth } from '../hooks/useAuth'
import { showErrorToast, showSuccessToast } from '../lib/toast'
import { registerSchema, type RegisterFormValues } from '../utils/validation'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values.fullName, values.email, values.password)
      showSuccessToast('Account created! Welcome aboard.')
      navigate('/dashboard')
    } catch {
      showErrorToast('Registration failed. Please try again.')
      setError('email', { message: 'Registration failed. Please try again.' })
    }
  }

  return (
    <AuthLayout>
        <Card padding="md" className="overflow-hidden p-0">
          <div className="p-8">
            <div className="mb-stack-lg">
              <h2 className="text-headline-lg text-on-surface mb-1">Create Account</h2>
              <p className="text-body-md text-on-surface-variant">Join the professional network of builders.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-gutter" noValidate>
              <FormInput
                control={control}
                name="fullName"
                label="Full Name"
                icon="person"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
              />

              <FormInput
                control={control}
                name="email"
                label="Email Address"
                icon="mail"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
              />

              <div>
                <FormInput
                  control={control}
                  name="password"
                  label="Password"
                  icon="lock"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  showPasswordToggle
                  isPasswordVisible={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  autoComplete="new-password"
                />
                <p className="text-metadata text-on-surface-variant px-1 mt-1">Must be at least 8 characters.</p>
              </div>

              <FormCheckbox
                control={control}
                name="terms"
                label={
                  <>
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </>
                }
              />

              <Button
                type="submit"
                variant="secondary"
                fullWidth
                loading={isSubmitting}
                icon={<Icon name="arrow_forward" className="text-[18px]" />}
              >
                Create Account
              </Button>
            </form>
          </div>

          <div className="bg-surface-container-low p-6 text-center border-t border-outline-variant">
            <p className="text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
    </AuthLayout>
  )
}
