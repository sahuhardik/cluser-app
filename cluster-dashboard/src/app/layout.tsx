"use client";

import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import './globals.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { loginApi } from './services/auth';
import UserProfile from './components/UserProfile';



export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 

  const { setUserInfo } = useAuth();

  const handleLogin = async () => {
    const userInfo = await loginApi('sahuhardic@gail.com', '12345');
    setUserInfo({
      userId: userInfo.userId,
      name: userInfo.name,
      email: userInfo.email
    });
  };
  
  useEffect(() => {
    handleLogin();
  }, [])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1B222B] text-white">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-800 p-6 pr-0 bg-[#242C35]">
            <nav>
              <ul className="list-none space-y-4">
                <li className="flex items-center font-14">
                  <span className="text-white mr-2">•</span>
                  <a
                    href="/performance-metrices"
                    className={`${
                      pathname === '/performance-metrices' ? 'bg-gray-700 text-white border-r-4 border-blue-500' : 'text-gray-400'
                    } block w-full p-2 rounded hover:bg-gray-700`}
                  >
                    Performance Metrices
                  </a>
                </li>
                <li className="flex items-center font-14 mt-0">
                  <span className="text-white mr-2">•</span>
                  <a
                    href="/snapshot-policy"
                    className={`${
                      pathname === '/snapshot-policy' ? 'bg-gray-700 text-white border-r-4 border-blue-500' : 'text-gray-400'
                    } block w-full p-2 rounded hover:bg-gray-700`}
                  >
                    Snapshot Policy
                  </a>
                </li>
              </ul>
            </nav>
            <div className="absolute bottom-0 pb-4" >
              <div className="mt-auto border-t border-gray-700 pt-4 ">
                <UserProfile />
              </div>
            </div>
          </aside>
          <main className="flex-1 p-8">
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayout>
            {children}
        </RootLayout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
