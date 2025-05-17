import React, { useState } from "react"
import Footer from "../../components/Footer"
import PasswordInput from "../../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import { useDispatch } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice"
import axios from "axios"
import { toast } from "react-toastify"
import baseUrl from "../../config/baseUrl"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    try {
      dispatch(signInStart())

      const res = await axios.post(
        `${baseUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        dispatch(signInFailure(res.data.message))
        return
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-200 via-cyan-100 to-pink-200 relative overflow-hidden">
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4">
        {/* Background animated blobs */}
        <div className="absolute w-[20rem] h-[20rem] bg-purple-400 rounded-full opacity-30 blur-3xl top-0 left-0 animate-blob"></div>
        <div className="absolute w-[25rem] h-[25rem] bg-pink-400 rounded-full opacity-30 blur-3xl bottom-0 right-0 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 sm:p-10 animate-fade-in-up z-10">
          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2B85FF] to-[#7F00FF]">
              NotesHub
            </h1>
            <p className="text-sm text-gray-500 mt-1">Your personal notes organizer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="📧 Email Address"
              className="input-glass"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-5 bg-gradient-to-r from-[#2B85FF] to-[#7F00FF] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
              🔑 Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#2B85FF] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}

export default Login
