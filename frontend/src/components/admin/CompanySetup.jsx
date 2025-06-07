import { ArrowLeft, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null,
    });

    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            website: singleCompany.website || '',
            location: singleCompany.location || '',
            file: singleCompany.file || null,
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <Button
                        onClick={() => navigate('/admin/companies')}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Company Setup
                    </h1>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label className="text-sm text-gray-700 dark:text-gray-300">
                                Company Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label className="text-sm text-gray-700 dark:text-gray-300">
                                Description
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label className="text-sm text-gray-700 dark:text-gray-300">
                                Website
                            </Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label className="text-sm text-gray-700 dark:text-gray-300">
                                Location
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Label className="text-sm text-gray-700 dark:text-gray-300">
                                Company Logo
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <Button disabled className="w-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Update Company
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
