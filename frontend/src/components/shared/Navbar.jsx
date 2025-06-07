import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constants';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-white text-black dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-4'>
                    <Link to='/'>
                        <h1 className='text-2xl font-bold'>
                            Job<span className='text-[#F83002]'>ify</span>
                        </h1>
                    </Link>
                </div>

                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    {/* Theme Toggle Button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleTheme}
                                        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                    </Button>
                                </li>
                                <li>
                                    <Link to="/admin/companies">
                                        <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white dark:border-gray-600 dark:hover:bg-[#6A38C2] dark:text-white">
                                            Companies
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs">
                                        <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white dark:border-gray-600 dark:hover:bg-[#6A38C2] dark:text-white">
                                            Jobs
                                        </Button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    {/* Theme Toggle Button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleTheme}
                                        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                    </Button>
                                </li>
                                <li>
                                    <Link to="/">
                                        <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white dark:border-gray-600 dark:hover:bg-[#6A38C2] dark:text-white">
                                            Home
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs">
                                        <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white dark:border-gray-600 dark:hover:bg-[#6A38C2] dark:text-white">
                                            Jobs
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse">
                                        <Button variant="outline" className="hover:bg-[#6A38C2] hover:text-white dark:border-gray-600 dark:hover:bg-[#6A38C2] dark:text-white">
                                            Browse
                                        </Button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to='/login'>
                                <Button variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                                    Login
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6] dark:bg-[#6A38C2] dark:hover:bg-[#5b30a6]">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                    <AvatarFallback>{user?.fullname?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 rounded-xl shadow-lg border border-gray-200 p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center gap-4 border-b pb-4 mb-3 border-gray-200 dark:border-gray-600">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200">
                                    {user?.role === 'student' && (
                                        <Link to="/profile">
                                            <Button
                                                variant="ghost"
                                                className="w-full flex justify-start items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-lg"
                                            >
                                                <User2 size={18} />
                                                View Profile
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        onClick={logoutHandler}
                                        variant="ghost"
                                        className="w-full flex justify-start items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400 transition rounded-lg"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
