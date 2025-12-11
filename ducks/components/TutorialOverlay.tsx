
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CheckCircle2, Info } from 'lucide-react';

export const TutorialOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen tutorial using localStorage
    const seen = localStorage.getItem('ducks_tutorial_completed_v1');
    if (!seen) {
      // Delay slightly to allow UI/Animations to finish loading
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem('ducks_tutorial_completed_v1', 'true');
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const steps = [
    {
      title: "Welcome to DUCKS! 🦆",
      text: "You've joined the Genius Minds ecosystem. Here is a quick 3-step guide to maximizing your WLD earnings.",
      icon: <Info size={32} className="text-blue-600" />
    },
    {
      title: "1. Buy Ducks",
      text: "Scroll down to the Duck Market. Buy higher tier ducks to produce more eggs daily. The base ROI is ~35-43 days.",
      icon: <span className="text-4xl">🧺</span>
    },
    {
      title: "2. Hatch (Compound)",
      text: "Use the 'Hatch' button in the Action Center. This burns eggs to mint NEW ducks for free. Compound interest is the secret to wealth!",
      icon: <span className="text-4xl">🐣</span>
    },
    {
      title: "3. Claim WLD",
      text: "Ready to cash out? Click 'Claim WLD' to sell eggs. Remember: A 7% ecosystem tax applies to buys and claims to sustain the pool.",
      icon: <span className="text-4xl">💎</span>
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={handleClose}
      />
      
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden transform transition-all duration-300 scale-100">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 flex">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-all duration-300 ${i <= step ? 'bg-gold-500' : 'bg-transparent'}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-2"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="bg-gold-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-gold-100">
            {steps[step].icon}
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-3">
            {steps[step].title}
          </h3>
          
          <p className="text-gray-600 font-medium leading-relaxed mb-8 min-h-[5rem]">
            {steps[step].text}
          </p>

          <button 
            onClick={handleNext}
            className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            {step === steps.length - 1 ? (
              <>Let's Farm <CheckCircle2 size={20} /></>
            ) : (
              <>Next <ChevronRight size={20} /></>
            )}
          </button>
          
          <button 
            onClick={handleClose}
            className="mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest py-2"
          >
            Skip Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};
