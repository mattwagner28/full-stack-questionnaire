'use client'; // This marks it as a client component

import { useState } from 'react'; 
import { createOrUpdateUser } from '../utils/db';  
import { useUser } from './UserContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [message, setMessage] = useState(null); 
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
    
    const response = await createOrUpdateUser(formData);
    setUsernameContext(username);
    setMessage(response.message); 
    router.push('/questionnaires');

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
      {message && <p aria-live="polite">{message}</p>} 
    </div>
  );
}
