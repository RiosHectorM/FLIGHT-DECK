import { useState, useRef, useEffect } from 'react';
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
import { format, parseISO } from 'date-fns';
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
}: Props) {
  const { user, updateUserImage } = useUserStore();
  const [color, setColor] = useState(false);

  const enviardato = (dato: boolean) => {
    buttonDisabled(dato);
  };

  // console.log('user', user);
  useEffect(() => {
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
  }, [color]);

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
        setColor(true);
      } else {
        toast.error('It already exists');
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
        setColor(false);
      } else {
        toast.success('Does not exist');
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
    enviardato(color);
  };
  const handleClickStopPropagation = (e: any) => {
    e.stopPropagation();
  };
  const formattedStartDate = startDate ? startDate.split('T')[0] : '';
  const formattedEndDate = endDate ? endDate.split('T')[0] : '';

  return (
    <table
      /* className="table-auto w-90% mx-auto overflow-x-auto bg-slate-300 rounded-2xl mt-3 cursor-pointer" */
      className="table-auto w-90% mx-auto overflow-x-auto mt-10 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300 ease-in-out cursor-pointer"
      onClick={() => handlerSetFolio()}
    >
      <thead>
        <tr className="border-b border-gray-200 ">
          <th className="py-2 px-3 text-center">Item:</th>
          <th className="py-2 px-3 text-center">Folio:</th>
          <th className="py-2 px-3 text-center">Start date:</th>
          <th className="py-2 px-3 text-center">End date:</th>
          <th className="py-2 px-3 text-center">Total Hours:</th>
          <th className="py-2 px-3 text-center">Upload signed folio:</th>
          <th className="py-2 px-3 text-center">Folio Signed</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 hover:text-black">
          <td className=" text-center">
            <p className="py-2 px-3">{item} </p>
          </td>
          <td className=" text-center">
            <p className="py-2 px-3">{folioNumber} </p>
          </td>
          <td className=" text-center">
            <p className="py-2 px-3">{formattedStartDate} </p>
          </td>
          <td className=" text-center">
            <p className="py-2 px-3">{formattedEndDate}</p>
          </td>
          <td className=" text-center">
            <p className="py-2 px-3">{totalHours} </p>
          </td>
          <td
            className=" text-center flex"
            onClick={handleClickStopPropagation}
          >
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
                  <button className="button" onClick={handleOnClick}>
                    <AiOutlinePaperClip
                      title="Attached"
                      className="ml-5 mt-3 hover:scale-150 hover:text-green-600"
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
                  <button className="button" onClick={handleOnClickI}>
                    <AiOutlineFolderOpen
                      title="Change"
                      className="ml-5 mt-3 hover:scale-150 hover:text-green-600"
                    />
                  </button>
                );
              }}
            </CldUploadWidget>
            <AiFillEye
              title="Preview"
              className="ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-green-600"
              onClick={() => {
                handlePreview();
              }}
            />
            <AiOutlineCloudDownload
              title="Download"
              className="ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-green-600"
              onClick={() => {
                handleDownload();
              }}
            />
            <AiOutlineCloseCircle
              title="Delete"
              className="ml-5 mt-3 cursor-pointer hover:scale-150 hover:text-red-600"
              onClick={() => handleDelete()}
            />
          </td>
          <td className=" text-center">
            {color && (
              <AiFillCheckCircle
                title="Folio Ubloaded"
                className="ml-11 text-green-600"
              />
            )}
            {!color && (
              <AiFillCloud
                title="No Folio Uploaded"
                className="ml-11 text-red-600"
              />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
