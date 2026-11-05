import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="border-t border-zinc-800/80 bg-zinc-950">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
                <p className="text-sm text-zinc-500">
                    © 2025 LeetCode Clone · Built by
                    <a href="https://twitter.com/" className="ml-1 text-zinc-300 transition-colors hover:text-white" rel="noopener noreferrer" target="_blank">Prateek Kumar Pandey</a>
                </p>
                <div className="flex items-center gap-1">
                    <a href="https://github.com/" className="btn-icon" rel="noopener noreferrer" target="_blank" aria-label="GitHub">
                        <BsGithub size={16} />
                    </a>
                    <a href="https://www.linkedin.com/" className="btn-icon" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn">
                        <BsLinkedin size={16} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
