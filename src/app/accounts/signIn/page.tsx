"use client"
import React, { useEffect, useState } from 'react'
import Logo from '@/assets/logo2.webp'
import Navbar from '@/components/Header/acountNavbar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSignin = async (e: any) => {
    e.preventDefault();

    try {
      
      setLoading(true);
      const res = await axios.post("/api/auth/signIn",{
        email: email,
        password: password
      })

      if (res.status === 200) {
        toast.success("Successfully logged in",{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        });
        router.push(`/accounts/dashboard/${res.data.data}`);
      }


    } catch (error:any) {
      toast.error(error.response.data.error,{
        position: "top-center",
        autoClose: 2000,
        theme: "light"
      })
       
      // console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="flex justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <Image className="mx-auto h-10 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-zinc-400">Sign in to continue solving problems.</p>
          </div>

          <form className="card mt-8 space-y-4 p-6" onSubmit={onSignin}>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }} />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-300">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required className="input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link href="/accounts/signUp" className="font-medium text-white hover:text-amber-400 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
