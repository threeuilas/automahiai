'use client';
import { LoginCardElement } from './login/elements/LoginCardElement';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Automahiʻai
        </h1>
        <p className="text-lg text-gray-600">Your local small farm platform</p>
      </div>
      <LoginCardElement
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />
    </div>
  );
}
