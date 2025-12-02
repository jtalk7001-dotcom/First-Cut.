import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../Button';
import { Shop, ViewState } from '../../types';

interface SuccessViewProps {
  shop: Shop;
  slot: string;
  onNavigate: (view: ViewState) => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ shop, slot, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h1>
      <p className="text-slate-400 mb-8 max-w-xs mx-auto">
        Your seat at <span className="text-white font-medium">{shop.name}</span> is reserved for <span className="text-amber-500">{slot}</span>.
      </p>
      <Button variant="secondary" onClick={() => onNavigate('home')} className="w-full max-w-sm">
        Back Home
      </Button>
    </div>
  );
};

export default SuccessView;