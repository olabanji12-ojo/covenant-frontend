import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { updateUserProfile } from '../../store/authSlice';

// A simple internal component just for this screen
const PhotoUploadSlot = ({ 
  imageUrl, 
  isLoading, 
  onClick 
}: { 
  imageUrl?: string, 
  isLoading?: boolean,
  onClick: () => void 
}) => {
  // If we have an image URL, we render a filled square
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-square rounded-[16px] overflow-hidden shadow-sm">
        <img 
          src={imageUrl} 
          alt="Uploaded Profile" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="relative w-full aspect-square rounded-[16px] bg-[#f0f0f0]/50 border-[1.5px] border-dashed border-gray-300 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#489954] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If there is no image URL, we render the empty dashed box state!
  return (
    <button 
      type="button"
      onClick={onClick}
      className="relative w-full aspect-square rounded-[16px] bg-[#f0f0f0]/50 border-[1.5px] border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
    >
      <Plus size={32} className="text-gray-500" strokeWidth={1.5} />
    </button>
  );
};

export const AddPhotosScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // Track uploaded photos and loading state
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file selection
  const handleSlotClick = () => {
    if (photos.length < 4) {
      fileInputRef.current?.click();
    }
  };

  // Upload to Cloudinary
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // We use the next available slot index for the loading state (photos.length)
    setUploadingSlot(photos.length);

    try {
      const formData = new FormData();
      formData.append('file', file);
      // Your unsigned preset name
      formData.append('upload_preset', 'church-matching');
      // Your cloud name is dbbsvb9b5
      const response = await fetch(`https://api.cloudinary.com/v1_1/dbbsvb9b5/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        setPhotos(prev => [...prev, data.secure_url]);
      } else {
        console.error('Cloudinary upload failed:', data);
        alert(`Cloudinary Error: ${data.error?.message || 'Unknown error'}. Please check if the cloud name is correct and if the upload preset "church-matching" is set to "Unsigned".`);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setUploadingSlot(null);
      // Reset input so the same file could be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleContinue = async () => {
    if (photos.length === 0) {
      // You can require at least one photo, or let them skip
      return navigate('/review-info');
    }

    setIsSaving(true);
    try {
      // Dispatch to Redux which patches backend AND updates local state
      await dispatch(updateUserProfile({ photos: photos }));
      navigate('/review-info');
    } catch (err) {
      console.error('Failed to save photos:', err);
      // Proceed anyway or show error
      navigate('/review-info');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-10 px-6">
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-5rem)]">
        
        {/* Progress Bar (Step 3 of 3) */}
        <div className="w-full flex justify-center mb-10 mt-2">
          <StepProgressIndicator totalSteps={3} currentStep={3} />
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[26px] font-bold text-gray-900 mb-3 text-center">
            Add your photos
          </h1>
          <p className="text-[15px] text-gray-500 text-center px-4 leading-snug">
            Add at least 1 photo so others can<br />get to know.
          </p>
        </div>

        {/* 2x2 Photo Grid Layout */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          {[0, 1, 2, 3].map((slotIndex) => {
            const isUploaded = slotIndex < photos.length;
            const isUploading = slotIndex === uploadingSlot;
            const imageUrl = isUploaded ? photos[slotIndex] : undefined;

            return (
              <PhotoUploadSlot 
                key={slotIndex}
                imageUrl={imageUrl} 
                isLoading={isUploading}
                onClick={handleSlotClick} 
              />
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary" onClick={handleContinue} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Continue'}
          </Button>
          
          <button onClick={() => navigate('/review-info')} className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
