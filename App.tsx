import React, { useState } from 'react';
import { Shop, Service, User, Transaction, BookingDetails, ViewState, UserType } from './types';
import { INITIAL_SHOPS, INITIAL_TRANSACTIONS, COMMISSION_RATE, CURRENCY } from './constants';
import HelpModal from './components/HelpModal';

// Views
import AuthView from './components/views/AuthView';
import RegisterShopView from './components/views/RegisterShopView';
import HomeView from './components/views/HomeView';
import ShopDetailView from './components/views/ShopDetailView';
import PaymentView from './components/views/PaymentView';
import SuccessView from './components/views/SuccessView';
import OwnerDashboardView from './components/views/OwnerDashboardView';

export default function App() {
  // --- Global State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('login');
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // --- Selection State ---
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  // --- Modal State ---
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpType, setHelpType] = useState<UserType>('customer');

  // --- Handlers ---

  const handleLogin = (userType: UserType, method: string, identifier: string, password?: string) => {
    if (userType === 'owner') {
      const shopOwner = shops.find(s => 
        (s.mobile === identifier || s.email === identifier) && s.password === password
      );

      if (shopOwner) {
        setCurrentUser({
          name: shopOwner.ownerName,
          type: 'owner',
          shopId: shopOwner.id,
          contact: identifier
        });
        setView('ownerDashboard');
      } else {
        alert("Invalid credentials! If you are a new owner, please register your shop first.");
      }
    } else {
      // Simulate customer login
      setCurrentUser({
        name: "John Doe",
        type: 'customer',
        contact: identifier
      });
      setView('home');
    }
  };

  const handleRegisterShop = (shopData: any) => {
    const newShopId = shops.length + 1;
    const newShop: Shop = {
      id: newShopId,
      name: shopData.shopName,
      address: shopData.address,
      ownerName: shopData.ownerName,
      mobile: shopData.mobile,
      email: shopData.email,
      password: shopData.password,
      distance: "New",
      rating: 5.0,
      reviews: 0,
      image: "https://picsum.photos/800/600?random=" + newShopId,
      isOpen: true,
      bookedSlots: [],
      wallet: { pending: 0, available: 0 }
    };

    setShops([...shops, newShop]);
    alert("Shop Registered Successfully! Please Login.");
    setView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setSelectedServices([]);
    setSelectedSlot(null);
  };

  const handleShopClick = (shop: Shop) => {
    if (!shop.isOpen) return;
    setSelectedShop(shop);
    setSelectedServices([]);
    setSelectedSlot(null);
    setView('shop');
  };

  const handleToggleService = (service: Service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBooking = () => {
    if (!selectedShop || !selectedSlot) return;

    const subtotal = selectedServices.reduce((total, service) => total + service.price, 0);
    const commissionAmount = Math.round(subtotal * COMMISSION_RATE); 
    const shopEarnings = subtotal - commissionAmount;

    setBookingDetails({
      shop: selectedShop,
      services: selectedServices,
      slot: selectedSlot,
      subtotal: subtotal,
      platformFee: commissionAmount, 
      grandTotal: subtotal,          
      shopEarnings: shopEarnings,    
      id: Math.random().toString(36).substr(2, 9).toUpperCase()
    });

    setView('payment');
  };

  const handleConfirmPayment = () => {
    if (!bookingDetails) return;

    // 1. Update Shop Slots and Pending Balance
    const updatedShops = shops.map(shop => {
      if (shop.id === bookingDetails.shop.id) {
        const newPending = shop.wallet.pending + bookingDetails.shopEarnings;
        return {
          ...shop,
          bookedSlots: [...shop.bookedSlots, bookingDetails.slot],
          wallet: { ...shop.wallet, pending: newPending }
        };
      }
      return shop;
    });
    setShops(updatedShops);

    // 2. Add Transaction Record
    const newTransaction: Transaction = {
      id: Date.now(),
      shopId: bookingDetails.shop.id,
      type: 'credit',
      amount: bookingDetails.shopEarnings,
      desc: `Booking: ${bookingDetails.services.map(s => s.name).join(', ')}`,
      status: 'pending', 
      date: `Today, ${bookingDetails.slot}`
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // 3. Navigate to Success
    setTimeout(() => {
      setView('success');
    }, 500);
  };

  const handleToggleShopStatus = (shopId: number) => {
    const updatedShops = shops.map(shop => {
      if (shop.id === shopId) {
        return { ...shop, isOpen: !shop.isOpen };
      }
      return shop;
    });
    setShops(updatedShops);
  };

  const handleSimulateJobCompletion = (shopId: number) => {
    let fundsMoved = 0;
    
    const updatedShops = shops.map(shop => {
      if (shop.id === shopId) {
        if (shop.wallet.pending === 0) return shop;
        fundsMoved = shop.wallet.pending;
        return {
          ...shop,
          wallet: {
            pending: 0,
            available: shop.wallet.available + shop.wallet.pending
          }
        };
      }
      return shop;
    });

    if (fundsMoved > 0) {
      setShops(updatedShops);
      const updatedTransactions = transactions.map(t => 
        (t.shopId === shopId && t.status === 'pending') ? { ...t, status: 'available' as const, desc: t.desc + ' (Completed)' } : t
      );
      setTransactions(updatedTransactions);
      alert("Simulated: Job done. Funds moved to Available Balance.");
    } else {
        alert("No pending funds to clear.");
    }
  };

  const handleWithdrawal = (shopId: number) => {
    const shop = shops.find(s => s.id === shopId);
    if (!shop || shop.wallet.available <= 0) return;
    
    const amount = shop.wallet.available;
    
    const withdrawalTx: Transaction = {
      id: Date.now(),
      shopId: shopId,
      type: 'debit',
      amount: amount,
      desc: 'Withdrawal to Bank Account',
      status: 'completed',
      date: 'Just Now'
    };

    setTransactions(prev => [withdrawalTx, ...prev]);
    
    const updatedShops = shops.map(s => {
      if (s.id === shopId) {
        return { ...s, wallet: { ...s.wallet, available: 0 }};
      }
      return s;
    });
    setShops(updatedShops);

    alert(`Successfully withdrew ${CURRENCY}${amount} to bank account.`);
  };

  const openSupport = (type: UserType) => {
    setHelpType(type);
    setIsHelpOpen(true);
  };

  // --- Router ---
  return (
    <>
      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        type={helpType} 
      />

      {view === 'login' && (
        <AuthView onLogin={handleLogin} onNavigate={setView} />
      )}
      
      {view === 'registerShop' && (
        <RegisterShopView onRegister={handleRegisterShop} onNavigate={setView} />
      )}

      {view === 'home' && (
        <HomeView 
          currentUser={currentUser} 
          shops={shops} 
          onShopClick={handleShopClick} 
          onLogout={handleLogout}
          onOpenSupport={() => openSupport('customer')}
        />
      )}

      {view === 'shop' && selectedShop && (
        <ShopDetailView 
          shop={selectedShop} 
          selectedServices={selectedServices}
          selectedSlot={selectedSlot}
          onToggleService={handleToggleService}
          onSelectSlot={setSelectedSlot}
          onBooking={handleBooking}
          onNavigate={setView}
        />
      )}

      {view === 'payment' && bookingDetails && (
        <PaymentView 
          bookingDetails={bookingDetails} 
          onConfirm={handleConfirmPayment}
          onNavigate={setView}
        />
      )}

      {view === 'success' && selectedShop && selectedSlot && (
        <SuccessView 
          shop={selectedShop}
          slot={selectedSlot}
          onNavigate={setView}
        />
      )}

      {view === 'ownerDashboard' && currentUser && (
        <OwnerDashboardView 
          currentUser={currentUser}
          shops={shops}
          transactions={transactions}
          onLogout={handleLogout}
          onToggleShopStatus={handleToggleShopStatus}
          onWithdraw={handleWithdrawal}
          onSimulateJob={handleSimulateJobCompletion}
          onOpenSupport={() => openSupport('owner')}
        />
      )}
    </>
  );
}