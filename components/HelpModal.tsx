import React from 'react';
import { X, HelpCircle, AlertCircle } from 'lucide-react';
import Button from './Button';
import { CUSTOMER_FAQS, OWNER_FAQS } from '../constants';
import { UserType } from '../types';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: UserType;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const faqData = type === 'owner' ? OWNER_FAQS : CUSTOMER_FAQS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 relative z-10 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {type === 'owner' ? 'Owner Help Desk' : 'Customer Support'}
            </h2>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          {faqData.map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-lg p-3 border border-slate-800">
              <p className="text-amber-500 font-medium text-sm mb-1">{item.q}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full">
          <AlertCircle className="w-4 h-4" />
          Report Issue
        </Button>
      </div>
    </div>
  );
};

export default HelpModal;