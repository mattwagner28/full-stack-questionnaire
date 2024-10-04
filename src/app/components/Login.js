'use client';

import { useState } from 'react'; 
import { createOrUpdateUser } from '../utils/db';  
import { useUser } from './UserContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { setUsernameContext } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = {
      username: username,
      password: password
    };
    
    setUsernameContext(username);
    await createOrUpdateUser(formData);
    if (username === 'admin') {
      router.push('/admin');
    } else {
      router.push('/questionnaires');
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <form className="flex flex-col w-full max-w-sm bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          name="username"
          placeholder="Enter username"
          required
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input
          type="password"
          className="border border-gray-300 rounded-lg p-3 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          name="password"
          placeholder="Enter password"
          required
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition duration-300"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}