import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

type Request = {
  id: string;
  date: Date;
  pilotName: string;
  flightHours: number;
};

type CertificationRequestsProps = {
  requests: Request[];
};

const CertificationRequests = ({ requests }: CertificationRequestsProps) => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleSelectRequest = (request: Request) => {
    setSelectedRequest(request);
  };

  const handleApproveRequest = () => {
    if (selectedRequest) {
      console.log(`Request with id ${selectedRequest.id} approved`);
    }
  };

  const handleRejectRequest = () => {
    if (selectedRequest) {
      console.log(`Request with id ${selectedRequest.id} rejected`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mb-4 text-red-600 animate-bounce'>Certification Requests</h2>

      <div className='w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md'>
        <div className='flex flex-col divide-y divide-gray-200'>
          {requests.map((request) => (
            <div
              key={request.id}
              className={`flex items-center justify-between p-4 cursor-pointer ${
                selectedRequest?.id === request.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelectRequest(request)}
            >
              <div>
                <p className='text-lg font-bold'>{request.pilotName}</p>
                <p className='text-gray-500'>{request.date.toDateString()}</p>
              </div>
              <p className='text-lg font-bold'>{request.flightHours} hours</p>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-between p-4'>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
            onClick={handleApproveRequest}
          >
            <FontAwesomeIcon icon={faCheck} className='mr-2' />
            Approve
          </button>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
            onClick={handleRejectRequest}
          >
            <FontAwesomeIcon icon={faTimes} className='mr-2' />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationRequests;
