import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../utils/constants';
import { setAllJobs } from '../redux/jobSlice';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSinglrCompany = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // 🔑 Add auth header
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSinglrCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById
