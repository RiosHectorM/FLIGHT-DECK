import Link from 'next/link';

const FooterMenu = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      <div className="text-gray-600">
        <h3 className="font-medium mb-4">Products</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Pricing</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Documentation</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Guides</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">API Status</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-gray-600">
        <h3 className="font-medium mb-4">Resources</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Blog</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Developers</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Support</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-gray-600">
        <h3 className="font-medium mb-4">Company</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">About Us</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Careers</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-gray-600">
        <h3 className="font-medium mb-4">Legal</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="hover:text-gray-800 cursor-pointer">Terms of Service</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/">
              <span className="text-base text-gray-500 hover:text-gray-900">Home</span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/about">
              <span className="text-base text-gray-500 hover:text-gray-900">About Us</span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact">
              <span className="text-base text-gray-500 hover:text-gray-900">Contact Us</span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy">
              <span className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</span>
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2023 My Company, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

