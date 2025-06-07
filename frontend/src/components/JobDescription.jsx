import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APP_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Users,
  FileText,
  Clock,
  DollarSign
} from 'lucide-react';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APP_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true
      });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-black/40 rounded-2xl p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 transition-all">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1a1a1a] dark:text-gray-100 tracking-tight mb-2">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="font-bold text-[#5b30a6] bg-[#f3ebff] border-[#5b30a6] dark:bg-[#3e2a62] dark:border-[#5b30a6]" variant="outline">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="font-bold text-[#F83002] bg-[#ffe9e5] border-[#F83002] dark:bg-[#5a1e11] dark:border-[#F83002]" variant="outline">
              {singleJob?.jobType}
            </Badge>
            <Badge className="font-bold bg-[#f0f0f0] text-[#1a1a1a] dark:bg-gray-700 dark:text-gray-200" variant="outline">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-6 sm:mt-0 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${isApplied
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-[#6A38C2] hover:brightness-110'
            }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-black/40 p-8">
        <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-4 mb-6">
          Job Overview
        </h2>
        <div className="space-y-5 text-[16px] text-gray-800 dark:text-gray-300">
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Role:</span> {singleJob?.title}
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Location:</span> {singleJob?.location}
          </div>
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-3 text-[#6A38C2] mt-1" />
            <div>
              <h1 className="font-bold">Description: <span className='font-normal'>{singleJob?.description}</span></h1>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Experience:</span> {singleJob?.experience}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Salary:</span> {singleJob?.salary} LPA
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Total Applicants:</span> {singleJob?.applications?.length}
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-3 text-[#6A38C2]" />
            <span className="font-bold mr-2">Posted Date:</span>{' '}
            {singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
