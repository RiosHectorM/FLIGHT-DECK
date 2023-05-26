import { useState, useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import {
  AiOutlinePaperClip,
  AiOutlineFolderOpen,
  AiOutlineCloseCircle,
  AiOutlineCloudDownload,
  AiFillEye,
  AiFillCloud,
  AiFillCheckCircle,
} from 'react-icons/ai';
import { CldUploadWidget } from 'next-cloudinary';
import { useUserStore } from '../../store/userStore';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast } from 'react-hot-toast';

interface Props {
  item: number;
  folioNumber: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  setFolio: (folio: string | number) => void;
  setShowTableHours: (show: boolean) => void;
  buttonDisabled: (show: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

declare global {
  var cloudinary: any;
}

const uploadPreset = 'ctpmpppl';

export default function FolioCard({
  item,
  folioNumber,
  startDate,
  endDate,
  totalHours,
  setFolio,
  setShowTableHours,
  buttonDisabled,
  setIsLoading,
}: Props) {
  const { user, updateUserImage } = useUserStore();
  const [color, setColor] = useState(false);

  const enviardato = (dato: boolean) => {
    buttonDisabled(dato);
  };

  // console.log('user', user);
  useEffect(() => {
    setIsLoading(true);
    const result = axios
      .get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      )
      .then((resp) => {
        if (resp.data.length === 1) {
          setColor(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [color]);

  let value: string | null = user?.image || null;

  const handleUpload = async (response: any) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );
      if (result.data.length === 0) {
        //console.log(result.data);
        //console.log(response.info.secure_url);
        //console.log(`/api/user/${user?.id}`);
        value = response.info.secure_url;
        //updateUserImage(value?.toString() ?? '');
        await axios.post(`/api/folio/`, {
          userId: user?.id,
          folioNum: folioNumber,
          signedFolioUrl: value?.toString(),
        });
        setColor(true);
      } else {
        toast.error('It already exists');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = async (response: any) => {
    setIsLoading(true);
    try {
      //console.log(response.info.secure_url);
      //console.log(`/api/user/${user?.id}`);
      value = response.info.secure_url;
      //updateUserImage(value?.toString() ?? '');
      await axios.put(`/api/folio/`, {
        userId: user?.id,
        folioNum: folioNumber,
        signedFolioUrl: value?.toString(),
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );
      if (result.data.length === 1) {
        await axios.delete(
          `/api/folio/?userId=${user?.id}&folioNum=${folioNumber}`
        );
        setColor(false);
      } else {
        toast.success('Does not exist');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );

      const filename = 'suggested-filename.ext';
      saveAs(result.data[0].signedFolioUrl);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePreview = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );
      console.log(result.data[0].signedFolioUrl);
      window.open(result.data[0].signedFolioUrl, '_blank');
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlerSetFolio = () => {
    setFolio(folioNumber);
    setShowTableHours(true);
    enviardato(color);
  };
  const handleClickStopPropagation = (e: any) => {
    e.stopPropagation();
  };
  const formattedStartDate = startDate ? startDate.split('T')[0] : '';
  const formattedEndDate = endDate ? endDate.split('T')[0] : '';

  return (
    <Table
      className='table-auto w-11/12 mx-auto overflow-hidden mt-10 bg-flightdeck-darkgold text-black px-6 py-4 rounded-xl hover:bg-flightdeck-lightgold transition-colors duration-300 ease-in-out cursor-pointer'
      onClick={() => handlerSetFolio()}
    >
      <Thead>
        <Tr className='border-b border-gray-200 '>
          <Th className='py-2 px-3 text-center'>Folio:</Th>
          <Th className='py-2 px-3 text-center'>Start date:</Th>
          <Th className='py-2 px-3 text-center'>End date:</Th>
          <Th className='py-2 px-3 text-center'>Total Hours:</Th>
          <Th className='py-2 px-3 text-center'>Upload signed folio:</Th>
          <Th className='py-2 px-3 text-center'>Folio Signed</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr className='hover:bg-gray-100 hover:text-black'>
          <Td className=' text-center'>
            <p className='py-2 px-3'>{folioNumber} </p>
          </Td>
          <Td className=' text-center'>
            <p className='py-2 px-3'>{formattedStartDate} </p>
          </Td>
          <Td className=' text-center'>
            <p className='py-2 px-3'>{formattedEndDate}</p>
          </Td>
          <Td className=' text-center'>
            <p className='py-2 px-3'>{totalHours} </p>
          </Td>
          <Td
            className=' text-center flex justify-center align-middle align-center'
            onClick={handleClickStopPropagation}
          >
            <div className='flex'>
              {!color && <CldUploadWidget
                uploadPreset={uploadPreset}
                onUpload={handleUpload}
              >
                {({ open }) => {
                  function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button className='button' onClick={handleOnClick}>
                      <AiOutlinePaperClip
                        title='Attached'
                        className={`ml-5 ${
                          color ? 'mt-3' : 'mt-0'
                        } hover:scale-150 hover:text-green-600`}
                      />
                    </button>
                  );
                }}
              </CldUploadWidget>}
              {!color && (
                <p className='py-2 px-3 hover:cursor-default'>Attach Folio </p>
              )}
              {color && (
                <CldUploadWidget
                  uploadPreset={uploadPreset}
                  onUpload={handleChange}
                >
                  {({ open }) => {
                    function handleOnClickI(e: any) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <button className='button' onClick={handleOnClickI}>
                        <AiOutlineFolderOpen
                          title='Change'
                          className='ml-5 mt-3 hover:scale-150 hover:text-green-600'
                        />
                      </button>
                    );
                  }}
                </CldUploadWidget>
              )}
              {color && (
                <AiFillEye
                  title='Preview'
                  className='ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-green-600'
                  onClick={() => {
                    handlePreview();
                  }}
                />
              )}
              {color && (
                <AiOutlineCloudDownload
                  title='Download'
                  className='ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-green-600'
                  onClick={() => {
                    handleDownload();
                  }}
                />
              )}
              {color && (
                <AiOutlineCloseCircle
                  title='Delete'
                  className='ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-red-600'
                  onClick={() => handleDelete()}
                />
              )}
            </div>
          </Td>
          <Td className='text-center mb-2'>
            {color && (
              <AiFillCheckCircle
                title='Folio Ubloaded'
                className='mx-auto text-green-600'
              />
            )}
            {!color && (
              <AiFillCloud
                title='No Folio Uploaded'
                className='mx-auto text-red-600'
              />
            )}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
