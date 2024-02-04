import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageStructure from '../components/PageStructure'
import GradientBorderCard from '../components/GradientBorderCard'
import { Link } from 'react-router-dom'

const Reminder = () => {
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")
  const [subscriptionId, setSubscriptionId] = useState(0)
  const [subscriptionName, setSubscriptionName] = useState("")
  const reminderId = useParams().id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/reminders/${reminderId}`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        setMessage(content.data.Message);
        setDate(content.data.Date);
        setSubscriptionName(content.data.Subscription.Name);
        setSubscriptionId(content.data.Subscription.ID);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reminderId]);

  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/reminders/${reminderId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      window.location.href = '/reminders';
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <PageStructure title='Reminder'>
      <GradientBorderCard>
        <div className="flex flex-col justify-center items-center px-4 py-8 w-full">
          <h1 className="bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text text-3xl font-bold text-center py-4">
            {message}
          </h1>
            <div className='text-xl py-4 flex flex-row justify-center items-center w-full gap-2'>
              <div>Reminder for subscription: </div>
              <div>
                <Link to={`/subscriptions/${subscriptionId}`}>
              <GradientBorderCard>
                <span className='bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text font-bold text-center px-2 py-1'>
                  {subscriptionName}
                </span>
              </GradientBorderCard>
            </Link>
              </div>
            </div>
            <div className='text-xl py-4'>{formatDateString(date)}</div>
        <button onClick={handleDelete} className="px-4 py-2 bg-gradient-to-br from-rose-500 to-rose-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mb-4 mt-4">
          Delete Reminder
        </button>
        </div>
      </GradientBorderCard>
    </PageStructure>
  )
}

export default Reminder