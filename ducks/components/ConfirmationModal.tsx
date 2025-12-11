
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  isDangerous?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", isDangerous = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 p-6 animate-fade-in transform transition-all scale-100">
        <h3 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
            {isDangerous && <AlertTriangle className="text-red-500" size={24} />}
            {title}
        </h3>
        <div className="text-gray-600 mb-6 text-sm leading-relaxed font-medium">
            {message}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition border border-gray-200"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95
              ${isDangerous ? 'bg-red-600 hover:bg-red-700 border border-red-700' : 'bg-green-600 hover:bg-green-700 border border-green-700'}
            `}
          >
            {confirmLabel}
            <Check size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
