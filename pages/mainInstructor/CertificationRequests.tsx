import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import RejectModal from '../components/Modals/RejectModal/RejectModal';
import useRejectModal from '../../utils/hooks/useRejectModal';
import { Request } from '@/types/globalTypes';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDoneOutline } from 'react-icons/md';

type CertificationRequestsProps = {
  requests: Request[] | undefined;
  toggler: () => void;
  setIsLoading: (isLoading: boolean) => void;
};

const CertificationRequests = ({
  requests,
  toggler,
  setIsLoading,
}: CertificationRequestsProps) => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleApproveRequest = async () => {
    if (selectedRequest) {
      setIsLoading(true);
      toast.success('updating request');
      console.log(`Request with id ${selectedRequest.id} approved`);
      await axios.put(`/api/flight/putFlightsCertified`, {
        id: selectedRequest.id,
        certified: true,
      });
      toggler();
      setIsLoading(false);
      toast.success('Saved');
    }
  };

  const rejectModal = useRejectModal();

  const handleRejectRequest = async () => {
    if (selectedRequest) {
      setIsLoading(true);
      await axios.put(`/api/flight/putFlightsCertified2`, {
        id: selectedRequest.id,
        certifierId: null,
      });
      setIsLoading(false);
      toast.success('Saved');
      toggler();
      rejectModal.onOpen();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <RejectModal email={selectedRequest?.user.email as string} />
      {requests?.length ? (
        <div>
          <h2 className='text-xl font-bold mb-4 text-red-600 animate-bounce text-center'>
            Certification Requests
          </h2>
          <Table className='rounded-2xl overflow-hidden p-4 mb-10'>
            <Thead className='bg-gray-50'>
              <Tr className='text-gray-500 text-xs uppercase tracking-wide font-medium'>
                <Th className='px-2 py-3 text-center mx-2 my-4'>NAME</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>LASTNAME</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>DATE</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>EMAIL</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>STAGES</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>REMARKS</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>HOUR COUNT</Th>
                <Th className='px-2 py-3 text-center mx-2 my-4'>OK / REJECT</Th>
              </Tr>
            </Thead>
            <Tbody className='bg-white divide-y divide-gray-200'>
              {requests?.map((dato, index) => (
                <Tr key={index} className='hover:bg-gray-100'>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.user.name}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.user.lastName}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.date?.split('T')[0]}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.user.email}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.stages}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.remarks}
                  </Td>
                  <Td className='px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                    {dato.hourCount}
                  </Td>
                  <Td className=' print:hidden px-2 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex justify-around items-center space-x-2'>
                      <MdDoneOutline
                        onClick={() => {
                          setSelectedRequest(dato);
                          handleApproveRequest();
                        }}
                        className='text-green-500 w-5 h-5 cursor-pointer hover:scale-125 hover:text-green-600'
                      />
                      <AiFillCloseCircle
                        onClick={() => {
                          setSelectedRequest(dato);
                          handleRejectRequest();
                        }}
                        className='text-red-500 w-5 h-5 cursor-pointer hover:scale-125 hover:text-red-600'
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        <div className='rounded-2xl bg-flightdeck-lightgold w-2/3 text-center'>
          <h2 className='text-2xl font-bold my-4 flightdeck-dark'>
            You have no pending Certification Requests
          </h2>
        </div>
      )}
    </div>
  );
};

export default CertificationRequests;
