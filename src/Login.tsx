import * as React from 'react';
import { useState } from 'react';
import axios from "axios";

export default function LoginPage({ handleLogin }: any) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | any>(null);

  const login = async () => {
    const body = {
      username,
      password,
    };

    await axios.post('https://62376095b08c39a3af7fdb55.mockapi.io/login', body)
      .then(response => handleLogin(response.data))
      .catch(e => setError(e.toString()))
  };

  return (
    <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
      <br />
      <input type="button" value='Login' onClick={login} />
      {error && <p>{error}</p>}
    </div>
  );
}