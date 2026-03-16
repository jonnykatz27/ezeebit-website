const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-40" role="status" aria-busy="true" aria-label="Loading page">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader
