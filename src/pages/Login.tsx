import { useUser } from "../context/UserContext";
import { Navigate } from 'react-router-dom';

const Login = () => {

  const { user } = useUser();
  const handleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_API_HOST}/auth?provider=google`;
  }

  return (
    user ? <Navigate to="/" /> :
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login