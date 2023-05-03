import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/images/Ocko.gif" alt="My Company" />
              <img className="hidden lg:block h-8 w-auto" src="/images/Ocko.gif" alt="My Company" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
{/*               <Link href="/pilotlist">
                <span className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-500 cursor-pointer">My pilots</span>
              </Link> */}
              
                <span className="px-3 py-2 text-xlm font-medium text-gray-1000 hover:text-blue-500 cursor-pointer">Dashboard Company</span>
              
{/*               <Link href="/customers">
                <span className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-500 cursor-pointer">Settings</span>
              </Link> */}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
          <Link href="/MainCompany">
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              return to main
            </button>
          </Link>

          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* <!-- Heroicon name: menu --> */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
