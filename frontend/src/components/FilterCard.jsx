import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filtertype: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Mumbai", "Pune"]
    },
    {
        filtertype: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-5 rounded-md shadow'>
            <h1 className='font-bold text-xl'>Filter Jobs</h1>
            <hr className='mt-3 border-gray-300 dark:border-gray-700' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='mt-4'>
                        <h1 className='font-bold text-lg mb-2'>{data.filtertype}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div
                                    key={itemId}
                                    className='flex items-center space-x-2 my-2'
                                >
                                    <RadioGroupItem
                                        value={item}
                                        id={itemId}
                                        className='border-gray-300 dark:border-gray-600'
                                    />
                                    <Label
                                        htmlFor={itemId}
                                        className='cursor-pointer text-gray-700 dark:text-gray-300'
                                    >
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
