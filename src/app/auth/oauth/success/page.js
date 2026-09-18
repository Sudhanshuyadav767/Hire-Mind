"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setTokens } from '../../../../services/apiClient';
import { useAuth } from '../../../../context/AuthContext';

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
      setTokens(accessToken, refreshToken);
      refreshUser().then(() => {
        router.push('/find-jobs');
      });
    } else {
      router.push('/login');
    }
  }, [searchParams, router, refreshUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9ff]">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#463fe6] border-t-transparent"></div>
        <h2 className="mt-4 text-xl font-bold text-[#11121b]">Authenticating via OAuth...</h2>
        <p className="mt-1 text-sm text-[#8b8c98]">Please wait while we log you in.</p>
      </div>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthSuccessContent />
    </Suspense>
  );
}
