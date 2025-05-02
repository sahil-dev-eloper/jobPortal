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
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {item?.applicant?.createdAt?.split('T')[0]}
                            </TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36">
                                        {shortlistingStatus.map(({ label, value, icon }, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(value, item?._id)}
                                                className="flex items-center gap-2 w-fit cursor-pointer text-sm hover:text-[#5b30a6]"
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
