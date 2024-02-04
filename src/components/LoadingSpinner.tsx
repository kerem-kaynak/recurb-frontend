const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
        <div className="relative w-28 h-28 animate-spin rounded-full bg-gradient-to-r from-neutral-900 via-neutral-900 to-lime-300 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-neutral-900 rounded-full"></div>
        </div>
    </div>
  )
}

export default LoadingSpinner;