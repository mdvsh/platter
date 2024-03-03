import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="text-gray-700 border-t-4 border-amber-500 font-sans">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/"
        >
          <span className="ml-3 text-xl tracking-wider">Platter</span>
        </Link>
        <nav className="ml-auto flex flex-wrap items-center text-base justify-center md:flex-col md:items-start">
          <Link href="/dash" className="mr-5 hover:text-gray-900" >Dashboard</Link>
          {/* <Link href="/logout" className="mr-5 hover:text-gray-900 bg-gray-300 rounded-lg px-3 py-1">Logout</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
