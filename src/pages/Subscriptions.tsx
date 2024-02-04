import PageStructure from "../components/PageStructure"
import { useEffect, useState } from "react";
import SubscriptionCard from "../components/SubscriptionCard";
import SubscriptionsTitleCard from "../components/SubscriptionsTitleCard";
import { Link } from "react-router-dom";

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

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
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
  }, []);
  return (
    <PageStructure title="Subscriptions">
      <Link to="/subscriptions/new">
        <button className="px-4 py-2 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-gray-900 hover:scale-105 transition-all ease-in font-bold mb-4">
          + Add Subscription
        </button>
      </Link>
      <SubscriptionsTitleCard />
      <div className="flex flex-col gap-4">
        
        {subscriptions.map((subscription: Subscription) => (
          <Link to={`/subscriptions/${subscription.ID}`} className="w-full">
          <SubscriptionCard subscription={subscription} key={subscription.ID} />
          </Link>
        ))}
      </div>
    </PageStructure>
  )
}

export default Subscriptions