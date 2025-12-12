import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Camera, X } from 'lucide-react';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
  onBack: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you have granted permission.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  // Attach stream to video element once the view is rendered
  useEffect(() => {
    if (isCameraOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOpen, stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Draw the video frame to the canvas
        // Mirror the image to match the user-facing camera preview experience
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        onImageSelected(dataUrl);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-deep-space relative">
      <button 
        onClick={isCameraOpen ? stopCamera : onBack}
        className="absolute top-8 left-8 text-gray-400 hover:text-white font-sans z-50 flex items-center gap-2"
      >
        {isCameraOpen ? <X className="w-6 h-6" /> : "← Back"}
        {isCameraOpen && "Close Camera"}
      </button>

      <div className="w-full max-w-2xl transition-all duration-500">
        <h2 className="text-3xl font-serif text-white text-center mb-8">
          {isCameraOpen ? "Strike a Pose" : "Upload Your Portrait"}
        </h2>

        {isCameraOpen ? (
          // Camera View
          <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="relative rounded-3xl overflow-hidden border-2 border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-black aspect-video w-full max-w-lg">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover transform scale-x-[-1]" 
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <button
              onClick={capturePhoto}
              className="mt-8 group relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-transparent hover:bg-white/10 transition-all active:scale-95"
              aria-label="Take Photo"
            >
              <div className="w-16 h-16 rounded-full bg-white group-hover:scale-90 transition-transform"></div>
            </button>
            
            <p className="mt-4 text-gray-400 font-sans text-sm">Make sure your face is clearly visible</p>
          </div>
        ) : (
          // Upload View
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative flex flex-col items-center justify-center w-full h-80
                border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300
                ${isDragging 
                  ? 'border-neon-blue bg-neon-blue/10 scale-102' 
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'}
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-8">
                <div className={`p-4 rounded-full bg-white/10 mb-4 transition-transform ${isDragging ? 'scale-110' : ''}`}>
                  {isDragging ? <Upload className="w-10 h-10 text-neon-blue" /> : <ImageIcon className="w-10 h-10 text-gray-300" />}
                </div>
                <p className="mb-2 text-xl font-sans text-gray-300">
                  <span className="font-bold text-white">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500 font-sans">
                  JPEG, PNG or WEBP
                </p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>

            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-white/20 w-1/4"></div>
              <span className="mx-4 text-gray-500 font-sans text-sm uppercase tracking-wider">Or</span>
              <div className="h-px bg-white/20 w-1/4"></div>
            </div>

            <button
              onClick={startCamera}
              className="w-full py-4 bg-neon-blue/10 border border-neon-blue/50 hover:bg-neon-blue/20 hover:border-neon-blue text-neon-blue rounded-xl font-bold font-sans flex items-center justify-center gap-3 transition-all duration-300 group"
            >
              <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
              OPEN CAMERA
            </button>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {['Clear Lighting', 'Front Facing', 'Single Person'].map((tip, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 text-sm text-gray-400 font-sans border border-white/5">
                        ✓ {tip}
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};