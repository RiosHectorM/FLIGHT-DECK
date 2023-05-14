import { useState } from 'react';

interface Props {
  item: number;
  folioNumber: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  setFolio: (folio: string | number) => void;
  setShowTableHours: (show: boolean) => void;
}

export default function FolioCard({
  item,
  folioNumber,
  startDate,
  endDate,
  totalHours,
  setFolio,
  setShowTableHours,
}: Props) {
  const [folioImage, setFolioImage] = useState<File | null>(null);

  const handleFolioImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFolioImage(file || null);
  };

  const handlerSetFolio = () => {
    setFolio(folioNumber);
    setShowTableHours(true);
  };

  return (
    <table
      className='table-auto w-90% mx-auto overflow-x-auto bg-slate-300 rounded-2xl mt-3 '
      onClick={handlerSetFolio}
    >
      <thead>
        <tr className='border-b border-gray-200 '>
          <th className='text-left py-2 px-3 text-center'>Item:</th>
          <th className='text-left py-2 px-3 text-center'>Folio:</th>
          <th className='text-left py-2 px-3 text-center'>Start date:</th>
          <th className='text-left py-2 px-3 text-center'>End date:</th>
          <th className='text-left py-2 px-3 text-center'>Total Hours:</th>
          <th className='text-left py-2 px-3 text-center'>
            Upload signed folio:
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className='hover:bg-gray-100'>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{item} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{folioNumber} </p>
          </td>
          <td className='border-b border-gray-200'>
            <p className='py-2 px-3'>{startDate} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{endDate} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <p className='py-2 px-3'>{totalHours} </p>
          </td>
          <td className='border-b border-gray-200 text-center'>
            <input
              type='file'
              accept='image/*'
              onChange={handleFolioImageChange}
              className='py-2 px-3'
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
