
import React, { useState } from 'react';
import { PRIMARY_RED } from '../constants';

interface Props {
  onSuccess: (lat: number, lng: number) => void;
  onSkip: () => void;
}

const LocationPromptView: React.FC<Props> = ({ onSuccess, onSkip }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSuccess(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.error(err);
        setError("PERMISSION_DENIED");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-col h-full p-8 animate-in slide-in-from-bottom duration-500">
      <div className="mt-20 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="italic-bold-headline text-3xl mb-4 text-center">Where are you?</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We need your location to show you restaurants nearby and ensure lightning-fast delivery.
        </p>

        {error === "PERMISSION_DENIED" && (
          <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 text-left mb-8">
            <h4 className="font-bold text-orange-800 mb-2">लॉकेशन चालू करें (Settings)</h4>
            <ol className="text-sm text-orange-700 space-y-2 list-decimal ml-4">
              <li>ब्राउज़र के ऊपर <b>Lock Icon</b> (या ⓘ) पर क्लिक करें।</li>
              <li><b>Location</b> को <b>Allow</b> करें।</li>
              <li>पेज को <b>Reload</b> करें।</li>
            </ol>
          </div>
        )}

        <button 
          onClick={requestLocation}
          disabled={loading}
          className="w-full py-4 rounded-[2.5rem] text-white font-bold text-lg mb-4 shadow-lg disabled:opacity-50"
          style={{ backgroundColor: PRIMARY_RED }}
        >
          {loading ? 'Fetching location...' : 'Allow GPS Access'}
        </button>
        
        <button 
          onClick={onSkip}
          className="w-full py-4 rounded-[2.5rem] border-2 border-gray-200 text-gray-500 font-bold"
        >
          Enter Address Manually
        </button>
      </div>
    </div>
  );
};

export default LocationPromptView;
