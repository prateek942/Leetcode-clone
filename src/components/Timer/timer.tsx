import React, { useEffect, useState } from 'react'
import { MdAlarm } from 'react-icons/md';
import { RiTimerFlashLine } from "react-icons/ri";

const Timer = () => {
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    // Format timer into : hh:mm:ss format
	const formatTime = (time: number): string => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds }`;
	};

    useEffect(() => {
		let intervalId: NodeJS.Timeout;

        // increment the interval every second
		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer]);

    return (
        <div>
            {showTimer ? (
                <button
                    className='inline-flex h-8 items-center gap-2 rounded-md bg-zinc-800/70 px-2.5 font-mono text-sm text-amber-400 transition-colors hover:bg-zinc-800'
                    title='Reset timer'
                    onClick={() => {
                        setShowTimer(false);
                        setTime(0);
                    }}
                >
                    {formatTime(time)}
                    <RiTimerFlashLine size={16} />
                </button>
            ) : (
                <button className='btn-icon' title='Start timer' onClick={() => setShowTimer(true)}>
                    <MdAlarm size={17} />
                </button>
            )}
        </div>
    )
}

export default Timer;
