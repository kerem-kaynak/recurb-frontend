const PaymentsTitleCard = () => {
  return (
    <div className="w-full rounded-md px-4 py-2 flex flex-row justify-between font-bold text-lg">
      <div className="px-1 py-1 flex justify-center items-center w-24">
        Date
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-96">
        Subscription
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-24">
        Category
      </div>
      <div className="px-1 py-1 flex justify-center items-center w-32">
        Amount
      </div>
    </div>
  )
}

export default PaymentsTitleCard