import { ReactNode } from "react"

interface GradientBorderCardProps {
  children: ReactNode;
}

const GradientBorderCard: React.FC<GradientBorderCardProps> = ({children}) => {
  return (
    <div className="w-full inline-flex items-center justify-center p-0.5 rounded-lg bg-gradient-to-br from-teal-300 to-lime-300">
      <span className="w-full h-full bg-neutral-900 rounded-md">
        {children}
      </span>
    </div>
  )
}

export default GradientBorderCard