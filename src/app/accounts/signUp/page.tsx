"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Header/acountNavbar'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/logo2.webp'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUpPage = () => {
  const router =  useRouter();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<boolean>(false);
  const [loding, setLoding] = useState<boolean>(false);

  
  const validPasswordChecker = (pass: string ,confPass: string)=>{
    if(pass === confPass){
      setPasswordChecker(true);
    }else{
      setPasswordChecker(false);
    }
  }

  const onSignup = async (e:any) => {
    e.preventDefault();
    setLoding(true);

    try {
        const res =  await axios.post('/api/auth/signUp', {
            username: userName,
            email: email,
            password: password,
        })
       
        if (res.status === 200) {
          toast.success(res.data.message,{
            position: "top-center",
            autoClose: 2000,
            theme: "light"
          })
          console.log(res)
          router.push('/accounts/signIn');
        }
        
    } catch (error: any) {  
        toast.error(error.response.data.error,{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        })

        //rest of the errors
        console.log(error);
    }finally {
        setLoding(false);
    }
    
}
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="flex justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <Image className="mx-auto h-10 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">Create your account</h2>
            <p className="mt-2 text-sm text-zinc-400">Start practicing problems in minutes.</p>
          </div>

          <form className="card mt-8 space-y-4 p-6" onSubmit={onSignup}>
            <div>
              <label htmlFor="UserName" className="mb-1.5 block text-sm font-medium text-zinc-300">Username</label>
              <input id="UserName" name="UserName" type="text" autoComplete="username" placeholder="johndoe" required className="input"
                onChange={(e) => {
                  setUserName(e.target.value)
                }} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }} />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-300">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" required className="input"
                minLength={8}
                onChange={(e) => {
                  setPassword(e.target.value);
                }} />
            </div>
            <div>
              <label htmlFor="Confirm_password" className="mb-1.5 block text-sm font-medium text-zinc-300">Confirm password</label>
              <input id="Confirm_password" name="Confirm_password" type="password" placeholder="Repeat password" required
                className={`input ${passwordChecker ? 'focus:ring-emerald-500/40' : 'focus:ring-rose-500/40'}`}
                onChange={(e) => {
                  validPasswordChecker(password, e.target.value);
                }} />
            </div>
            <button type="submit" disabled={loding} className="btn-primary w-full">
              {loding ? 'Processing...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/accounts/signIn" className="font-medium text-white hover:text-amber-400 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
