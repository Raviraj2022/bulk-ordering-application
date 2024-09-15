import axios from 'axios';
import { useEffect, useState } from 'react';
import MultiSelect from '../components/Forms/MultiSelect';

const baseUrl = 'http://localhost:7000';

interface FieldName {
  ID: string;
}

type FileState = File | null;

export default function EditBranch({ ID }: FieldName) {
  const [showBranchUpdatedPopup, setBranchUpdateShowPopup] = useState(false);
  const [showBranchErrorPopup, setBranchErrorShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    branch_name: '',
    lat: '',
    lon: '',
    address: '',
  });
  // console.log('Edit Id: ', ID);
  //   console.log(formData);
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/branch-data/${ID}/`);
        const branchData = response.data;
        console.log(branchData[0]);

        setFormData({
          branch_name: branchData[0].branch_name,
          lat: branchData[0].lat,
          lon: branchData[0].lon,
          address: branchData[0].address,
          // company_phone_number: branchData[0].company_phone_number,
        });
      } catch (error) {
        console.error('Error fetching branch data:', error);
        setErrorMessage(
          'Sorry, we encountered an issue while fetching branch information. Please try again later.',
        );
        setBranchErrorShowPopup(true);
      }
    };
    fetchBranchData();
  }, [ID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract the value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update the formData with the new value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/branch-data/${ID}/`, formData); // Correct API endpoint

      setBranchUpdateShowPopup(true);
    } catch (error) {
      console.error('Error updating company:', error);
      setErrorMessage(
        "Sorry, we couldn't update the company. Please try again later.",
      );
      setBranchErrorShowPopup(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit General Information
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.branch_name}
                  onChange={handleInputChange}
                  name="branch_name"
                  placeholder="Branch name"
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Latitude
                </label>
                <input
                  type="text"
                  value={formData.lat}
                  onChange={handleInputChange}
                  name="lat"
                  required
                  placeholder="lat"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Longitude
                </label>
                <input
                  type="text"
                  value={formData.lon}
                  onChange={handleInputChange}
                  name="lon"
                  required
                  placeholder="lon"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {!showBranchUpdatedPopup && (
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Edit Address
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
                          value={formData.address}
                          required
                          onChange={handleInputChange}
                          name="address"
                          placeholder="Address"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {showBranchUpdatedPopup && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg font-bold mb-4">Success!</p>
              <p>Company updated successfully!</p>
              <button
                onClick={() => {
                  setBranchUpdateShowPopup(false);
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showBranchErrorPopup && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg font-bold mb-4 text-red-500 ">Failed!</p>
              <p>{errorMessage}</p>
              <button
                onClick={() => {
                  setBranchErrorShowPopup(false);
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
