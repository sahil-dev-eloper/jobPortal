import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import { JOB_API_END_POINT } from '@/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                try {
                    const res = await axios.get(`${JOB_API_END_POINT}/${id}`, { withCredentials: true });
                    const job = res.data.job;
                    setInput({
                        title: job.title || '',
                        description: job.description || '',
                        requirements: job.requirements || '',
                        salary: job.salary || '',
                        location: job.location || '',
                        jobType: job.jobType || '',
                        experience: job.experience || '',
                        position: job.position || 0,
                        companyId: job.company?._id || ''
                    });
                } catch (err) {
                    toast.error("Failed to load job data");
                    console.error(err);
                }
            };

            fetchJob();
        }
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company before submitting!");
            return;
        }

        setLoading(true);

        try {
            const url = id ? `${JOB_API_END_POINT}/update/${id}` : `${JOB_API_END_POINT}/post`;
            const method = id ? 'put' : 'post';

            const res = await axios[method](url, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.error("Job submit error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 transition-colors duration-300">
            <Navbar />
            <div className="flex items-center justify-center px-4 py-10">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-4xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-md rounded-xl p-8 space-y-6"
                >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {id ? 'Edit Job' : 'Post a New Job'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'title', placeholder: 'Software Engineer' },
                            { name: 'description', placeholder: 'Job role overview' },
                            { name: 'requirements', placeholder: 'React, Node.js, etc.' },
                            { name: 'salary', placeholder: '8' },
                            { name: 'location', placeholder: 'Mumbai / Delhi' },
                            { name: 'jobType', placeholder: 'Full-time / Part-time' },
                            { name: 'experience', placeholder: '0-2 years' },
                            { name: 'position', placeholder: '3', type: 'number' }
                        ].map((field, i) => (
                            <div key={i}>
                                <Label className="text-sm dark:text-gray-300 capitalize">
                                    {field.name}
                                </Label>
                                <Input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className="mt-2 dark:bg-zinc-700 dark:text-white dark:border-zinc-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label className="text-sm dark:text-gray-300">Select Company</Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    value={
                                        companies.find((c) => c._id === input.companyId)?.name.toLowerCase() || ''
                                    }
                                >
                                    <SelectTrigger className="mt-2 dark:bg-zinc-700 dark:text-white dark:border-zinc-600">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-zinc-800 dark:text-white">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company.name.toLowerCase()}
                                                    className="dark:hover:bg-zinc-700"
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button disabled className="w-full">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                        >
                            {id ? 'Update Job' : 'Post New Job'}
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-semibold text-center mt-4">
                            * Please register a company first before posting jobs.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
