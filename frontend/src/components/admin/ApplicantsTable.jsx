import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover';
import { MoreHorizontal, Check, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APP_API_END_POINT } from '@/utils/constants';
import axios from 'axios';

const shortlistingStatus = [
    {
        label: 'Accept',
        value: 'Accepted',
        icon: <Check className="w-4 h-4 text-green-600" />,
    },
    {
        label: 'Reject',
        value: 'Rejected',
        icon: <X className="w-4 h-4 text-red-500" />,
    },
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(
                `${APP_API_END_POINT}/status/${id}/update`,
                { status }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md p-4 shadow-md">
            <Table>
                <TableCaption className="text-gray-600 dark:text-gray-300">
                    A list of your recent applied users
                </TableCaption>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    <TableRow>
                        <TableHead className="text-gray-700 dark:text-gray-200">FullName</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Email</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Contact</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Resume</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-200">Date</TableHead>
                        <TableHead className="text-right text-gray-700 dark:text-gray-200">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map(item => (
                        <TableRow
                            key={item._id}
                            className="hover:bg-purple-50 dark:hover:bg-purple-900 transition"
                        >
                            <TableCell className="text-gray-900 dark:text-gray-100">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100">{item?.applicant?.email}</TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 dark:text-blue-400 underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-600 dark:text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100">
                                {item?.applicant?.createdAt?.split('T')[0]}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger className="hover:text-purple-600 dark:hover:text-purple-400 transition">
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 bg-white dark:bg-gray-800 shadow-lg rounded-md border dark:border-gray-700">
                                        {shortlistingStatus.map(({ label, value, icon }, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(value, item?._id)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {icon}
                                                <span>{label}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
