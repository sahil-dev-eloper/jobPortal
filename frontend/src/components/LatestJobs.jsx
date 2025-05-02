import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store => store.job);
    return (
        <div className='mx-auto max-w-7xl my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#5b30a6]'>Latest & Top </span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-3 my-5'>
                {
                    allJobs.length <= 0 ? <span>Jobs Not Available</span> : allJobs.map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs