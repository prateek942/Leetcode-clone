import React, { useEffect, useState } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';

const PlaygroundNavbar = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        function exitHandler(e: any) {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }
    }, [isFullScreen]);

    return (
        <div className='flex h-10 w-full shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-2'>
            <div className='flex items-center gap-2 px-2 text-sm font-medium text-white'>
                <span className='text-amber-400 font-mono text-xs'>{'</>'}</span>
                Code
                <span className='badge ml-1 bg-zinc-800 text-zinc-300 ring-zinc-700'>Python</span>
            </div>

            <button className='btn-icon' onClick={handleFullScreen} title={isFullScreen ? 'Exit full screen' : 'Full screen'}>
                {!isFullScreen ? <AiOutlineFullscreen size={16} /> : <AiOutlineFullscreenExit size={16} />}
            </button>
        </div>
    );
}

export default PlaygroundNavbar
