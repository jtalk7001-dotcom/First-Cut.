import React, { useState } from 'react';
import { Scissors, HelpCircle, LogOut, Search, MapPin, Star, Lock } from 'lucide-react';
import Card from '../Card';
import { Shop, User, ViewState } from '../../types';

interface HomeViewProps {
  currentUser: User | null;
  shops: Shop[];
  onShopClick: (shop: Shop) => void;
  onLogout: () => void;
  onOpenSupport: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ currentUser, shops, onShopClick, onLogout, onOpenSupport }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="bg-slate-900 pt-6 pb-2 px-6 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-3">
            <Scissors className="w-8 h-8 text-amber-500 transform -rotate-12 drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              First Cut
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenSupport}
              className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button onClick={onLogout} className="p-2 bg-slate-800 rounded-full text-red-400 hover:bg-slate-700 border border-slate-700 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
      </div>

      <div className="relative h-64 rounded-t-3xl rounded-b-3xl overflow-hidden bg-slate-800 -mt-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/1000/600?grayscale" 
          alt="Barber" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="mb-2 flex items-center gap-2">
             <span className="text-slate-300 text-sm">Welcome back,</span>
             <span className="text-white font-bold">{currentUser?.name || "Guest"}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Look Sharp,<br/> <span className="text-amber-500">Book Smart.</span></h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search area or shop name..." 
              className="w-full bg-slate-800/90 backdrop-blur-md border border-slate-600 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 shadow-xl placeholder-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-white">Nearby Shops</h2>
        </div>
        
        <div className="space-y-4">
          {shops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(shop => (
            <Card key={shop.id} className={`transition-transform ${shop.isOpen ? 'active:scale-98 cursor-pointer hover:border-slate-500' : 'opacity-75'}`}>
              <div onClick={() => onShopClick(shop)} className="flex p-3 gap-4 relative">
                {!shop.isOpen && (
                  <div className="absolute inset-0 bg-slate-900/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-red-500/90 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                       <Lock className="w-3 h-3" /> SHOP CLOSED
                    </div>
                  </div>
                )}
                <img src={shop.image} alt={shop.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-lg leading-tight">{shop.name}</h3>
                      {shop.isOpen && (
                        <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 animate-pulse">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> LIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {shop.address}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-amber-500 text-sm font-bold">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {shop.rating} <span className="text-slate-500 font-normal ml-1">({shop.reviews})</span>
                    </div>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                      {shop.distance}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;