import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const DashboardCompany = () => {
  return (
    <div className="min-h-screen" style={{backgroundImage: "url('/images/backgroundDash.jpg')",backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="My Company Dashboard" />
      <meta name="keywords" content="dashboard, company" />
      <meta name="author" content="My Company" />
        <title>Dashboard - My Company</title>
        <link rel="icon" type="image/gif" href="/images/Ocko.gif" />
      </Head>

      <Header />

      <Main>
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {/* Aquí podrías añadir más elementos o componentes hijos */}
        </div>
      </Main>

      <Footer />
    </div>
  );
};

export default DashboardCompany;
