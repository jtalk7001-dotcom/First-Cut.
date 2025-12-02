import React from 'react';
import { ChevronLeft, MapPin, CheckCircle } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { Shop, Service, ViewState } from '../../types';
import { CURRENCY, SERVICES_LIST, TIME_SLOTS } from '../../constants';

interface ShopDetailViewProps {
  shop: Shop;
  selectedServices: Service[];
  selectedSlot: string | null;
  onToggleService: (service: Service) => void;
  onSelectSlot: (slot: string) => void;
  onBooking: () => void;
  onNavigate: (view: ViewState) => void;
}

const ShopDetailView: React.FC<ShopDetailViewProps> = ({ 
  shop, 
  selectedServices, 
  selectedSlot, 
  onToggleService, 
  onSelectSlot, 
  onBooking, 
  onNavigate 
}) => {
  
  const calculateSubtotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  return (
    <div className="pb-24 animate-fade-in">
      <div className="relative h-56">
        <img src={shop.image} alt="Shop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <button onClick={() => onNavigate('home')} className="absolute top-4 left-4 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm hover:bg-black/70 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <Card className="bg-slate-900 p-5 shadow-xl border-none">
          <h1 className="text-2xl font-bold text-white">{shop.name}</h1>
          <div className="flex items-center text-slate-400 mt-2">
            <MapPin className="w-4 h-4 mr-1 text-amber-500" />
            {shop.address}
          </div>
        </Card>

        <div className="mt-8">
          <h3 className="text-white font-bold mb-3">Select Services</h3>
          <div className="space-y-3">
            {SERVICES_LIST.map(service => {
              const isSelected = selectedServices.find(s => s.id === service.id);
              return (
                <div 
                  key={service.id}
                  onClick={() => onToggleService(service)}
                  className={`p-4 rounded-xl flex justify-between items-center cursor-pointer border transition-all ${isSelected ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-500'}`}>
                      {isSelected && <CheckCircle className="w-3 h-3 text-black" />}
                    </div>
                    <div>
                      <h4 className={`font-medium ${isSelected ? 'text-amber-500' : 'text-white'}`}>{service.name}</h4>
                      <p className="text-xs text-slate-400">{service.duration} mins</p>
                    </div>
                  </div>
                  <span className="text-white font-bold">{CURRENCY}{service.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white font-bold mb-3">Available Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(slot => {
              const isBooked = shop.bookedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => onSelectSlot(slot)}
                  className={`
                    py-2 rounded-lg text-sm font-medium transition-all border
                    ${isBooked 
                      ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed decoration-slate-600 line-through' 
                      : selectedSlot === slot 
                        ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }
                  `}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-xs">Total Cost</p>
            <p className="text-white text-xl font-bold">{CURRENCY}{calculateSubtotal()}</p>
          </div>
          <Button 
            className="flex-1" 
            disabled={selectedServices.length === 0 || !selectedSlot}
            onClick={onBooking}
          >
            Review & Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailView;