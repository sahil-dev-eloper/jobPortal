import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APP_API_END_POINT } from '@/utils/constants';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APP_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-6'>
                <h1 className='font-bold text-xl my-5 text-gray-900 dark:text-gray-100'>
                    Applicants {applicants?.applications?.length}
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
