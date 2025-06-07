import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                        Name Your Company
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        What would you like to call your company? You can always change this later.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company Name
                        </Label>
                        <Input
                            type="text"
                            className="mt-2 focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-1"
                            placeholder="Jobify, Microsoft, etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end items-center gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/companies')}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
