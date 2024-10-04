
import Login from './components/Login';

export default function Home() {
  return (
    <div className="flex-row w-3/4 text-center">
      <h1 className="font-bold text-3xl text-cyan-600">New Customer Portal</h1>
      <Login />
    </div>
  );
}
