import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Private from './pages/Private';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import PrivateRoutes from './components/PrivateRoutes';
import Subscriptions from './pages/Subscriptions';
import Payments from './pages/Payments';
import Reminders from './pages/Reminders';
import CreateSubscription from './pages/CreateSubscription';
import CreateReminder from './pages/CreateReminder';
import Subscription from './pages/Subscription';
import Reminder from './pages/Reminder';
import CreateReminderWithId from './pages/CreateReminderWithId';

function App() {
  return (
    <UserProvider>
      <>
        <BrowserRouter>
        <div className='w-full h-full flex flex-row text-neutral-200'>
          <div className='w-1/6'>
            <div className='w-full h-full px-4 py-16 transition-all ease-in duration-75 bg-neutral-800 group-hover:bg-opacity-0'>
            <Navbar />
            </div>
          </div>
          <div className='w-5/6 px-4 pt-16 pb-16 overflow-auto'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/private" element={<Private />} />
              <Route path="/" element={<Dashboard />} />
              <Route path='/subscriptions' element={<Subscriptions />} />
              <Route path='/subscriptions/new' element={<CreateSubscription />} />
              <Route path='/payments' element={<Payments />} />
              <Route path='/reminders' element={<Reminders />} />
              <Route path='/reminders/new' element={<CreateReminder />} />
              <Route path='/reminders/new/subscriptions/:id' element={<CreateReminderWithId />} />
              <Route path='/subscriptions/:id' element={<Subscription />} />
              <Route path='/reminders/:id' element={<Reminder />} />
            </Route>
          </Routes>
          </div>
        </div>
        </BrowserRouter>
      </>
    </UserProvider>
  );
}

export default App;
