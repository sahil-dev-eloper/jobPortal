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
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-4">
            <Table className="shadow-md border rounded-md overflow-hidden border-gray-300 dark:border-gray-700">
                <TableCaption className="text-sm text-gray-500 dark:text-gray-400 my-4">
                    A list of your recently posted jobs
                </TableCaption>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Role</TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job, index) => (
                            <TableRow
                                key={job._id}
                                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} transition hover:bg-purple-50 dark:hover:bg-purple-900`}
                            >
                                <TableCell className="text-gray-900 dark:text-gray-100">{job?.company?.name}</TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">{job?.title}</TableCell>
                                <TableCell className="text-gray-900 dark:text-gray-100">{job?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="hover:text-purple-600 dark:hover:text-purple-400 transition">
                                            <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <Edit2 className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm text-gray-900 dark:text-gray-100">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <Eye className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm text-gray-900 dark:text-gray-100">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-400">
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
