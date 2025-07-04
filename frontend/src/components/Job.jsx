import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Share2 } from 'lucide-react';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Share2 className="text-gray-600 dark:text-gray-300" />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt="Company Logo" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-xl text-gray-900 dark:text-gray-100">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-xl my-2 text-gray-900 dark:text-gray-100">{job?.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-3">
                <Badge className="font-bold text-[#5b30a6]" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="font-bold text-[#F83002]" variant="ghost">{job?.jobType}</Badge>
                <Badge className="font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Button
                    className="bg-[#6A38C2] w-full text-white hover:bg-[#7f4dd9] transition"
                    onClick={() => navigate(`/description/${job?._id}`)}
                >
                    Tap for Details
                </Button>
            </div>
        </div>
    )
}

export default Job
