import { useEffect, useState } from "react";
import GradientBorderCard from "../components/GradientBorderCard"
import PaymentsTitleCard from "../components/PaymentsTitleCard"
import PaymentCard from "../components/PaymentCard";
import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";

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

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/payments`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        const paymentsData = content.data;
        paymentsData.sort((a: Payment, b: Payment) => {
          const aDate = new Date(a.Date);
          const bDate = new Date(b.Date);
          return aDate.getTime() - bDate.getTime();
        });
        setPayments(paymentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    loading ? <LoadingSpinner /> :
    <PageStructure title="Payments">
          <div className="w-full flex flex-col gap-1 items-center justify-center">
    <GradientBorderCard>
      <div className="w-full h-auto flex flex-col px-4 pt-2 pb-4 justify-center items-center">
        <PaymentsTitleCard />
        {payments.map((payment: Payment) => (<PaymentCard payment={payment} key={payment.ID} />))}
      </div>
    </GradientBorderCard>
  </div>
    </PageStructure>
  )
}

export default Payments