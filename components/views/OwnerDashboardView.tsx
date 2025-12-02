import React from 'react';
import { LogOut, Wallet, ArrowUpRight, RefreshCw, History, ArrowDownLeft, Power, HelpCircle, ChevronLeft } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { Shop, Transaction, User } from '../../types';
import { CURRENCY } from '../../constants';

interface OwnerDashboardViewProps {
  currentUser: User;
  shops: Shop[];
  transactions: Transaction[];
  onLogout: () => void;
  onToggleShopStatus: (shopId: number) => void;
  onWithdraw: (shopId: number) => void;
  onSimulateJob: (shopId: number) => void;
  onOpenSupport: () => void;
}

const OwnerDashboardView: React.FC<OwnerDashboardViewProps> = ({ 
  currentUser, 
  shops, 
  transactions, 
  onLogout, 
  onToggleShopStatus,
  onWithdraw,
  onSimulateJob,
  onOpenSupport
}) => {
  // Dynamic Shop Data based on Logged In Owner
  const myShop = shops.find(s => s.id === currentUser.shopId);
  
  if (!myShop) return <div className="p-6 text-red-500">Error: Shop not found</div>;

  // Filter transactions for this specific shop
  const myTransactions = transactions.filter(t => t.shopId === myShop.id);
  
  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-24 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
         <button onClick={onLogout} className="flex items-center text-red-400 text-sm border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-colors">
           <LogOut className="w-4 h-4 mr-1" /> Logout
         </button>
         <h1 className="text-white font-bold">Owner Dashboard</h1>
      </div>

      {/* Shop Info Header */}
      <div className="flex items-center gap-4 mb-8">
        <img src={myShop.image} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" alt="Shop Logo" />
        <div>
          <h2 className="text-2xl font-bold text-white">{myShop.name}</h2>
          <div className={`flex items-center gap-2 text-sm ${myShop.isOpen ? 'text-green-400' : 'text-red-400'}`}>
            <span className={`w-2 h-2 rounded-full ${myShop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {myShop.isOpen ? 'Shop is Open' : 'Shop is Closed'}
          </div>
          <p className="text-xs text-slate-500 mt-1">{myShop.address}</p>
        </div>
      </div>

      {/* --- Wallet Section --- */}
      <h3 className="text-slate-400 text-sm font-bold uppercase mb-3 tracking-wider">Financials</h3>
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 mb-6">
        <div className="flex items-center gap-2 mb-6 text-amber-500">
          <Wallet className="w-6 h-6" />
          <h3 className="font-bold text-lg text-white">My Wallet</h3>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-slate-400 text-xs mb-1">Available to Withdraw</p>
            <p className="text-2xl font-bold text-green-400">{CURRENCY}{myShop.wallet.available}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Held (Pending)</p>
            <p className="text-2xl font-bold text-amber-500">{CURRENCY}{myShop.wallet.pending}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            variant="primary"
            disabled={myShop.wallet.available <= 0}
            onClick={() => onWithdraw(myShop.id)}
          >
            <ArrowUpRight className="w-5 h-5" /> Withdraw to Bank
          </Button>
          
          <Button 
            className="w-full" 
            variant="outline"
            disabled={myShop.wallet.pending <= 0}
            onClick={() => onSimulateJob(myShop.id)}
          >
            <RefreshCw className="w-4 h-4" /> Simulate Job Completion
          </Button>
        </div>
      </Card>

      {/* --- Transaction History --- */}
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
         <History className="w-4 h-4 text-slate-400" /> Recent Transactions
      </h3>
      <div className="space-y-3 mb-8">
        {myTransactions.length === 0 ? (
          <div className="text-center text-slate-500 py-4">No transactions yet</div>
        ) : (
          myTransactions.slice().reverse().map((t) => (
           <div key={t.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full ${t.type === 'debit' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                 {t.type === 'debit' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
               </div>
               <div>
                 <p className="text-white text-sm font-medium">{t.desc}</p>
                 <p className="text-xs text-slate-500">{t.date} • {t.status === 'pending' ? 'Held' : 'Completed'}</p>
               </div>
             </div>
             <span className={`font-bold ${t.type === 'debit' ? 'text-white' : (t.status === 'pending' ? 'text-amber-500' : 'text-green-500')}`}>
               {t.type === 'debit' ? '-' : '+'}{CURRENCY}{t.amount}
             </span>
           </div>
          ))
        )}
      </div>

      {/* Shop Control */}
      <h3 className="text-slate-400 text-sm font-bold uppercase mb-3 tracking-wider">Settings</h3>
      <div className="space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Button 
            variant={myShop.isOpen ? "danger" : "success"} 
            className="w-full"
            onClick={() => onToggleShopStatus(myShop.id)}
          >
            <Power className="w-5 h-5" />
            {myShop.isOpen ? 'Close Shop Now' : 'Open Shop Now'}
          </Button>
        </div>

        <button 
          onClick={onOpenSupport}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              <HelpCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left">
              <span className="font-bold block">Help & Service</span>
              <span className="text-xs text-slate-500">Get support for your shop</span>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 rotate-180 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default OwnerDashboardView;