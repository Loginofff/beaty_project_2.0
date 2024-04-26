"use client"

import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';



function CreateAccount() {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [hashPassword, setHashPassword] = useState('');
  const [role, setRole] = useState('CLIENT'); 
  const router = useRouter();

  const onCreateAccount = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        role,
        hashPassword // Вместо password используем hashPassword
      };

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to create account");
      }

      const data = await res.json();
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data))
      toast("Account created successfully")
      router.push('/')
    } catch (error) {
      console.error("Error creating account:", error);
      toast("Error while creating account")
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
        <h2 className="font-bold text-3xl">Ein Konto erstellen</h2>
        <h2 className="text-gray-500">
          Enter your information to Create an Account
        </h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={hashPassword} onChange={(e) => setHashPassword(e.target.value)} />
          
          <div className=' flex flex-col gap-4 px-5'>
            <label>
              <input
                type="radio"
                value="CLIENT"
                checked={role === 'CLIENT'}
                onChange={() => setRole('CLIENT')}
              />
              Client
            </label>
            <label>
              <input
                type="radio"
                value="MASTER"
                checked={role === 'MASTER'}
                onChange={() => setRole('MASTER')}
              />
              Master
            </label>
          </div>

          <Button onClick={onCreateAccount} disabled={!firstName || !lastName || !email || !hashPassword}>
            Eine Konto erstellen
          </Button>
          <p>
            Ich habe ein Konto{' '}
            <Link href={'/sign-in'} className="text-green-600 ml-3">
              -Klicken Sie hier, um sich anzumelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;