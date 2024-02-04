import { useEffect, useState } from "react";
import RemindersTitleCard from "../components/RemindersTitleCard"
import PageStructure from "../components/PageStructure";
import ReminderCard from "../components/ReminderCard";
import { Link } from "react-router-dom";

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

const Reminders = () => {
  const [reminders, setReminders] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/reminders/all`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        setReminders(content.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageStructure title="Reminders">
      <Link to="/reminders/new">
        <button className="px-4 py-2 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mb-4">
          + Create Reminder
        </button>
      </Link>
      <RemindersTitleCard />
      <div className="w-full h-auto flex flex-col justify-center items-center gap-4">
        {reminders.map((reminder: Reminder) => (<Link to={`/reminders/${reminder.ID}`} className="w-full"><ReminderCard reminder={reminder} key={reminder.ID} /></Link>))}
      </div>
    </PageStructure>
  )
}

export default Reminders