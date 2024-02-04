import GradientBorderCard from "../components/GradientBorderCard"
import PageStructure from "../components/PageStructure"
import { useState } from "react"
import 'react-day-picker/dist/style.css';

const CreateSubscription = () => {
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [amount, setAmount] = useState('0')
  const [category, setCategory] = useState('housing')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/subscriptions/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          name,
          website,
          start_date: startDate,
          end_date: endDate,
          billing_period: billingPeriod,
          amount: parseFloat(amount),
          category
        })
      });

      if (response.status === 200) {
        window.location.href = "/subscriptions"
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <PageStructure title="Add New Subscription">
      <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 mt-8">
    <GradientBorderCard>
      
        <form className="flex flex-col py-8" onSubmit={handleSubmit}>
          <div className="px-16 py-8 flex flex-row justify-center items-center gap-6">
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Name:
              <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none" />
            </label>
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Category:
              <select onChange={(e) => setCategory(e.target.value)} className="px-2 h-9 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none">
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="automobile">Automobile</option>
                <option value="education">Education</option>
                <option value="insurance">Insurance</option>
                <option value="entertainment">Entertainment</option>
                <option value="software">Software</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="px-16 py-8 flex flex-row justify-center items-center gap-6">
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Start Date:
              <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none datepicker" />
            </label>
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              End Date:
              <input type="date" value={endDate} min={startDate} onChange={(e) => {setEndDate(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none datepicker" />
            </label>
          </div>
          <div className="px-16 py-8 flex flex-row justify-center items-center gap-6">
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Website:
              <input type="url" value={website} onChange={(e) => {setWebsite(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none" />
            </label>
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2">
              Billing Period:
              <select onChange={(e) => setBillingPeriod(e.target.value)} className="px-2 h-9 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>
          <div className="px-16 pt-8 pb-12 flex flex-row justify-center items-end gap-6">
            <label className="flex flex-col gap-2 font-bold text-2xl w-1/2 text-center">
              Amount (€):
                <input type="number" value={amount} onChange={(e) => {setAmount(e.target.value)}} className="px-2 py-1 bg-neutral-700 rounded-md text-lg font-medium focus:outline-none" />

            </label>
          </div>
          <div className="px-16 pt-8 pb-12 flex flex-row justify-center items-end gap-6">
          <input type="submit" value={"+ Add Subscription"} className="cursor-pointer px-8 py-4 bg-gradient-to-br from-teal-300 to-lime-300 rounded-lg text-xl text-gray-900 hover:scale-105 transition-all ease-in font-bold" />
          </div>
        </form>
      
    </GradientBorderCard>
    </div>
    </div>
    </PageStructure>
  )
}

export default CreateSubscription