import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import CompanyDataTable from '../../components/Tables/CompanyDataTable';
import { IoIosAddCircle } from 'react-icons/io';
import { Icon } from '@chakra-ui/react';
import '../../css/kitchenpop.css';

interface FormData {
  company_name: string;
  company_description: string;
  company_phone_number: string;
  company_address: string;
  company_email: string;
  company_admin?: string;
  user_id?: string;
}

const AddCompany = () => {
  const [showCompanyAddedPopup, setCompanyAddedShowPopup] = useState(false);
  const [companyCategories, setCompanyCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    company_description: '',
    company_address: '',
    company_email: '',
    company_phone_number: '',
    company_admin: '',
  });

  const [form, setForm] = useState(true);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('user') || '');

    if (admin) {
      console.log('Admin status found:', admin); // For debugging
      setIsAdmin(admin === 'admin');
    } else {
      console.log('No admin status found in localStorage');
    }
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/account/user-data',
      );
      setCompanyCategories(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitCompanyGeneralInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = localStorage.getItem('ID');

    const formDataWithUserId = {
      ...formData,
      user_id: userId,
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:7000/api/company-info/role',
        formDataWithUserId,
      );
      console.log('Response:', response);

      setFormData({
        company_name: '',
        company_description: '',
        company_address: '',
        company_email: '',
        company_phone_number: '',
        company_admin: '',
      });

      setForm(true);
      setCompanyAddedShowPopup(true);
    } catch (error) {
      console.log(formData);
      console.error('Error adding company:', error);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:7000/api/company-info/role',
        );
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);
  console.log(companies);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Company" pageTitle="Company" />

      {form ? (
        <>
          {isAdmin ? (
            <div className="pb-5">
              <div className="flex justify-end p-3 container bg-white rounded-lg">
                <div className="button flex items-center">
                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon
                        as={IoIosAddCircle}
                        width="23px"
                        height="23px"
                        color="inherit"
                      />
                      <span>Add Company</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <CompanyDataTable companies={companies} />
        </>
      ) : (
        <div>
          <div className="flex justify-between text-lg cursor-auto p-3 container bg-white rounded-lg">
            <div>
              <h1 className="text-xl p-2">Fill Company Details.</h1>
            </div>
            <div>
              <h1
                className="flex justify-end p-2 text-xl to-blue-700"
                onClick={() => setForm(true)}
              >
                Back
              </h1>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
            <div className="mb-4 lg:w-full">
              <form onSubmit={submitCompanyGeneralInfo}>
                <div className="rounded-sm border mb-5 py-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      General Information
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={handleChange}
                        name="company_name"
                        required
                        placeholder="Company Name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Users
                      </label>
                      <select
                        name="company_admin"
                        value={formData.company_admin}
                        onChange={handleChange}
                        onFocus={fetchCategories}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="">Select Users</option>
                        {companyCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Description
                      </label>
                      <textarea
                        name="company_description"
                        value={formData.company_description}
                        onChange={handleChange}
                        required
                        placeholder="Write the description here..."
                        rows={4}
                        cols={40}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.company_email}
                        onChange={handleChange}
                        name="company_email"
                        required
                        placeholder="Company Email"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={formData.company_phone_number}
                        onChange={handleChange}
                        name="company_phone_number"
                        required
                        placeholder="Phone.."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row py-5 lg:justify-between lg:space-x-12">
                  <div className="mb-4 lg:w-full">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Address
                        </h3>
                      </div>

                      <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                          <div className="mb-4">
                            <label className="mb-3 block text-black dark:text-white">
                              Address
                            </label>
                            <input
                              type="text"
                              value={formData.company_address}
                              required
                              onChange={handleChange}
                              name="company_address"
                              placeholder="Address"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full mb-4 mt-5 items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showCompanyAddedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Company added successfully!</p>
            <button
              onClick={() => {
                setCompanyAddedShowPopup(false);
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AddCompany;
