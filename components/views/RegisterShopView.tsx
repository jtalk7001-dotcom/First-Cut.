import React, { useState } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { ViewState } from '../../types';

interface RegisterShopViewProps {
  onRegister: (data: any) => void;
  onNavigate: (view: ViewState) => void;
}

const RegisterShopView: React.FC<RegisterShopViewProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    address: '',
    mobile: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    if(!formData.shopName || !formData.mobile || !formData.password) {
      alert("Please fill required fields");
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col animate-fade-in">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button onClick={() => onNavigate('login')} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-white">Partner Registration</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        <Card className="p-6 space-y-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto flex items-center justify-center mb-3 border-2 border-dashed border-slate-500 cursor-pointer hover:border-amber-500 hover:text-amber-500 transition-colors group">
              <Camera className="w-8 h-8 text-slate-400 group-hover:text-amber-500" />
            </div>
            <p className="text-xs text-slate-400">Upload Shop Logo</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase font-bold ml-1 mb-1 block">Shop Details</label>
              <div className="space-y-3">
                 <input name="shopName" onChange={handleChange} placeholder="Shop Name *" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
                 <input name="address" onChange={handleChange} placeholder="Full Address *" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase font-bold ml-1 mb-1 block">Owner Details</label>
              <div className="space-y-3">
                 <input name="ownerName" onChange={handleChange} placeholder="Owner Name" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
                 <input name="mobile" onChange={handleChange} type="tel" placeholder="Mobile Number *" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
                 <input name="email" onChange={handleChange} type="email" placeholder="Email ID" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase font-bold ml-1 mb-1 block">Security</label>
              <input name="password" onChange={handleChange} type="password" placeholder="Create Password *" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none placeholder-slate-600" />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full mt-4">
            Register Shop
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default RegisterShopView;