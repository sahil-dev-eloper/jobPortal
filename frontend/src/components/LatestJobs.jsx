import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job)
    return (
        <div className="mx-auto max-w-7xl my-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                <span className="text-[#5b30a6]">Latest & Top </span>Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
                {allJobs.length <= 0 ? (
                    <span className="text-gray-700 dark:text-gray-300">Jobs Not Available</span>
                ) : (
                    allJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </div>
    )
}

export default LatestJobs
