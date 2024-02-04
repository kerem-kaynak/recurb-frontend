import GradientBorderCard from "../components/GradientBorderCard"
import PageStructure from "../components/PageStructure"
import { useEffect, useState } from "react"
import 'react-day-picker/dist/style.css';

interface Subscription {
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
}

const CreateReminder = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [chosenSubscription, setChosenSubscription] = useState('0')
  const [date, setDate] = useState("2024-01-01")
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/all`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        setSubscriptions(content.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
  , []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(chosenSubscription, date, message)
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/reminders/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          subscription_id: chosenSubscription,
          date,
          message
        })
      });

      if (response.status === 200) {
        window.location.href = "/reminders"
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <PageStructure title="Create New Reminder">
      <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 mt-8">
    <GradientBorderCard>
      
        <form className="flex flex-col py-8" onSubmit={handleSubmit}>
          <div className="px-16 py-8 flex flex-row justify-center items-center gap-6">
          <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Date:
              <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none datepicker" />
            </label>
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Subscription:
              <select onChange={(e) => setChosenSubscription(e.target.value)} className="px-2 h-9 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none">
                {subscriptions.map((subscription: Subscription) => (
                  <option key={subscription.ID} value={subscription.ID}>{subscription.Name}</option>
                  ))}
              </select>
            </label>
          </div>
          <div className="px-16 pt-8 pb-12 flex flex-row justify-center items-end gap-6">
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2 text-center">
              Message:
                <textarea value={message} onChange={(e) => {setMessage(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none h-24 overflow-scroll scrollbar-hide" />

            </label>
          </div>
          <div className="px-16 pt-8 pb-12 flex flex-row justify-center items-end gap-6">
          <input type="submit" value={"+ Create Reminder"} className="cursor-pointer px-8 py-4 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-xl text-gray-900 hover:scale-105 transition-all ease-in font-bold" />
          </div>
        </form>
      
    </GradientBorderCard>
    </div>
    </div>
    </PageStructure>
  )
}

export default CreateReminder