import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user } = useUser();

  const handleLogout = () => {
    document.cookie = 'jwt=; Max-Age=-1; path=/;'
    window.location.href = `${import.meta.env.VITE_API_HOST}/auth/logout`;
  }

  return (
    user ? 
    <nav className='flex flex-col justify-between items-center w-full h-full text-neutral-200 text-lg'>
      <img src="../../public/recurb.svg" alt="Logo" width={200} height={100} />
      <div className='flex flex-col justify-start items-center gap-2 w-full pb-48'>
      <Link to="/" className="w-full px-6 py-3 transition-all ease-in duration-75 rounded-md hover:bg-neutral-700 flex flex-row gap-2 justify-start items-center">
        <img src="../../public/dashboard.svg" className="w-6 mr-2" />
            Dashboard
          </Link>
          <Link to="/subscriptions" className="w-full px-6 py-3 transition-all ease-in duration-75 rounded-md hover:bg-neutral-700 flex flex-row gap-2 justify-start items-center">
        <img src="../../public/subscriptions.svg" className="w-6 mr-2" />
            Subscriptions
          </Link>
          <Link to="/payments" className="w-full px-6 py-3 transition-all ease-in duration-75 rounded-md hover:bg-neutral-700 flex flex-row gap-2 justify-start items-center">
        <img src="../../public/payments.svg" className="w-6 mr-2" />
            Payments
          </Link>
          <Link to="/reminders" className="w-full px-6 py-3 transition-all ease-in duration-75 rounded-md hover:bg-neutral-700 flex flex-row gap-2 justify-start items-center">
        <img src="../../public/reminder.svg" className="w-6 mr-2" />
            Reminders
          </Link>
      </div>
          <button onClick={handleLogout} className="w-auto relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 text-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-800">
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-neutral-900 rounded-md group-hover:bg-opacity-0">
            Logout
            </span>
          </button>
    </nav>
    :
    <></>
  );
}

export default Navbar;