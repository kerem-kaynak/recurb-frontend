interface ReminderCardProps {
  reminder: {
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
}

const ReminderCard : React.FC<ReminderCardProps> = ({ reminder }) => {
  const reminderDateString = reminder.Date.split('T')[0]
  const reminderDate = new Date(reminderDateString)
  return (
    <div className="w-full border-2 rounded-lg border-neutral-700 px-4 py-2 flex flex-row justify-between hover:bg-neutral-700">
      <div className="px-1 py-1 flex justify-center items-center w-24">
        {reminderDate.toLocaleDateString()}
      </div>
      <div className="px-1 py-1 flex justify-center items-center">
        {reminder.Subscription.Name}
      </div>
      <div className="px-1 py-1 flex justify-center text-center w-96 overflow-scroll h-14 scrollbar-hide">
        {reminder.Message}
      </div>
    </div>
  )
}

export default ReminderCard