import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';
import EditCompany from '../../Forms/EditCompany';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import EditBranch from '../../Forms/EditBranch';

const baseUrl = 'http://localhost:7000';

interface EditFormProps {
  handleEditForm: (SetForm: boolean) => void;
}

const CompanyDataTable: React.FC<EditFormProps> = ({ handleEditForm }) => {
  const [companies, setCompanies] = useState([]);
  const [show, setShow] = useState(false);
  const [ID, setID] = useState('');
  const [showCompanyDeletePopup, setCompanyDeleteShowPopup] = useState(false);
  const [showCompanyErrorPopup, setCompanyErrorShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('user') || '');
    // console.log(admin);
    setIsAdmin(admin === 'admin');
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const userRole = JSON.parse(localStorage.getItem('user') || '');
      var response = null;
      if (userRole === 'admin') {
        console.log('super');
        response = await axios.get(`${baseUrl}/api/company-info/role`);
      } else {
        console.log('user');
        const userId = localStorage.getItem('ID');

        response = await axios.get(
          `${baseUrl}/api/company-info/user/${userId}`,
        );
      }
      // console.log(response);
      const data = response.data;

      if (Array.isArray(data)) {
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.last_data_updated_time);
          const dateB = new Date(b.last_data_updated_time);
          return dateB - dateA;
        });
        setCompanies(sortedData);
      } else {
        throw new Error('API did not return an array');
      }
    } catch (error) {
      setErrorMessage(
        'Sorry, we encountered an issue while fetching company information. Please try again later.',
      );
      setCompanyErrorShowPopup(true);
      console.error('Error fetching companies:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(
        `Sending DELETE request to: ${baseUrl}/api/company-info/${id}`,
      );
      await axios.delete(`${baseUrl}/api/company-info/${id}/`);
      const updatedCompanies = companies.filter((company) => company.id !== id);
      setCompanies(updatedCompanies);
      setCompanyDeleteShowPopup(true);
    } catch (error) {
      console.error('Error deleting company:', error);
      setErrorMessage(
        "Sorry, we couldn't delete the Company. Please try again later.",
      );
      setCompanyErrorShowPopup(true);
    }
  };

  const openEditForm = () => {
    handleEditForm(false);
  };

  const closeEditForm = () => {
    handleEditForm(true);
  };

  return (
    <>
      {!show && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 pl-11 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">
                    Address
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Phone
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <tr
                      className="border-b border-[#eee] dark:border-strokedark"
                      key={company.company_id}
                    >
                      <td className="border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark xl:pl-3 flex items-center">
                        {company.company_name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark xl:pl-3">
                        {company.company_address}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:pl-5">
                        {company.company_email}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:pl-5">
                        {company.company_phone_number}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            title="Edit Company"
                            onClick={() => {
                              setShow(true);
                              setID(company.company_id);
                              openEditForm();
                            }}
                          >
                            <Icon as={BiEdit} width="20px" height="20px" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(company.company_id)}
                              title="Delete"
                            >
                              <Icon
                                as={MdOutlineDeleteOutline}
                                width="20px"
                                height="20px"
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {show && (
        <>
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">
                Update Company Details
              </h1>
            </div>
            <div className="button flex item-center justify-center items-center">
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                  fetchCompanies();
                  closeEditForm();
                }}
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
          <EditBranch ID={ID} />
        </>
      )}
      {showCompanyDeletePopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Company deleted successfully!</p>
            <button
              onClick={() => {
                setCompanyDeleteShowPopup(false);
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showCompanyErrorPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4 text-red-500 ">Failed!</p>
            <p>{errorMessage}</p>
            <button
              onClick={() => {
                setCompanyErrorShowPopup(false);
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDataTable;
