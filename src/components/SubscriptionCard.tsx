interface SubscriptionCardProps {
  subscription: {
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
}

const SubscriptionCard : React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const subscriptionStartDateString = subscription.StartDate.split('T')[0]
  const subscriptionEndDateString = subscription.EndDate.split('T')[0]
  const subscriptionStartDate = new Date(subscriptionStartDateString)
  const subscriptionEndDate = new Date(subscriptionEndDateString)
  return (
    <div className="w-full border-2 rounded-lg border-neutral-700 px-4 py-2 flex flex-row justify-between hover:bg-neutral-700 text-sm xl:text-md">
      <img src={`https://www.google.com/s2/favicons?domain=${subscription.Website}&sz=128`} className="w-16 h-16 rounded-md" />
      <div className="w-96 px-1 py-1 flex justify-center items-center">
        {subscription.Name}
      </div>
      <div className="w-24 px-1 py-1 flex justify-center items-center">
        {subscription.Category}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-0 invisible xl:w-32 xl:visible">
        {subscriptionStartDate.toLocaleDateString()}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-0 invisible xl:w-32 xl:visible">
        {subscriptionEndDate.toLocaleDateString()}
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-32">
        {subscription.Amount} €
      </div>
    </div>
  )
}

export default SubscriptionCard