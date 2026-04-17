import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import RoleSelect from './components/RoleSelect';
import LoginOwner from './components/LoginOwner';
import LoginByPhone from './components/LoginByPhone';

import OwnerApp from './components/OwnerApp';
import EmployeeApp from './components/EmployeeApp';
import CustomerApp from './components/CustomerApp';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // 'owner' | 'employee' | 'customer'

  // Kiểm tra user đã login chưa từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('bloomspa_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setRole(user.role);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('bloomspa_user', JSON.stringify(userData));
    setCurrentUser(userData);
    setRole(userData.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('bloomspa_user');
    setCurrentUser(null);
    setRole(null);
  };

  // Chưa chọn vai trò
  if (!role) {
    return <RoleSelect onSelectRole={setRole} />;
  }

  // Owner chưa login
  if (role === 'owner' && !currentUser) {
    return <LoginOwner onLogin={handleLogin} />;
  }

  // Employee hoặc Customer chưa login
  if ((role === 'employee' || role === 'customer') && !currentUser) {
    return <LoginByPhone role={role} onLogin={handleLogin} />;
  }

  // Đã login → render app tương ứng
  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-[#f4f6f9] overflow-hidden">
      {role === 'owner' && <OwnerApp user={currentUser} onLogout={handleLogout} />}
      {role === 'employee' && <EmployeeApp user={currentUser} onLogout={handleLogout} />}
      {role === 'customer' && <CustomerApp user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}

export default App;