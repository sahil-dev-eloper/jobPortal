import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fullText = "Find the right job for your future. Apply confidently and grow your career with us.";
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < fullText.length) {
                    setDisplayedText(prev => prev + fullText.charAt(charIndex));
                    setCharIndex(charIndex + 1);
                } else {
                    setIsDeleting(true);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayedText(prev => prev.slice(0, -1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                }
            }
        }, 30);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting]);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-white dark:bg-gray-900 py-10'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full font-bold font-medium
                    bg-gray-100 text-[#F83002]
                    dark:bg-gray-700 dark:text-[#F8706B] 
                    animated-tagline
                '>
                    No.1 Job hunting website
                </span>
                <h1 className='text-5xl font-bold text-gray-900 dark:text-white'>
                    Search, Apply & <br />
                    Get your <span className='text-[#5b30a6] dark:text-[#a17eff]'>Dream Jobs</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 h-6 min-h-[1.5rem]">{displayedText}&nbsp;</p>

                <div className='flex pl-3 items-center mx-auto shadow-lg border w-[90%] sm:w-[60%] md:w-[40%] rounded-full
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800
                    '>
                    <input
                        type="text"
                        placeholder='Find your dream jobs here'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none w-full px-3 py-2 border-none rounded-l-full
                            bg-transparent
                            text-gray-900 dark:text-gray-100
                            placeholder-gray-500 dark:placeholder-gray-400
                        '
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#5b30a6] hover:bg-[#482a9a]">
                        <Search className="text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
