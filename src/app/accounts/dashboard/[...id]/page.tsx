'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AcountNavbar from '@/components/Header/acountNavbar'
import { IoSearch } from "react-icons/io5";
import { AiOutlineSolution } from "react-icons/ai";
import { BsYoutube, BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { Users, ProblemList } from '@/helpers/type';

// Badge styles for each difficulty level
const difficultyStyles: Record<string, string> = {
    Easy: 'text-emerald-400 bg-emerald-400/10 ring-emerald-400/20',
    Medium: 'text-amber-400 bg-amber-400/10 ring-amber-400/20',
    Hard: 'text-rose-400 bg-rose-400/10 ring-rose-400/20',
};

const DashboardPage = ({ params }: any) => {

    const router = useRouter();
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState<Users>();
    const [searchText, setSearchText] = useState('');

    const getData = async () => {
        try {
            const problemSet = await axios.get('../../api/utils/problemSets');
            setProblems(problemSet.data.data);

            const user = await axios.get('../../api/utils/verifiedUserDetails');
            setUser(user.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const filteredProblems = problems.filter((problem: any) =>
        problem.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-950">
            <AcountNavbar />

            <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-white">Problems</h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            {user ? `Welcome back, ${user.username}. ` : ''}Pick a problem and start coding.
                        </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <IoSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            id="table-search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="input pl-9"
                            placeholder="Search problems"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40">
                    <table className="w-full text-sm text-left text-zinc-400">
                        <thead className="border-b border-zinc-800 text-xs font-medium uppercase tracking-wider text-zinc-500">
                            <tr>
                                <th scope="col" className="px-5 py-3 w-16">Status</th>
                                <th scope="col" className="px-5 py-3">Title</th>
                                <th scope="col" className="px-5 py-3">Difficulty</th>
                                <th scope="col" className="px-5 py-3 hidden md:table-cell">Category</th>
                                <th scope="col" className="px-5 py-3 hidden sm:table-cell">Solution</th>
                                <th scope="col" className="px-5 py-3 hidden sm:table-cell">Video</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/70">
                            {filteredProblems.map((problem: any, index) => {
                                const userProblem = user?.problemList.find((p: ProblemList) => p._id === problem._id);
                                return (
                                    <tr key={index} className="transition-colors hover:bg-zinc-800/40">
                                        <td className="px-5 py-4">
                                            {userProblem && (userProblem.solved
                                                ? <BsCheckCircleFill size={16} className="text-emerald-400" title="Solved" />
                                                : <BsCircle size={16} className="text-zinc-600" title="Attempted" />)}
                                        </td>
                                        <th scope="row" className="px-5 py-4 font-medium text-zinc-100 whitespace-nowrap">
                                            <button
                                                className="text-left transition-colors hover:text-amber-400"
                                                onClick={() => router.push(`/accounts/problems/${problem.id}`)}
                                            >
                                                {problem.order}. {problem.title}
                                            </button>
                                        </th>
                                        <td className="px-5 py-4">
                                            <span className={`badge ${difficultyStyles[problem.difficulty] || 'text-zinc-400 bg-zinc-800 ring-zinc-700'}`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">{problem.category}</td>
                                        <td className="px-5 py-4 hidden sm:table-cell">
                                            <AiOutlineSolution size={18} className="text-sky-400" />
                                        </td>
                                        <td className="px-5 py-4 hidden sm:table-cell">
                                            <a
                                                href={`https://www.youtube.com/${problem.videoId}`}
                                                className="inline-flex text-zinc-500 transition-colors hover:text-red-500"
                                                aria-label="Video solution"
                                            >
                                                <BsYoutube size={20} />
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filteredProblems.length === 0 && (
                        <p className="py-12 text-center text-sm text-zinc-500">
                            {problems.length === 0 ? 'Loading problems...' : 'No problems match your search.'}
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default DashboardPage
