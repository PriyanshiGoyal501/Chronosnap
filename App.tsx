import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { UploadZone } from './components/UploadZone';
import { EraSelector } from './components/EraSelector';
import { Processing } from './components/Processing';
import { ResultView } from './components/ResultView';
import { transformImage } from './services/gemini';
import { AppState, Era } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HERO);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setAppState(AppState.UPLOAD);

  const handleImageSelected = (base64: string) => {
    setUploadedImage(base64);
    setAppState(AppState.SELECT_ERA);
  };

  const handleSelectEra = async (era: Era) => {
    if (!uploadedImage) return;
    
    setSelectedEra(era);
    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      const result = await transformImage(uploadedImage, era);
      setGeneratedImage(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("The time machine malfunctioned! (API Error). Please try again.");
      setAppState(AppState.SELECT_ERA);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `chronosnap-${selectedEra?.id || 'result'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setAppState(AppState.HERO);
    setUploadedImage(null);
    setGeneratedImage(null);
    setSelectedEra(null);
    setError(null);
  };

  const handleBackToUpload = () => {
    setAppState(AppState.UPLOAD);
    setUploadedImage(null);
  };

  return (
    <div className="font-sans antialiased text-white min-h-screen">
      {appState === AppState.HERO && (
        <Hero onStart={handleStart} />
      )}

      {appState === AppState.UPLOAD && (
        <UploadZone 
          onImageSelected={handleImageSelected} 
          onBack={handleReset} 
        />
      )}

      {appState === AppState.SELECT_ERA && uploadedImage && (
        <>
          <EraSelector 
            onSelectEra={handleSelectEra} 
            onBack={handleBackToUpload}
            previewImage={uploadedImage}
          />
          {error && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-full shadow-lg z-50">
              {error}
            </div>
          )}
        </>
      )}

      {appState === AppState.PROCESSING && selectedEra && (
        <Processing era={selectedEra} />
      )}

      {appState === AppState.RESULT && uploadedImage && generatedImage && selectedEra && (
        <ResultView 
          originalImage={uploadedImage}
          generatedImage={generatedImage}
          era={selectedEra}
          onReset={handleReset}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
