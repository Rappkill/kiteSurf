import React, { useState } from "react";
import './App.css';
import LoginPage from './Login'
import Dashboard from "./Dashboard";

export type UserType = { id: number, userId: number }

function App() {
  const [user, setUser] = useState<null | UserType>(null);
  return user ? <Dashboard user={user} /> : <LoginPage handleLogin={setUser} />
}
export default App;