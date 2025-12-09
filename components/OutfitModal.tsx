import React, { useEffect } from 'react';
import { X, Sparkles, Shirt } from 'lucide-react';

interface OutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: string;
  loading: boolean;
}

const OutfitModal: React.FC<OutfitModalProps> = ({ isOpen, onClose, suggestion, loading }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <div className="flex justify-center mb-3">
             <div className="bg-white/20 p-3 rounded-full">
               <Shirt size={32} className="text-white" />
             </div>
          </div>
          <h3 className="text-2xl font-bold">Outfit Suggestion</h3>
          <p className="text-blue-100 text-sm mt-1">AI-Powered Fashion Advice</p>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-slate-500 text-sm animate-pulse">Analyzing weather patterns...</p>
            </div>
          ) : (
            <div className="prose prose-slate">
              <div className="flex items-start gap-3">
                <Sparkles className="text-amber-400 shrink-0 mt-1" size={20} />
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  {suggestion}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-100 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default OutfitModal;
