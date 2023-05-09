import React from 'react';
import { checkout } from './checkout';

const Membership: React.FC = () => {
  interface items {
    price: string;
    quantity: number;
  }
  interface lineItems extends Array<items> {}

  return (
    <div
      className='px-4 sm:px-10 lg:px-8 py-20'
      style={{
        backgroundImage: "url('/images/payment.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className='text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10 mb-8'>
        Choose your plan
      </h1>
      <div className='overflow-x-auto'>
        <table className='mx-auto w-full whitespace-no-wrap rounded-lg bg-white border border-gray-300 divide-y divide-gray-200'>
          <tbody>
            <tr>
              <td className='border px-4 py-2'></td>
              <td className='border px-4 py-2 text-center font-medium text-xl uppercase'>
                Free Plan
              </td>
              <td className='border px-4 py-2 text-center font-medium text-xl uppercase'>
                Monthly Plan
              </td>
              <td className='border px-4 py-2 text-center font-medium text-xl uppercase'>
                3-Month Plan
              </td>
              <td className='border px-4 py-2 text-center font-medium text-xl uppercase'>
                Annual Plan
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Price:
              </td>
              <td className='border px-4 py-2 text-center font-medium'>$0</td>
              <td className='border px-4 py-2 text-center font-medium'>$20</td>
              <td className='border px-4 py-2 text-center font-medium'>$50</td>
              <td className='border px-4 py-2 text-center font-medium'>$180</td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Flight time:
              </td>
              <td className='border px-4 py-2 text-center'>Up to 100 hours</td>
              <td className='border px-4 py-2 text-center'>Unlimited</td>
              <td className='border px-4 py-2 text-center'>Unlimited</td>
              <td className='border px-4 py-2 text-center'>Unlimited</td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Access to all features:
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Access to advanced analytics:
              </td>
              <td className='border px-4 py-2 text-center text-red-500 font-medium'>
                Not included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Access to customer support:
              </td>
              <td className='border px-4 py-2 text-center text-red-500 font-medium'>
                Not included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Access to courses library:
              </td>
              <td className='border px-4 py-2 text-center text-red-500 font-medium'>
                Not included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Access to new features:
              </td>
              <td className='border px-4 py-2 text-center text-red-500 font-medium'>
                Not included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
              <td className='border px-4 py-2 text-center text-green-500 font-medium'>
                Included
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2 text-right font-medium'>
                Action:
              </td>
              <td className='border px-4 py-2 text-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Get Free Plan
                </button>
              </td>
              <td className='border px-4 py-2 text-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => {
                    checkout({
                      lineItems: ([] = [
                        {
                          price: 'price_1N4CmgKWrlIRXPNaX8OL4vzG',
                          quantity: 1,
                        },
                      ]),
                    });
                  }}
                >
                  Get Monthly Plan
                </button>
              </td>
              <td className='border px-4 py-2 text-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => {
                    checkout({
                      lineItems: ([] = [
                        {
                          price: 'price_1N5eCiKWrlIRXPNaN9jVMr1G',
                          quantity: 1,
                        },
                      ]),
                    });
                  }}
                >
                  Get 3-Month Plan
                </button>
              </td>
              <td className='border px-4 py-2 text-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => {
                    checkout({
                      lineItems: ([] = [
                        {
                          price: 'price_1N5e7oKWrlIRXPNatiDIgWnC',
                          quantity: 1,
                        },
                      ]),
                    });
                  }}
                >
                  Get Annual Plan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Membership;
