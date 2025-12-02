import { Shop, Service, FAQItem, Transaction } from './types';

export const CURRENCY = '₹';
export const COMMISSION_RATE = 0.10;

export const CUSTOMER_FAQS: FAQItem[] = [
  { q: "How do I cancel a booking?", a: "You can cancel up to 30 minutes before the slot time from your booking history." },
  { q: "What if the shop is closed?", a: "If a shop is unexpectedly closed, please report it here. We will refund your amount immediately." },
  { q: "My payment failed but money was deducted.", a: "Don't worry! It will be auto-refunded within 24 hours." }
];

export const OWNER_FAQS: FAQItem[] = [
  { q: "When can I withdraw my earnings?", a: "Funds become available immediately after the service slot time has passed." },
  { q: "Why is my balance 'Pending'?", a: "Money is held securely until the booking service is successfully completed to ensure customer satisfaction." },
  { q: "How do I update my shop image?", a: "Please email support@firstcut.com with your shop ID and new images." }
];

export const SERVICES_LIST: Service[] = [
  { id: 's1', name: 'Hair Cut', price: 250, duration: 30 },
  { id: 's2', name: 'Beard Shave', price: 150, duration: 20 },
  { id: 's3', name: 'Facewash & Cleanup', price: 450, duration: 45 },
  { id: 's4', name: 'Hair Color', price: 800, duration: 60 },
  { id: 's5', name: 'Head Massage', price: 300, duration: 30 },
];

export const TIME_SLOTS: string[] = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  "02:30 PM", "03:00 PM", "04:00 PM", "04:30 PM"
];

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 1,
    name: "Gentleman's Grooming",
    address: "12 Main St, Downtown",
    ownerName: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rajesh@demo.com",
    password: "123",
    distance: "0.8 km",
    rating: 4.8,
    reviews: 124,
    image: "https://picsum.photos/800/600?random=1",
    isOpen: true, 
    bookedSlots: ["10:00 AM"],
    wallet: { pending: 450, available: 1200 } 
  },
  {
    id: 2,
    name: "Urban Fadez Barbershop",
    address: "45 West Avenue",
    ownerName: "Amit Singh",
    mobile: "1234567890",
    email: "amit@demo.com",
    password: "123",
    distance: "1.2 km",
    rating: 4.5,
    reviews: 89,
    image: "https://picsum.photos/800/600?random=2",
    isOpen: true,
    bookedSlots: [],
    wallet: { pending: 0, available: 500 }
  },
  {
    id: 3,
    name: "The Classic Cut",
    address: "88 Market Square",
    ownerName: "Vikram Das",
    mobile: "1122334455",
    email: "vikram@demo.com",
    password: "123",
    distance: "2.5 km",
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/800/600?random=3",
    isOpen: true,
    bookedSlots: ["04:00 PM", "04:30 PM"],
    wallet: { pending: 150, available: 2000 }
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, shopId: 1, type: 'credit', amount: 250, desc: 'Hair Cut (Completed)', status: 'available', date: 'Today, 9:00 AM' },
  { id: 2, shopId: 1, type: 'credit', amount: 450, desc: 'Facial (Scheduled)', status: 'pending', date: 'Today, 2:00 PM' },
];