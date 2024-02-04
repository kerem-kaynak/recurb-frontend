import { ReactNode } from "react"
import { PageWrapper } from "./PageWrapper"

interface PageStructureProps {
  title: string,
  children: ReactNode,
}

const PageStructure: React.FC<PageStructureProps> = ({ title, children }) => {
  return (
    <PageWrapper>
      <div className="px-8">
        <div className="w-full inline-flex items-center justify-center pb-0.5 font-bold text-3xl bg-gradient-to-br from-teal-300 to-lime-300">
          <div className="w-full pb-4 bg-neutral-900">
            <h1 className="bg-gradient-to-r from-teal-300 to-lime-300 inline-block text-transparent bg-clip-text text-5xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="pt-8">
          {children}
        </div>
      </div>
    </PageWrapper>
  )
}

export default PageStructure