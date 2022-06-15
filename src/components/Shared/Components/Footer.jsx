import DarkMode from './DarkMode'
const navigation = {
  main: [
    { name: 'Contact IBM', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of use', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Cookie preferences', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className='fixed bottom-0 left-0 right-0'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          <div className='flex flex-wrap justify-center bg-white dark:bg-black rounded-xl shadow-md mx-3'>
            {navigation.main.map((item) => (
              <div key={item.name} className='px-5 py-3'>
                <a
                  href={item.href}
                  className='font-semibold text-blue-500 dark:text-gray-200 p-2 hover:text-blue-700'
                >
                  {item.name}
                </a>
              </div>
            ))}
            <DarkMode/>
          </div>
        </nav>

        {/* <p className='mt-8 text-center text-base text-gray-400'>
          &copy; 2020 Workflow, Inc. All rights reserved.
        </p> */}
      </div>
    </footer>
  )
}
