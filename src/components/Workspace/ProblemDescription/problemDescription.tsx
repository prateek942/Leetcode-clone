import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";
import { Problem, ProblemList, Users } from '@/helpers/type';
import axios from 'axios';
import { ImCheckboxUnchecked } from 'react-icons/im';


type props = {
    user: Users,
    problems: [Problem],
}

const ProblemDescription = ({ user, problems }: props) => {

    const params = useParams<any>();
    const [clickedProblems, setClickedProblems] = useState<Problem>();
    const [clickedProblemsId, setClickedProblemId] = useState<string>();
    const [like, setLike] = useState<boolean>(false);
    const [disLike, setDisLike] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);
    const [difficultyColors, setDifficultyColor] = useState([
        {
            type: 'Hard',
            textColor: 'text-red-200',
            bgColor: 'bg-red-500',
        },
        {
            type: 'Medium',
            textColor: 'text-orange-200',
            bgColor: 'bg-orange-500',
        },
        {
            type: 'Easy',
            textColor: 'text-lime-200',
            bgColor: 'bg-lime-500',
        },
    ]);

   
    // console.log(user)
    useEffect(() => {
        if (problems) {
            problems.forEach((problem: any, index) => {
                if (problem.id === params.id) {
                    setClickedProblems(problem);
                    setClickedProblemId(problem._id);
                }
            })
        }

    }, [problems])

    useEffect(() => {
        const ids = (user?.problemList ?? []).map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        if (foundIndex !== -1) {
            setLike(user.problemList[foundIndex].like);
            setDisLike(user.problemList[foundIndex].dislike)
            setFavorite(user.problemList[foundIndex].favorite);
        }

    }, [user, problems, clickedProblemsId]);




    const handelLikedproblems = async () => {

        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        console.log(foundIndex);

        // Toggle the like state
        setLike((prevLike) => !prevLike);

        try {
            const res = await axios.post('/api/handler/handelLikedproblems', {
                like: !like, // Sending the updated like state
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }

    };

    const handelDisLikedproblems = async () => {

        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        console.log(foundIndex);

        // Toggle the like state
        setDisLike((prevDisLike) => !prevDisLike);

        try {
            const res = await axios.post('/api/handler/handelDisLikedproblems', {
                disLike: !disLike, // Sending the updated like state
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }

    }

    const handelFavoritesproblems = async () => {
        const ids = user?.problemList.map((prob: any) => prob?._id);
        const foundIndex = ids.indexOf(clickedProblemsId);

        // console.log(foundIndex);

        setFavorite((prevFavorite) => !prevFavorite);

        try {
            const res = await axios.post('/api/handler/handelFavoritesproblems', {
                favorite: !favorite,
                index: foundIndex,
                user: user,
            });

            //   console.log(res.data.message); // Assuming the server responds with some data
        } catch (error) {
            console.error('Error handling liked problems:', error);
        }
    }

    const difficultyStyles: Record<string, string> = {
        Easy: 'text-emerald-400 bg-emerald-400/10 ring-emerald-400/20',
        Medium: 'text-amber-400 bg-amber-400/10 ring-amber-400/20',
        Hard: 'text-rose-400 bg-rose-400/10 ring-rose-400/20',
    };
    const userProblem = user?.problemList?.find((p: ProblemList) => p?._id === clickedProblemsId);

    return (
        <div className='flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'>
            {/* Tab bar */}
            <div className='flex h-10 shrink-0 items-center border-b border-zinc-800 bg-zinc-900 px-2'>
                <div className='flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-white'>
                    <span className='h-1.5 w-1.5 rounded-full bg-amber-400' />
                    Description
                </div>
            </div>

            <div className='flex-1 overflow-y-auto px-5 py-5'>
                <h1 className='text-xl font-semibold tracking-tight text-white'>
                    {clickedProblems?.order}. {clickedProblems?.title}
                </h1>

                {/* Meta row: difficulty, status, reactions */}
                <div className='mt-3 flex flex-wrap items-center gap-2'>
                    {clickedProblems?.difficulty && (
                        <span className={`badge ${difficultyStyles[clickedProblems.difficulty] || ''}`}>
                            {clickedProblems.difficulty}
                        </span>
                    )}
                    {userProblem && (
                        <span className={`badge ${userProblem.solved
                            ? 'text-emerald-400 bg-emerald-400/10 ring-emerald-400/20'
                            : 'text-zinc-400 bg-zinc-800 ring-zinc-700'}`}>
                            {userProblem.solved ? <><TiInputChecked size={14} className='mr-0.5' /> Solved</> : <><ImCheckboxUnchecked size={10} className='mr-1.5' /> Unsolved</>}
                        </span>
                    )}
                    <div className='ml-1 flex items-center gap-0.5'>
                        <button onClick={handelLikedproblems} className='btn-icon' title='Like'>
                            {like ? <AiFillLike size={17} className='text-sky-400' /> : <AiOutlineLike size={17} />}
                        </button>
                        <button onClick={handelDisLikedproblems} className='btn-icon' title='Dislike'>
                            {disLike ? <AiFillDislike size={17} className='text-rose-400' /> : <AiOutlineDislike size={17} />}
                        </button>
                        <button onClick={handelFavoritesproblems} className='btn-icon' title='Favorite'>
                            {favorite ? <FaStar size={15} className='text-amber-400' /> : <FaRegStar size={15} />}
                        </button>
                    </div>
                </div>

                {/* Statement (HTML content) */}
                <div
                    className='mt-5 space-y-3 text-[15px] leading-7 text-zinc-300 [&_p]:mb-3'
                    dangerouslySetInnerHTML={{ __html: clickedProblems?.problemStatement || '' }}
                />

                {/* Examples */}
                <div className='mt-6'>
                    {clickedProblems?.examples.map((examples, index) => (
                        <div key={index} className='mb-2'>
                            <p className='text-sm font-semibold text-white'>Example {examples.id + 1}</p>
                            <div className='example-card'>
                                <pre>
                                    <strong>Input: </strong> {examples.inputText}
                                    <br />
                                    <strong>Output:</strong> {examples.outputText}
                                    <br />
                                    {examples.explanation && (
                                        <>
                                            <strong>Explanation: </strong> {examples.explanation}
                                        </>
                                    )}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Constraints */}
                {clickedProblems?.constraints && (
                    <div className='mt-4 pb-6'>
                        <p className='text-sm font-semibold text-white'>Constraints</p>
                        <div
                            className='mt-3 text-sm text-zinc-300 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5'
                            dangerouslySetInnerHTML={{ __html: clickedProblems?.constraints || '' }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProblemDescription
