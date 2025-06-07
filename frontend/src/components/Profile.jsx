import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialogue from './UpdateProfileDialogue';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-[#6A38C2]">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{user?.fullname}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600"
            onClick={() => setOpen(true)}
            variant="outline"
          >
            <Pen size={16} />
            Edit Profile
          </Button>
        </div>

        <div className="my-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300">
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300">
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 bg-[#F0EBFF] dark:bg-[#4c3a8f] text-[#6A38C2] dark:text-[#d6cfff] rounded-full text-sm font-medium"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="my-6">
          <Label className="text-md font-bold text-gray-800 dark:text-gray-200">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">NA</span>
          )}

          {/* Resume Template Dropdown */}
          <div className="mt-4">
            <Label className="text-md font-bold text-gray-800 dark:text-gray-200">
              Customize your resume template
            </Label>
            <select
              onChange={(e) => {
                const selectedLink = e.target.value;
                if (selectedLink) {
                  // Open the Canva template link in a new tab
                  window.open(selectedLink, "_blank");
                }
              }}
              defaultValue=""
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            >
              <option value="" disabled>
                Select a template type
              </option>
              <option value="https://www.canva.com/templates/EAFszEvkM50-simple-professional-cv-resume/">Type-1</option>
              <option value="https://www.canva.com/templates/EAFzfwx_Qik-blue-simple-professional-cv-resume/">Type-2</option>
              <option value="https://www.canva.com/templates/EAE_DDFQHWM-black-and-yellow-modern-marketing-manager-acting-resume/">Type-3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-10">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
