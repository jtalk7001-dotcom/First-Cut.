import React, { useState } from 'react';
import { Scissors, Smartphone, Mail, Key } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { ViewState, UserType } from '../../types';

interface AuthViewProps {
  onLogin: (role: UserType, method: string, identifier: string, password?: string) => void;
  onNavigate: (view: ViewState) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin, onNavigate }) => {
  const [loginRole, setLoginRole] = useState<UserType>('customer'); 
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile'); 
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputValue) {
      alert("Please fill in fields");
      return;
    }
    onLogin(loginRole, loginMethod, inputValue, password);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-sm z-10 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-4 rounded-full border border-slate-700 shadow-xl">
            <Scissors className="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">First Cut</h1>
          <p className="text-slate-400">Login to continue</p>
        </div>

        {/* Role Toggle */}
        <div className="bg-slate-800 p-1 rounded-xl flex mb-6">
          <button 
            onClick={() => setLoginRole('customer')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginRole === 'customer' ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Customer
          </button>
          <button 
            onClick={() => setLoginRole('owner')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginRole === 'owner' ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Partner
          </button>
        </div>

        <Card className="p-6 shadow-2xl bg-slate-800/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Login Method Toggle */}
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${loginMethod === 'mobile' ? 'border-amber-500' : 'border-slate-500'}`}>
                  {loginMethod === 'mobile' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={loginMethod === 'mobile'} onChange={() => setLoginMethod('mobile')} />
                <span className={`text-sm ${loginMethod === 'mobile' ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>Mobile Number</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${loginMethod === 'email' ? 'border-amber-500' : 'border-slate-500'}`}>
                   {loginMethod === 'email' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={loginMethod === 'email'} onChange={() => setLoginMethod('email')} />
                <span className={`text-sm ${loginMethod === 'email' ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>Email ID</span>
              </label>
            </div>

            {/* Input Fields */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-slate-500">
                  {loginMethod === 'mobile' ? <Smartphone className="w-5 h-5"/> : <Mail className="w-5 h-5"/>}
                </div>
                <input 
                  type={loginMethod === 'mobile' ? "tel" : "email"} 
                  placeholder={loginMethod === 'mobile' ? "Enter Mobile Number" : "Enter Email Address"}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-3.5 text-slate-500">
                  <Key className="w-5 h-5"/>
                </div>
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full mt-2" type="submit">
              Login as {loginRole === 'customer' ? 'Customer' : 'Owner'}
            </Button>
          </form>
        </Card>
        
        <div className="text-center mt-6 space-y-2">
          {loginRole === 'owner' ? (
            <p className="text-slate-500 text-sm">
              New Partner? <span onClick={() => onNavigate('registerShop')} className="text-amber-500 font-bold cursor-pointer hover:underline">Register your shop here</span>
            </p>
          ) : (
            <p className="text-slate-500 text-sm">
              Don't have an account? <span className="text-amber-500 font-bold cursor-pointer hover:underline">Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;