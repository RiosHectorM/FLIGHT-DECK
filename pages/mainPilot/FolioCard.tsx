import { useState, useRef } from 'react';
import {
  AiOutlinePaperClip,
  AiOutlineFolderOpen,
  AiOutlineCloseCircle,
  AiOutlineCloudDownload,
  AiFillEye,
} from 'react-icons/ai';
import { CldUploadWidget } from 'next-cloudinary';
import { useUserStore } from '../../store/userStore';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { format, parseISO } from 'date-fns';

interface Props {
  item: number;
  folioNumber: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  setFolio: (folio: string | number) => void;
  setShowTableHours: (show: boolean) => void;
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
}: Props) {
  const { user, updateUserImage } = useUserStore();

  // console.log('user', user);

  let value: string | null = user?.image || null;

  const handleUpload = async (response: any) => {
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
      } else {
        alert('Existe');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (response: any) => {
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
  };

  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );
      if (result.data.length === 1) {
        await axios.delete(
          `/api/folio/?userId=${user?.id}&folioNum=${folioNumber}`
        );
      } else {
        alert('No Existe');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );

      const filename = 'suggested-filename.ext';
      saveAs(result.data[0].signedFolioUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = async () => {
    try {
      const result = await axios.get(
        `/api/folio/getFolioByUserAndNum?userId=${user?.id}&folioNum=${folioNumber}`
      );
      console.log(result.data[0].signedFolioUrl);
      window.open(result.data[0].signedFolioUrl, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSetFolio = () => {
    setFolio(folioNumber);
    setShowTableHours(true);
  };

  const formattedStartDate = startDate ? startDate.split('T')[0] : '';
  const formattedEndDate = endDate ? endDate.split('T')[0] : '';

  return (

    <table className='table-auto w-90% mx-auto overflow-x-auto bg-slate-300 rounded-2xl mt-6 '>
      <thead>
        <tr className='border-b border-gray-200 '>
          <th className='py-2 px-3 text-center'>Item:</th>
          <th className='py-2 px-3 text-center'>Folio:</th>
          <th className='py-2 px-3 text-center'>Start date:</th>
          <th className='py-2 px-3 text-center'>End date:</th>
          <th className='py-2 px-3 text-center'>Total Hours:</th>
          <th className='py-2 px-3 text-center'>Upload signed folio:</th>
        </tr>
      </thead>
      <tbody>
        <tr className='hover:bg-gray-100' onClick={handlerSetFolio}>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{item} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{folioNumber} </p>
          </td>
          <td className='border-b border-gray-200'>
            <p className='py-2 px-3'>{formattedStartDate} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{formattedEndDate}</p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{totalHours} </p>
          </td>
          <td className='border-b border-gray-200 text-center flex'>
            <CldUploadWidget
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
                      className='ml-5 mt-2'
                    />
                  </button>
                );
              }}
            </CldUploadWidget>
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
                    <AiOutlineFolderOpen title='Change' className='ml-5 mt-2' />
                  </button>
                );
              }}
            </CldUploadWidget>
            <AiOutlineCloseCircle
              title='Delete'
              className='ml-5 mt-2'
              onClick={() => handleDelete()}
            />
            <AiOutlineCloudDownload
              title='Download'
              className='ml-5 mt-2'
              onClick={() => {
                handleDownload();
              }}
            />
            <AiFillEye
              title='Preview'
              className='ml-5 mt-2 mr-5'
              onClick={() => {
                handlePreview();
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
