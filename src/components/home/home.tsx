"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Plate from '@/assets/plate.png'
import { BiCodeAlt, BiCheckShield, BiTimer, BiLineChart } from 'react-icons/bi'

// Real features of this app, shown on the landing page
const features = [
    {
        icon: BiCodeAlt,
        title: 'In-browser editor',
        description: 'Write solutions in a fast, syntax-highlighted editor with a resizable workspace.',
    },
    {
        icon: BiCheckShield,
        title: 'Instant test feedback',
        description: 'Run your code against test cases and see exactly which inputs pass or fail.',
    },
    {
        icon: BiLineChart,
        title: 'Track your progress',
        description: 'Solved problems, likes and favorites are saved to your profile.',
    },
    {
        icon: BiTimer,
        title: 'Built-in timer',
        description: 'Practice under interview conditions with a timer in the workspace.',
    },
];

const Home = () => {
    return (
        <main className="relative overflow-hidden">
            {/* Subtle background glow and grid */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(245,158,11,0.12),transparent)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

            {/* Hero */}
            <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-20 pt-20 sm:px-6 md:flex-row md:pt-28">
                <div className="flex-1 text-center md:text-left">
                    <span className="badge bg-zinc-900 text-zinc-400 ring-zinc-800">Practice coding interviews</span>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        A new way to <span className="text-amber-400">learn</span> and level up.
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:mx-0 sm:text-lg">
                        LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                        <Link href="/accounts/signUp" className="btn-primary px-5 py-2.5">Create account</Link>
                        <Link href="/accounts/signIn" className="btn-secondary px-5 py-2.5">Sign in</Link>
                    </div>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-full bg-amber-500/10 blur-3xl" />
                        <Image className="w-56 rounded-3xl sm:w-72" alt="LeetCode illustration" src={Plate} priority />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Everything you need to practice</h2>
                    <p className="mt-3 text-zinc-400">
                        A focused workspace that keeps the problem, your code and the results side by side.
                    </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="card p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900">
                            <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-amber-400">
                                <Icon size={18} />
                            </div>
                            <h3 className="text-sm font-medium text-white">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quote / CTA */}
            <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
                <div className="card px-6 py-12 text-center sm:px-12">
                    <p className="mx-auto max-w-2xl text-xl font-medium tracking-tight text-white sm:text-2xl">
                        &ldquo;Code, test, and repeat. That&apos;s the way of the programmer.&rdquo;
                    </p>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400">
                        If you are passionate about tackling some of the most interesting problems around, start solving today.
                    </p>
                    <Link href="/accounts/signUp" className="btn-primary mt-8">Start solving</Link>
                </div>
            </section>
        </main>
    )
}

export default Home
