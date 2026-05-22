import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaRightToBracket, FaTriangleExclamation } from 'react-icons/fa6'
import { loginService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      const response = await loginService({
        email: formData.email,
        password: formData.password,
      })
      
      login(response.body.token, response.body.user)
      navigate('/admin')
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please check your email and password.'

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-6">
      <section className="relative w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-white text-slate-950 shadow-2xl shadow-slate-200/80">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-amber-100" />
        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-cyan-100" />

        <div className="relative z-10 p-5 sm:p-12">
          <div className="mx-auto w-full max-w-lg">
            <div className="mb-5">
              <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-amber-700">
                <FaRightToBracket className="mr-2" />
                Login
              </p>
              <h2 className="text-3xl font-black leading-tight text-slate-950">
                Sign in to continue
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your account details to access your dashboard.
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              {error && (
                <p className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                  <FaTriangleExclamation />
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm font-bold text-slate-500 hover:text-slate-950">
                    Forgot?
                  </Link>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-14 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-950"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-slate-950 accent-slate-950"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-slate-300/70 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FaRightToBracket />
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-semibold text-slate-500">
              New customer?{' '}
              <Link to="/register" className="font-black text-slate-950 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
