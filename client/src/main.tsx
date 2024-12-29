import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BaseLayout from './BaseLayout.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componenets/Login.tsx';
import AccountList from './componenets/AccountList.tsx';
import Profile from './componenets/Profile.tsx';
import { AuthProvider } from './context/AuthContext.tsx'; // AuthContext importálása
import requireAuth from './requireAuth.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path='/' Component={Login} />
            <Route path='/accounts' Component={requireAuth(AccountList)} />
            <Route path='/profile' Component={requireAuth(Profile)} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
