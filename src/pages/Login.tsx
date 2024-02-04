import { useUser } from "../context/UserContext";
import { Navigate } from 'react-router-dom';

const Login = () => {

  const { user } = useUser();
  const handleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_API_HOST}/auth?provider=google`;
  }

  return (
    user ? <Navigate to="/" /> :
    <div className="fixed inset-0 flex flex-col justify-center items-center gap-24 bg-neutral-900">
        <div className="flex flex-col gap-4 justify-center items-center">
            <img src="/recurb.svg" alt="Recurb Logo" className="w-96 h-24" />
            <p className="text-lg text-slate-700 dark:text-slate-200">A simple subscription tracker</p>
        </div>
        <button onClick={handleLogin} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Login with Google</span>
        </button>
    </div>
  );
}

export default Login