import React, { useState } from 'react';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TbLicense } from 'react-icons/tb';
import CloudinaryUploadWidget from './uploadPhoto';

const LicensePilot = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  

  const handleFileUpload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
      console.log('Archivo seleccionado:', selectedFile);
    }
  };

  const handleSave = () => {
    handleFileUpload(); // Guarda el archivo seleccionado
    setModalIsOpen(false); // Cierra el modal
  };

  return (
    <>
      <div className='bg-white rounded-xl shadow-md'>
        <div className='px-4 py-5 sm:p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
              <TbLicense className='text-white w-6 h-6' />
            </div>
            <div className='ml-5 w-0 flex-1'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Pilot License expiration date
              </dt>
              <dd>
                <div className='text-lg font-medium text-gray-900 flex items-center'>
                  {expirationDate ? (
                    <>
                      {expirationDate.toLocaleDateString()}
                      <button
                        className='ml-2 focus:outline-none'
                        onClick={() => setModalIsOpen(true)}
                      >
                        <FaEdit className='text-indigo-500 w-6 h-6' />
                      </button>
                    </>
                  ) : (
                    <button
                      className='flex items-center focus:outline-none'
                      onClick={() => setModalIsOpen(true)}
                    >
                      <FaCalendarAlt className='text-indigo-500 w-6 h-6' />
                      <span className='ml-2'>Add License</span>
                    </button>
                  )}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel='Add document expiration date'
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '40rem',
            margin: 'auto',
            padding: '0 1rem',
            maxHeight: 'calc(100vh - 20rem)',
            height: 'auto',
          },
        }}
      >
        <div className='px-4 py-5 sm:p-6 flex flex-col h-full'>
          <h2 className='text-lg font-medium text-gray-900 mb-4'>
            Add document expiration date
          </h2>
          <DatePicker
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            className='text-gray-500 border-2 border-blue-500 rounded-md p-2 shadow-md'
            placeholderText='Enter Date'
          />
          <div className='mt-20 flex-grow mx-auto'>
            <CloudinaryUploadWidget
              handleUpload={handleFileUpload}
              imageUrl={fileUrl}
              updateUserImage={setFileUrl}
              userId={''}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LicensePilot;