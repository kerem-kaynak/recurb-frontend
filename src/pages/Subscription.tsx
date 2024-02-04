import { useParams } from 'react-router-dom'
import PageStructure from '../components/PageStructure'
import GradientBorderCard from '../components/GradientBorderCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PaymentCard from '../components/PaymentCard'
import ReminderCard from '../components/ReminderCard'

interface Payment {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  SubscriptionID: number;
  Subscription: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    UserID: number;
    Name: string;
    Website: string;
    BillingPeriod: string;
    Amount: number;
    StartDate: string;
    EndDate: string;
    Reminders: null;
    Payments: null;
    CategoryID: number;
    Category: string;
  };
  Date: string;
  Amount: number;
}

interface Reminder {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  SubscriptionID: number;
  Subscription: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    UserID: number;
    Name: string;
    Website: string;
    BillingPeriod: string;
    Amount: number;
    StartDate: string;
    EndDate: string;
    Reminders: null;
    Payments: null;
    CategoryID: number;
    Category: null
  };
  Date: string;
  Message: string;
}

const Subscription = () => {
  const subscriptionId = useParams().id
  const [name, setName] = useState("")
  const [website, setWebsite] = useState("")
  const [billingPeriod, setBillingPeriod] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reminders, setReminders] = useState([])
  const [payments, setPayments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/${subscriptionId}`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        console.log(content.data)
        setName(content.data.Name);
        setWebsite(content.data.Website);
        setBillingPeriod(content.data.BillingPeriod);
        setAmount(content.data.Amount);
        setCategory(content.data.Category);
        setStartDate(content.data.StartDate);
        setEndDate(content.data.EndDate);
        setReminders(content.data.Reminders);
        setPayments(content.data.Payments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subscriptionId]);

  const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });

      if (response.status === 200) {
        window.location.href = "/subscriptions"
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <PageStructure title={name}>
      <GradientBorderCard>
        <div className='flex flex-col px-8 py-8 gap-4'>
          <div className='flex flex-row gap-8'>
          <Link to={website}>
            <button className="px-4 py-2 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mb-4">
              → Go to Website
            </button>
          </Link>
          
            <button onClick={handleDelete} className="px-4 py-2 bg-gradient-to-br from-rose-500 to-rose-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mb-4">
              Delete Subscription
            </button>
          
          </div>
          <div className='flex flex-row w-full gap-16'>
            <div className='flex flex-col w-1/4 gap-16'>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Billing Period:
                </span>
                {billingPeriod.toUpperCase()}
              </div>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Amount:
                </span>
                {`${amount} EUR`}
              </div>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Category:
                </span>
                {category.toUpperCase()}
              </div>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Start Date:
                </span>
                {formatDateString(startDate)}
              </div>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  End Date:
                </span>
                {formatDateString(endDate)}
              </div>
            </div>
            <div className='flex flex-col w-1/3'>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Payments:
                </span>
                <div className='w-full h-96 overflow-auto scrollbar-hide'>
                {payments.map((payment: Payment) => (<PaymentCard payment={payment} key={payment.ID} />))}
                </div>
              </div>
              
            </div>
            <div className='flex flex-col w-1/3'>
              <div className='flex flex-col text-xl font-bold'>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-3xl mb-2'>
                  Reminders:
                </span>
                {reminders.map((reminder: Reminder) => (<Link to={`/reminders/${reminder.ID}`}><ReminderCard reminder={reminder} key={reminder.ID} /></Link>))}
                <Link to={`/reminders/new/subscriptions/${subscriptionId}`}>
            <button className="px-4 py-2 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mt-8">
              + Create New Reminder
            </button>
          </Link>
              </div>
            </div>
          </div>
        </div>
      </GradientBorderCard>
    </PageStructure>
  )
}

export default Subscription