'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import Navbar from "@/components/Header/acountNavbar"
import { toast } from 'react-toastify';
import { Users } from '@/helpers/type';


const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const res = await axios.get('/api/utils/verifiedUserDetails');
      setUser(res.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, [])

  const handelSignOut = async ()=>{
    try {
      const res = await axios.get('/api/auth/signOut');
      if (res.status==200) {
        toast.success("Successfully logged Out",{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        });
      }
      router.push('/accounts/signIn');
      
    } catch (error) {
      
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Solved', value: user?.totalSolved },
    { label: 'Likes', value: user?.totalLikes },
    { label: 'Dislikes', value: user?.totalDisLikes },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="card overflow-hidden">
          <div className="h-24 border-b border-zinc-800 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.15),transparent_60%)]" />
          <div className="px-6 pb-8 sm:px-8">
            <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-400 shadow-xl">
                  <CgProfile size={44} />
                </div>
                <div className="pb-1">
                  <h1 className="text-xl font-semibold tracking-tight text-white">{user?.username}</h1>
                  <p className="text-sm text-zinc-400">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn-primary"
                  onClick={() => {
                    router.push(`/accounts/dashboard/${user?._id}`);
                  }}
                >
                  View problems
                </button>
                <button className="btn-secondary" onClick={handelSignOut}>
                  Sign out
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{stat.value?.toString() ?? '0'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


export default Page
