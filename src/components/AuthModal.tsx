import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Phone, Mail, User as UserIcon, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ADMIN_PHONE, ADMIN_PASS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAdminLoginSuccess
}) => {
  if (!isOpen) return null;

  const { login, register } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login form inputs
  const [loginInput, setLoginInput] = useState(''); // phone or email
  const [loginPass, setLoginPass] = useState('');

  // Register form inputs
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('+998');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const res = login(loginInput, loginPass);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
        if (res.isAdmin) {
          onAdminLoginSuccess();
        }
      }, 700);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!regName || !regPhone || !regEmail || !regPass) {
      setMessage({ type: 'error', text: 'Iltimos, barcha kataklarni to\'ldiring!' });
      return;
    }

    const res = register(regName, regPhone, regEmail, regPass);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const setQuickAdminCredentials = () => {
    setLoginInput(ADMIN_PHONE);
    setLoginPass(ADMIN_PASS);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-uzum-primary rounded-2xl text-white font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-uzum-primary/20">
            S
          </div>
          <h2 className="text-xl font-black text-uzum-text">SavdoX Platformasi</h2>
          <p className="text-xs text-gray-400">Tizimga kirish yoki ro'yxatdan o'tish</p>
        </div>

        {/* Special Admin Quick Hint Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 mb-4 text-xs text-purple-900">
          <div className="flex items-center space-x-1.5 font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-uzum-primary" />
            <span>Admin Tizimi Ma'lumotlari:</span>
          </div>
          <p className="text-[11px] text-purple-800 leading-tight mb-2">
            Telefon/Parol: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-uzum-primary">+998991992012</code><br/>
            Email: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-uzum-primary">asilbekturkmanov12@gmail.com</code>
          </p>
          <button
            onClick={setQuickAdminCredentials}
            className="w-full bg-uzum-primary text-white text-[11px] font-bold py-1 rounded-xl hover:bg-uzum-primary-hover transition-colors"
          >
            Admin ma'lumotlarini avto-to'ldirish
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-uzum-bg p-1 rounded-xl mb-4 text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${tab === 'login' ? 'bg-white text-uzum-primary shadow' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Kirish (Login)
          </button>
          <button
            onClick={() => { setTab('register'); setMessage(null); }}
            className={`flex-1 py-2 rounded-lg transition-all ${tab === 'register' ? 'bg-white text-uzum-primary shadow' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {/* Alert Messages */}
        {message && (
          <div className={`p-3 rounded-xl text-xs font-bold mb-4 flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Telefon raqami yoki Email</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="+998991992012 yoki email"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Parol</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="******"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-uzum-primary hover:bg-uzum-primary-hover text-white font-black py-3 rounded-xl shadow-lg transition-all text-sm mt-2"
            >
              Kirish
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Ism va Familiya</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Telefon raqam</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+998901234567"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Email manzilingiz</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="masalan@gmail.com"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Yangi Parol</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  placeholder="Mustahkam parol o'ylab toping"
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-uzum-primary font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black py-3 rounded-xl shadow-lg transition-all text-sm mt-2"
            >
              Ro'yxatdan o'tish
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
