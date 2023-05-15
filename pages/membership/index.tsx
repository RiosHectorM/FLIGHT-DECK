import React from 'react';
import checkout from '../../payments/checkout';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import ToasterProvider from '../providers/ToasterProvider';
import { toast } from 'react-hot-toast';

const Membership: React.FC = () => {
  const { user } = useUserStore();

  const setExpiredDate = async (date: string) => {
    if (user?.id !== undefined) {
      toast.success('Please wait...');
      toast.success('Redirecting to Payment Methods');
      await axios.put(`/api/user/${user?.id}`, {
        premiumExpiredDate: date,
      });
    } else {
      toast.error('Login First Please');
      return;
    }
  };

  const handlerMonth = async (month: number, priceChain: string) => {
    if (user?.premium) {
      toast.error('Your are ready PREMIUM');
      return;
    } else {
      let newDate = new Date();
      newDate.setMonth(newDate.getMonth() + month);
      let stringDate = newDate.toISOString();
      await setExpiredDate(stringDate);
      if (user?.id !== undefined) {
        checkout({
          lineItems: ([] = [
            {
              price: priceChain,
              quantity: 1,
            },
          ]),
        });
      }
    }
  };
  interface items {
    price: string;
    quantity: number;
  }
  interface lineItems extends Array<items> {}

  return (
    <div
      style={{
        backgroundImage: "url('/images/payment.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToasterProvider />
      <section className='text-gray-50'>
        <div className='container mx-auto p-4 sm:p-10'>
          <div className='mb-10 space-y-4 text-center'>
            <h1 className='text-4xl font-semibold leading-tight'>
              Subscription Pricing
            </h1>
          </div>
          <div className='flex flex-col items-center p-2 border-2 rounded-md border-blue-400 bg-gray-800 mb-8 mx-auto w-full'>
            <p className='my-2 text-xl font-bold'>
              Your current plan is:{' '}
              <span className='text-2xl font-extrabold'>
                {user?.premium ? 'PREMIUM' : 'FREE'}
              </span>{' '}
              {user?.premium ? ' until ' : null}
              {user?.premium ? (
                <span className='text-2xl font-extrabold'>
                  {' '}
                  {user.premiumExpiredDate?.split('T')[0]}
                </span>
              ) : null}
            </p>
          </div>

          <div className='grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-2 mb-10'>
            <div className='relative flex flex-col items-center border-2 rounded-md border-blue-400 bg-gray-800'>
              <p className='my-6 text-4xl font-bold'>FREE PLAN</p>
              <ul className='flex-1 space-y-2'>
                <li className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Flight Time: Up to 100 Hours</span>
                </li>
              </ul>
            </div>
            <div className='relative flex flex-col items-center border-2 rounded-md border-blue-400 bg-gray-800'>
              <p className='my-6 text-4xl font-bold'>PREMIUM PLAN</p>
              <ul className='flex-1 space-y-2'>
                <li className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Flight Time: Unlimited</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Access to advanced analytics</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Access to customer support</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Access to courses library</span>
                </li>
                <li className='flex items-center space-x-2 pb-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-6 h-6 text-blue-400'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    ></path>
                  </svg>
                  <span>Access to new features</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3'>
            <div className='relative flex flex-col items-center p-8 border-2 rounded-md border-blue-400 bg-gray-800'>
              <span className='absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg bg-blue-400 text-gray-900'>
                1-MONTH PLAN
              </span>
              <p className='my-6 text-4xl font-bold'>$ 20</p>
              <button
                onClick={() =>
                  handlerMonth(1, 'price_1N4CmgKWrlIRXPNaX8OL4vzG')
                }
                className='px-4 py-2 font-semibold uppercase border rounded-lg sm:py-3 sm:px-8 border-blue-400'
              >
                Subscribe44
              </button>
            </div>
            <div className='relative flex flex-col items-center p-8 border-2 rounded-md border-blue-400 bg-gray-800'>
              <span className='absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg bg-blue-400 text-gray-900'>
                3-MONTH PLAN
              </span>
              <p className='flex items-center justify-center my-6 space-x-2 font-bold'>
                <span className='text-lg line-through text-gray-300'>
                  &nbsp;$60&nbsp;
                </span>
                <span className='pb-2 text-4xl'>$ 50</span>
                <span className='text-lg'>/mo</span>
              </p>
              <button
                onClick={() => {
                  handlerMonth(3, 'price_1N5eCiKWrlIRXPNaN9jVMr1G');
                }}
                className='px-4 py-2 font-semibold uppercase border rounded-lg sm:py-3 sm:px-8 border-blue-400'
              >
                Subscribe
              </button>
            </div>
            <div className='relative flex flex-col items-center p-8 border-2 rounded-md border-blue-400 bg-gray-800'>
              <span className='absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg bg-blue-400 text-gray-900'>
                ANNUAL PLAN
              </span>
              <p className='flex items-center justify-center my-6 space-x-2 font-bold'>
                <span className='text-lg line-through text-gray-300'>
                  &nbsp;$240&nbsp;
                </span>
                <span className='pb-2 text-4xl'>$ 180</span>
                <span className='text-lg'>/mo</span>
              </p>
              <button
                onClick={() => {
                  handlerMonth(12, 'price_1N5e7oKWrlIRXPNatiDIgWnC');
                }}
                className='px-4 py-2 font-semibold uppercase border rounded-lg sm:py-3 sm:px-8 border-blue-400'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
