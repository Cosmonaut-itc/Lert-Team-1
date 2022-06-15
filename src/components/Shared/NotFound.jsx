import ErrorIcon from '../../assets/icons/404-error.png'

export default function NotFound() {
  return (
    <div className='min-h-screen w-full pt-16 pb-12 flex flex-col'>
      <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex-shrink-0 flex justify-center'>
          <img className='h-32 w-auto' src={ErrorIcon} alt='' />
        </div>
        <div className='pt-3'>
          <div className='text-center'>
            <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
              Page not found.
            </h1>
            <p className='mt-2 text-base text-gray-500'>
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-6'>
              <a
                href='/landingpage'
                className='text-base font-medium text-blue-500 hover:text-blue-400'
              >
                Go back home<span aria-hidden='true'> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className='flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex justify-center space-x-4'>
          <a
            href='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-200'
          >
            Contact Support
          </a>
          <span
            className='inline-block border-l border-gray-300'
            aria-hidden='true'
          />
          <a
            href='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-200'
          >
            Status
          </a>
          <span
            className='inline-block border-l border-gray-300'
            aria-hidden='true'
          />
          <a
            href='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-200'
          >
            Termns and Conditions
          </a>
        </nav>
      </footer>
    </div>
  )
}
