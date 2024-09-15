import React, { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleBack = () => {
    navigate('/home'); // Navigate back to dashboard or another appropriate page
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!validatePassword(newPassword)) {
      setError(
        'Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    navigate('/dashboard'); // Redirect to dashboard or another appropriate page
    // Add logic to handle password change, such as an API call
    console.log('Password changed successfully!');
  };

  return (
    <DefaultLayout>
      <div>
        <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
          <div>
            <h1 className="font-semibold text-slate-950 dark:text-white p-2">
              Change Password
            </h1>
          </div>
          <div className="button flex item-center justify-center items-center">
            <button
              type="button"
              onClick={handleBack}
              className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
            >
              <div className="flex items-center justify-center gap-2">
                <Icon
                  as={IoArrowBackCircleSharp}
                  width="23px"
                  height="23px"
                  color="inherit"
                />
                <span>Back</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
          <div className="mb-4 lg:w-full">
            <form onSubmit={handlePasswordChange}>
              <div className="rounded-sm border mb-5 py-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <div className="mb-4">
                      <label className="mb-3 block text-black dark:text-white">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        name="New Password"
                        placeholder="New Password"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="mb-3 block text-black dark:text-white">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        name="Confirm New Password"
                        placeholder="Confirm New Password"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex w-full mb-4 mt-5 items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ResetPassword;
