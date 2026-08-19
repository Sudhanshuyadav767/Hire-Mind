// src/app/signup/page.jsx

import { Poppins } from 'next/font/google';
import LeftContent from '../component/auth/LeftContent';
import SignUpForm from '../component/auth/SignUpForm';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Sign Up | HireMind AI',
  description: 'Create your account and unlock enterprise job access tools.',
};

export default function SignUpPage() {
  return (
    <main className={`${poppins.className} flex min-h-screen w-full items-center justify-center bg-[#f5f6ff] px-0 py-0 lg:px-6 lg:py-6`}>
      <div className="grid min-h-screen w-full max-w-[1440px] grid-cols-1 overflow-hidden bg-white shadow-[0_18px_55px_rgba(69,67,150,0.08)] lg:min-h-[800px] lg:grid-cols-[1.62fr_1fr] lg:rounded-[28px] lg:border lg:border-[#d9daf0]">
        <section className="w-full h-full">
          <LeftContent />
        </section>
        <section className="flex w-full items-center justify-center bg-white px-5 py-8 md:px-8 lg:px-10">
          <SignUpForm />
        </section>
      </div>
    </main>
  );
}
