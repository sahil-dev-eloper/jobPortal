import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className="p-4">
            <Table className="shadow-md border rounded-md overflow-hidden">
                <TableCaption className="text-sm text-gray-500 my-4">
                    A list of your recently registered companies
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">Logo</TableHead>
                        <TableHead className="font-semibold text-gray-700">Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length > 0 ? (
                        filterCompany.map((company, index) => (
                            <TableRow
                                key={company._id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition hover:bg-purple-50`}
                            >
                                <TableCell>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt?.split('T')[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="hover:text-purple-600 transition">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                            >
                                                <Edit2 className="w-4 h-4 text-purple-600" />
                                                <span className="text-sm">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No companies found matching the criteria.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );

}

export default CompaniesTable