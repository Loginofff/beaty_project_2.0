"use client"

import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';




function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLoginAccount = async () => {
    try {
      const userData = {
        email,
        hashPassword: password,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const data = await res.json();
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data))
      toast("Login successfully")
      router.push('/')
    } catch (error) {
      console.error("Error login account:", error);
      toast( "falscher Login oder Passwort")
    }
  };

  useEffect(() => {
      const user = sessionStorage.getItem('user');
      if (user) {
        router.push('/');
      }  
  }, []);



  return (
    <div className="flex items-baseline justify-center my-20 ">
      <div className="flex flex-col items-center justify-center p-10 bg-blur-sm">
        <h2 className="font-bold text-3xl">Authorization</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password 
        </h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onLoginAccount} disabled={!email || !password}>
            Login
          </Button>
          <p>
            Ich habe keine Konto{' '}
            <Link href={'/create-account'} className="text-green-600 ml-3">
              -Klicken Sie hier, um sich registriren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;