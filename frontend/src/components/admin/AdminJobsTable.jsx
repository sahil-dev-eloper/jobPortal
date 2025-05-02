import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="p-4">
            <Table className="shadow-md border rounded-md overflow-hidden">
                <TableCaption className="text-sm text-gray-500 my-4">
                    A list of your recently posted jobs
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Role</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job, index) => (
                            <TableRow
                                key={job._id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-purple-50`}
                            >
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="hover:text-purple-600 transition">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                            >
                                                <Edit2 className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                            >
                                                <Eye className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No jobs found matching the criteria.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );

}

export default AdminJobsTable