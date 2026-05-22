import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaCircleCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaLock,
  FaTriangleExclamation,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa6'
import { registerService } from '../../services/authService'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [imageName, setImageName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
      const registerData = new FormData()
      registerData.append('name', formData.name)
      registerData.append('email', formData.email)
      registerData.append('password', formData.password)

      if (formData.image) {
        registerData.append('image', formData.image)
      }

      await registerService(registerData)

      setMessage('Account created successfully. Redirecting to login...')
      setFormData({
        name: '',
        email: '',
        password: '',
        image: null,
      })
      setImageName('')

      setTimeout(() => {
        navigate('/login')
      }, 800)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Register failed. Please try again.'

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    setImageName(file ? file.name : '')
    setFormData((prevData) => ({
      ...prevData,
      image: file || null,
    }))
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-6">
      <section className="relative w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-white text-slate-950 shadow-2xl shadow-slate-200/80">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-cyan-100" />
        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-amber-100" />

        <div className="relative z-10 p-5 sm:p-7">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-5">
              <p className="mb-3 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-700">
                <FaUserPlus className="mr-2" />
                Register
              </p>
              <h2 className="text-3xl font-black leading-tight text-slate-950">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add your details and profile image to join the store.
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              {message && (
                <p className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  <FaCircleCheck />
                  {message}
                </p>
              )}

              {error && (
                <p className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                  <FaTriangleExclamation />
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Full name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

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
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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

              <div>
                <label htmlFor="image" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Profile image
                </label>
                <label
                  htmlFor="image"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 transition hover:border-slate-950 hover:bg-white"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-base text-white">
                    <FaImage />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-950">
                      {imageName || 'Upload your image'}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      PNG, JPG, or WEBP file
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-600 shadow-sm">
                    Browse
                  </span>
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-slate-300/70 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <FaUserPlus />
                {isSubmitting ? 'Creating...' : 'Create account'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm font-semibold text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-black text-slate-950 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register
