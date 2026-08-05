import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { updateUserProfile } from '../../store/authSlice';

export const EditProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  
  // State for form fields
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [dob, setDob] = useState(user?.dob ? user.dob.split('T')[0] : '');
  const [intention, setIntention] = useState(user?.intention || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [churchAssembly, setChurchAssembly] = useState(user?.church_assembly || '');
  const [partnerPrefText, setPartnerPrefText] = useState(user?.partner_pref_text || '');
  const [photo, setPhoto] = useState(user?.photos?.[0] || '/male1.png');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'church-matching'); 
    formData.append('cloud_name', 'dbbsvb9b5');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dbbsvb9b5/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setPhoto(data.secure_url);
        // Automatically save the photo update to the backend
        await dispatch(updateUserProfile({ photos: [data.secure_url] }));
      } else {
        console.error('Cloudinary upload failed:', data);
        alert(`Cloudinary Error: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Send the update to the backend. The backend dynamically updates these fields.
      const isoDob = new Date(dob).toISOString();
      await dispatch(updateUserProfile({
        first_name: firstName,
        last_name: lastName,
        dob: isoDob,
        intention: intention,
        bio: bio,
        church_assembly: churchAssembly,
        partner_pref_text: partnerPrefText,
      }));
      navigate(-1); // Go back to profile screen
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to save profile details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm md:max-w-2xl mx-auto relative overflow-hidden md:pb-6 md:bg-white md:shadow-sm md:border-x border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 bg-[#f7f5f0] md:bg-white z-10 sticky top-0 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-[#1a3322]">Edit Profile</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-28 pt-6">
        
        {/* Photo Upload Area */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-28 h-28">
            <img 
              src={photo} 
              alt="Profile" 
              className={`w-full h-full rounded-full object-cover shadow-sm bg-white ${isLoading ? 'opacity-50' : ''}`}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-white w-8 h-8" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-[#2a8b75] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#1a3322] transition-colors">
              <Camera size={18} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isLoading}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-3">Tap to change profile picture</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">First Name</label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors"
              placeholder="Your first name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">Last Name</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors"
              placeholder="Your last name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">Date of Birth</label>
            <input 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors"
            />
            <p className="text-xs text-gray-500 font-medium mt-0.5 ml-1">We use this to find matches your age</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">Specific Church / Ministry Assembly</label>
            <input 
              type="text" 
              value={churchAssembly}
              onChange={(e) => setChurchAssembly(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors"
              placeholder="e.g. Winners Chapel Canaanland, RCCG City of David, MFM"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">Biography (Bio)</label>
            <textarea 
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors resize-none"
              placeholder="Tell others about your faith, interests, and background..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">Describe Your Ideal Partner</label>
            <textarea 
              rows={3}
              value={partnerPrefText}
              onChange={(e) => setPartnerPrefText(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors resize-none"
              placeholder="Qualities, faith commitment, or background you seek in a partner..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a3322]">I'm looking for...</label>
            <select
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-[#2a8b75] transition-colors appearance-none"
            >
              <option value="Marriage">Marriage</option>
              <option value="Serious Relationship">Serious Relationship</option>
              <option value="Friendship / Fellowship">Friendship / Fellowship</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-[#1a3322] text-white font-bold text-[16px] rounded-full py-4 mt-8 hover:bg-[#2a8b75] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
    </div>
  );
};
