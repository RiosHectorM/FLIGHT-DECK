import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Props {
  setShowInfo: (show: boolean) => void;
  setShowFormPassword: (show: boolean) => void;
}

const FormPassword = ({ setShowInfo, setShowFormPassword }: Props) => {
  const router = useRouter();
  const { user, updateUserHashedPasword } = useUserStore();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdatePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    try {
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user?.hashedPassword || ''
      );
      if (isPasswordCorrect) {
        const response = await axios.put(`/api/user/${user?.id}`, {
          hashedPassword: hashedNewPassword,
        });
        updateUserHashedPasword(hashedNewPassword);

        if (response.status === 200) {
          toast.success('La contraseña se ha actualizado correctamente.');
          signOut({ redirect: false });
          router.push('/home');
        }
      } else {
        toast.error(
          'No se pudo actualizar la contraseña. Por favor, intente de nuevo.'
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Ocurrió un error al actualizar la contraseña. Por favor, intente de nuevo.'
      );
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowInfo(true);
    setShowFormPassword(false);
  };

  return (
    <div className={`w-full lg:flex h-full justify-center aling-middle`}>
      <div className='border border-gray-300 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center'>
        <div className='mb-0'>
          <div className='text-gray-900 font-bold text-xl mb-5'>
            Update Password
          </div>
          <form className='w-full' onSubmit={handleUpdatePassword}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='oldPassword'
                >
                  Old Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='old-password'
                  type='password'
                  placeholder='**********'
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </div>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='newPassword'
                >
                  New Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='newPassword'
                  type='password'
                  placeholder='**********'
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {newPassword !== '' &&
                (confirmPassword !== '' ||
                  newPassword === confirmPassword) ? null : (
                  <p className='text-red-500 text-xs italic'>
                    Please choose a password.
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='confirmPassword'
                >
                  Confirm Password
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    confirmPassword && newPassword !== confirmPassword
                      ? 'border-red-500'
                      : ''
                  }`}
                  id='confirmPassword'
                  type='password'
                  placeholder='**********'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPassword && newPassword !== confirmPassword ? (
                  <p className='text-red-500 text-xs italic'>
                    Passwords do not match.
                  </p>
                ) : null}
              </div>
            </div>
            <div className='w-full px-3 mb-6 md:mb-0 flex justify-between items-center mt-8'>
              <div className='flex justify-around w-full'>
                {newPassword !== confirmPassword ||
                newPassword === '' ||
                confirmPassword === '' ||
                oldPassword === '' ? null : (
                  <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'
                    type='submit'
                  >
                    Save
                  </button>
                )}
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPassword;
