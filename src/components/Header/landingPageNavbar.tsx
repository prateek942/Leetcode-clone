import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/assets/logo.png'

const Navbar = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <Image src={Logo} className="h-7 w-7" alt="LeetCode logo" />
                    <span className="text-sm font-semibold tracking-tight text-white">LeetCode</span>
                </Link>
                <nav className="flex items-center gap-2">
                    <Link href="/accounts/signIn" className="nav-link">Sign in</Link>
                    <Link href="/accounts/signUp" className="btn-primary py-1.5">Get started</Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
