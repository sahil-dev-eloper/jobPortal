import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
    const { id } = useParams(); // gets job id if editing
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
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
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-full px-4 py-10">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl p-8 space-y-6"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {id ? 'Edit Job' : 'Post a New Job'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label className="text-sm">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Software Engineer"
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Job responsibilities, role overview..."
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="React, Node.js, etc."
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Salary (LPA)</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="8"
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Mumbai / Delhi / Hyderabad"
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="Full-time / Part Time"
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Experience Level (years)</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="0-2 years"
                            />
                        </div>

                        <div>
                            <Label className="text-sm">Number of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-2"
                                placeholder="3"
                            />
                        </div>

                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label className="text-sm">Select Company</Label>
                                <Select
                                    onValueChange={selectChangeHandler}
                                    value={
                                        companies.find((c) => c._id === input.companyId)?.name.toLowerCase() || ''
                                    }
                                >
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
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
                        <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
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
