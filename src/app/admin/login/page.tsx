'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export default function LoginPage(){
  const { register, handleSubmit } = useForm();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (!auth) return;
    try { 
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/admin/dashboard'); 
    }
    catch(e: any){ alert('Login failed: '+e.message); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <label className="block text-sm">Email<input {...register('email')} className="w-full border p-2 rounded mt-1"/></label>
        <label className="block text-sm mt-3">Password<input type="password" {...register('password')} className="w-full border p-2 rounded mt-1"/></label>
        <div className="mt-4"><button className="w-full bg-indigo-600 text-white py-2 rounded">Sign in</button></div>
      </form>
    </div>
  );
}
