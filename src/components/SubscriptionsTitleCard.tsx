const SubscriptionsTitleCard = () => {
  return (
    <div className="w-full rounded-lg px-4 py-2 flex flex-row justify-between text-lg font-bold">
    <div className="w-16 h-auto rounded-md flex justify-center items-center text-center">
      Icon
    </div>
    <div className="w-96 px-1 py-1 flex justify-center items-center">
      Name
    </div>
    <div className="w-24 px-1 py-1 flex justify-center items-center">
      Category
    </div>
    <div className="px-1 py-1 flex justify-center items-center w-32">
      Start Date
    </div>
    <div className="px-1 py-1 flex justify-center items-center w-32">
      End Date
    </div>
    <div className="px-1 py-1 flex justify-center items-center w-32">
      Amount
    </div>
  </div>
  )
}

export default SubscriptionsTitleCard