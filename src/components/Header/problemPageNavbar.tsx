import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/assets/logo2.webp'
import { FaChevronLeft, FaChevronRight, FaUserAlt } from 'react-icons/fa'
import { PiSignOutBold } from "react-icons/pi";
import Timer from "@/components/Timer/timer";
import { Problem } from '@/helpers/type';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

type props = {
    problems: [Problem]
}

const ProblemPageNavbar = ({ problems }: props) => {
    const router = useRouter();
    const {id} = useParams();
    
    const handleProblemChange = (isForward: boolean) => {
        const direction = isForward ? 1 : -1;
        const problemIds = problems.map((problem: any) => problem.id);
        const index = problemIds.indexOf(id as string);
    
        if (index !== -1) {
            if (direction === 1 && index < problemIds.length - 1) {
                router.push(`./${problemIds[index + 1]}`);
            } else if (direction === -1 && index > 0) {
                router.push(`./${problemIds[index - 1]}`);
            } else if (direction === 1) {
                router.push(`./${problemIds[0]}`);
            } else if (direction === -1) {
                router.push(`./${problemIds[problemIds.length - 1]}`);
            }
        }
        // Handle the case when index === -1 if needed
    };
    
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


    return (
        <header className='flex h-12 items-center justify-between gap-2 px-3 sm:px-4'>
            <Link href='/accounts/dashboard' className='flex items-center gap-2'>
                <Image src={Logo} alt='LeetCode logo' className='h-6 w-6' />
            </Link>

            {/* Previous / next problem */}
            <div className='flex items-center gap-1'>
                <button className='btn-icon' onClick={() => handleProblemChange(false)} title='Previous problem'>
                    <FaChevronLeft size={12} />
                </button>
                <span className='px-2 text-sm font-medium text-zinc-300'>Problems</span>
                <button className='btn-icon' onClick={() => handleProblemChange(true)} title='Next problem'>
                    <FaChevronRight size={12} />
                </button>
            </div>

            <div className='flex items-center gap-1'>
                <Timer />
                <button className='btn-icon' onClick={() => router.push('../../accounts/dashboard')} title='Profile'>
                    <FaUserAlt size={14} />
                </button>
                <button className='btn-icon' onClick={handelSignOut} title='Sign out'>
                    <PiSignOutBold size={16} />
                </button>
            </div>
        </header>
    )
}

export default ProblemPageNavbar
