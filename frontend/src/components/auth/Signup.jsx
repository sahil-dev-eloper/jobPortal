import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    console.log("Submitting form data:", Object.fromEntries(formData));  // ✅ Log form data to check

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        header: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      console.log("Response:", res.data); // ✅ Log response

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message); // ✅ Log exact backend error
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center mx-auto max-w-7xl'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-lg'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input type='text' value={input.fullname} name='fullname' onChange={changeEventHandler} placeholder='Type Here' />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='Type Here' />
          </div>
          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input type='text' value={input.phoneNumber} name='phoneNumber' onChange={changeEventHandler} placeholder='Type Here' />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Type Here' />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='student' checked={input.role == 'student'} onChange={changeEventHandler} className='cursor-pointer' />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='recruiter' checked={input.role == 'recruiter'} onChange={changeEventHandler} className='cursor-pointer' />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer' />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type='submit' className='w-full my-4'>Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup