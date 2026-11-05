import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo2.webp'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

// Shared top bar for account pages (sign in, sign up, profile, problem list).
// `colour` and `hoverColour` props are still accepted for backwards compatibility but no longer needed.
const AccountNavbar = (_props: any) => {
    return (
        <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <Image src={Logo} alt="LeetCode logo" className="h-6 w-6" />
                    <span className="text-sm font-semibold tracking-tight text-white">LeetCode</span>
                </Link>
                <nav className="flex items-center gap-1">
                    <Link href="/accounts/dashboard" className="nav-link inline-flex items-center gap-2">
                        <CgProfile size={16} />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default AccountNavbar
