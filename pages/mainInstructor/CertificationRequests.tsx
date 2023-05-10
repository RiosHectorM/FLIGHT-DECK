import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import RejectModal from '../components/Modals/RejectModal/RejectModal';
import useRejectModal from '../hooks/useRejectModal';
type Request = {
  id: string;
  date: string;
  user:{name:string, email:string};
  hourCount: number;
  certifierID: string
};

type CertificationRequestsProps = {
  requests: Request[]; 
  toggler:Function;
};

const CertificationRequests = ({ requests,  toggler} ) => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleSelectRequest = (request: Request)  => {
    setSelectedRequest(request);
  };

  const handleApproveRequest = async() => {
    if (selectedRequest) {
     console.log(`Request with id ${selectedRequest.id} approved`);
     toggler()
     toast.success('updating request')
     await axios
        .put(`http://localhost:3000/api/flight/putFlightsCertified`, {
          id: selectedRequest.id,
          certified: true,
        })
        .then(() => {
          toast.success('Saved')})
;
    }
  };
  const rejectModal = useRejectModal();
  const handleRejectRequest = async() => {

    if (selectedRequest) {
      await axios
      .put(`http://localhost:3000/api/flight/putFlightsCertified2`, {
        id: selectedRequest.id,
        certifierId: null,
      })
      .then(() => {
        toast.success('Saved')})
        toggler()
        rejectModal.onOpen();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
            <RejectModal email={selectedRequest?.user.email}/>
      <h2 className='text-2xl font-bold mb-4 text-red-600 animate-bounce'>Certification Requests</h2>

      <div className='w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md'>
        <div className='flex flex-col divide-y divide-gray-200'>
          {requests?.map((request) => (
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
                <p className='text-lg font-bold'>{request?.user.name}</p>
                <p className='text-gray-500'>{request.date}</p>
              </div>
              <p className='text-lg font-bold'>{request.hourCount} hours</p>
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
function toggler() {
  throw new Error('Function not implemented.');
}

