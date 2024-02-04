import { useEffect, useState } from "react"
import GradientBorderCard from "../components/GradientBorderCard"
import PageStructure from "../components/PageStructure"
import PaymentCard from "../components/PaymentCard";
import PaymentsTitleCard from "../components/PaymentsTitleCard";

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

const Dashboard = () => {
  const [payments, setPayments] = useState([])
  const [total, setTotal] = useState(0)
  const [remainingPayments, setRemainingPayments] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mostExpensiveCategory, setMostExpensiveCategory] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/payments/current`, {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();
        setPayments(content.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalAmount = payments.reduce((sum, payment: Payment) => sum + payment.Amount, 0);
    setTotal(totalAmount);

    const remainingCount = payments.filter((payment: Payment) => {
      const paymentDate = new Date(payment.Date);
      const today = new Date();
      return today <= paymentDate;
    }).length;
    setRemainingPayments(remainingCount);

    const categoryTotals: { [key: string]: number } = {};

    payments.forEach((paymentData: Payment) => {
      const categoryName = paymentData.Subscription.Category;
      const amount = paymentData.Amount;

      categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
    });

    let mostExpensiveCategory: string | null = null;
    let highestTotalAmount = 0;

    for (const categoryName in categoryTotals) {
      if (categoryTotals[categoryName] > highestTotalAmount) {
        mostExpensiveCategory = categoryName;
        highestTotalAmount = categoryTotals[categoryName];
      }
    }

    setMostExpensiveCategory(mostExpensiveCategory || '');
  }, [payments]);

  return (
    loading ? <div>Loading...</div> :
    <PageStructure title="Dashboard">
      <div className="flex flex-col w-full gap-16">
        <div className="w-full flex flex-row gap-16 justify-center">
          <GradientBorderCard>
            <div className="px-8 py-4 flex flex-col gap-1 items-center justify-center">
              <span className="">
                This month's total:
              </span>
              <span className="text-3xl font-bold ">
                €{total}
              </span>
            </div>
          </GradientBorderCard>
          <GradientBorderCard>
            <div className="px-8 py-4 flex flex-col gap-1 items-center justify-center">
              <span className="">
                Most expensive category:
              </span>
              <span className="text-3xl font-bold">
                {mostExpensiveCategory}
              </span>
            </div>
          </GradientBorderCard>
          <GradientBorderCard>
            <div className="px-8 py-4 flex flex-col gap-1 items-center justify-center">
              <span className="">
                Remaining payments:
              </span>
              <span className="text-3xl font-bold">
                {remainingPayments}
              </span>
            </div>
          </GradientBorderCard>
        </div>
        <div className="w-full flex flex-col gap-1 items-center justify-center">
          <GradientBorderCard>
            <div className="w-full h-auto flex flex-col px-4 pt-2 pb-4 justify-center items-center">
              <PaymentsTitleCard />
              {payments.map((payment: Payment) => (<PaymentCard payment={payment} key={payment.ID} />))}
            </div>
          </GradientBorderCard>
        </div>
      </div>
    </PageStructure>
  )
}

export default Dashboard