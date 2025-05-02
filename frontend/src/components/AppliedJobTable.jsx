import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job);
    console.log("allaplliedjob", allAppliedJobs);
    return (
        <div className="p-4">
            <Table className="shadow-md border rounded-md overflow-hidden">
                <TableCaption className="text-sm text-gray-500 my-4">
                    A list of your applied jobs
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
                        <TableHead className="font-semibold text-gray-700">Company</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length > 0 ? (
                        allAppliedJobs.map((appliedJob, index) => (
                            <TableRow
                                key={appliedJob._id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-purple-50`}
                            >
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        className={`text-white ${appliedJob?.status === "rejected"
                                                ? 'bg-red-500'
                                                : appliedJob.status === 'pending'
                                                    ? 'bg-gray-500'
                                                    : 'bg-green-500'
                                            }`}
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                You haven't applied for any job yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );

}

export default AppliedJobTable