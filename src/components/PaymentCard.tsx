interface PaymentCardProps {
  payment: {
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
}

const PaymentCard : React.FC<PaymentCardProps> = ({ payment }) => {
  const paymentDateString = payment.Date.split('T')[0]
  const paymentDate = new Date(paymentDateString)
  return (
    <div className="w-full border-t-2 border-neutral-700 px-4 py-2 flex flex-row justify-between hover:bg-neutral-700">
      <div className="px-1 py-1 flex justify-center items-center w-24">
        {paymentDate.toLocaleDateString()}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-96">
        {payment.Subscription.Name}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-24">
        {payment.Subscription.Category}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-32">
        {payment.Amount} €
      </div>
    </div>
  )
}

export default PaymentCard