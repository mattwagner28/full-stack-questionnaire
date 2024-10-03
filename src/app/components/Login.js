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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          required
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
