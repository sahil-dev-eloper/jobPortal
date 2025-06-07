import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  userGetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [user, navigate])  // added dependencies

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
