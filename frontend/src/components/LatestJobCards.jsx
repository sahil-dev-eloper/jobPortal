import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (

        <div onClick={() => navigate(`/description/${job._id}`)} className='p-3 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-800'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className={'font-bold text-[#5b30a6]'} variant='ghost'>{job?.position} Positions</Badge>
                <Badge className={'font-bold text-[#F83002]'} variant='ghost'>{job?.jobType}</Badge>
                <Badge className={'font-bold'} variant='ghost'>{job?.salary} LPA</Badge>

            </div>
        </div>
    )
}

export default LatestJobCards