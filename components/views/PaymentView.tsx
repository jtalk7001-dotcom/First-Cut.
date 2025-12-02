import React from 'react';
import { ChevronLeft, Clock } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { BookingDetails, ViewState } from '../../types';
import { CURRENCY } from '../../constants';

interface PaymentViewProps {
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  onNavigate: (view: ViewState) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ bookingDetails, onConfirm, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => onNavigate('shop')} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Payment</h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex gap-4 border-b border-slate-700 pb-4 mb-4">
          <img src={bookingDetails.shop.image} alt="Shop" className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h3 className="font-bold text-white">{bookingDetails.shop.name}</h3>
            <p className="text-sm text-slate-400">{bookingDetails.shop.address}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Time</span>
            <span className="text-amber-500 font-bold">{bookingDetails.slot}</span>
          </div>
        </div>
      </Card>

      <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
        <h3 className="text-white font-bold mb-3">Bill Details</h3>
        <div className="space-y-2 mb-4">
          {bookingDetails.services.map(s => (
            <div key={s.id} className="flex justify-between text-sm">
              <span className="text-slate-300">{s.name}</span>
              <span className="text-white font-medium">{CURRENCY}{s.price}</span>
            </div>
          ))}
          <div className="border-t border-slate-700 pt-3 mt-4 flex justify-between items-center">
            <span className="text-white font-bold">Total Payable</span>
            <span className="text-2xl font-bold text-amber-500">{CURRENCY}{bookingDetails.grandTotal}</span>
          </div>
        </div>
      </div>

      <Button onClick={onConfirm} className="w-full">
        Pay {CURRENCY}{bookingDetails.grandTotal}
      </Button>
    </div>
  );
};

export default PaymentView;