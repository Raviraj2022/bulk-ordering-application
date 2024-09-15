import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import '../../css/toggle.css';
import '../../css/uploadimage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { Icon } from '@chakra-ui/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import MenuMultiSelect from '../../components/Forms/SelectGroup/MenuMultiSelect';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import BulkOrderMealPlanMultiSelect from '../../components/Forms/SelectGroup/BulkOrderMealPlanMultiSelect';
import MealPlanDataTable from '../../components/Tables/MealPlanDataTable';
import BulkOrdersDataTable from '../../components/Tables/BulkOrdersDataTable';

const baseUrl = 'http://127.0.0.1:7000';
const cld = new Cloudinary({ cloud: { cloudName: 'djmhrkv5t' } });

type FileState = File | null;

const BulkOrderFormElements = () => {
  const [form, setForm] = useState(true);
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [selectedKitchen, setSelectedKitchen] = useState();
  const [selectedMealPlan, setSelectedMealPlan] = useState();
  const [mealPlans, setMealPlans] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    bulk_order_name: '',
    bulk_order_description: '',
    company_name: '',
    bulk_order_start_date: '',
    bulk_order_end_date: '',
    per_day_meal_qty: '',
  });
  console.log('Form Elements formData: ', formData);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/kitchen`);
        setKitchens(response.data);

        const allData = response.data;
        setSelectedKitchen(
          response.data.length > 0 ? 'Select the kitchen' : 'Kitchen not found',
        );
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/mealplan`);
        setMealPlans(response.data);
        console.log('Meal-Plan Data: ', response.data);

        setSelectedMealPlan(
          response.data.length > 0
            ? 'Select the Meal-Plan'
            : 'Meal-Plan not found',
        );
      } catch (error) {
        console.error('Error fetching Meal-Plan:', error);
      }
    };

    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/company-info`);
        setCompanies(response.data);
        console.log('Company Data: ', response.data);
      } catch (error) {
        console.error('Error fetching Company Data:', error);
      }
    };

    fetchKitchens();
    fetchMealPlans();
    fetchCompany();
  }, []);

  const handleKitchenChange = (selectedKitchen) => {
    setSelectedKitchen(selectedKitchen);
    // console.log('Selected Kitchen: ', selectedKitchen);
    setFormData((prevData) => ({
      ...prevData,
      kitchen: selectedKitchen,
    }));
  };

  const handleMealPlanChange = (selectedKitchen) => {
    setSelectedKitchen(selectedKitchen);
    // console.log('Selected Kitchen: ', selectedKitchen);
    setFormData((prevData) => ({
      ...prevData,
      MealPlan: selectedKitchen,
    }));
  };

  const handleStartDateChange = (date) => {
    console.log('Start Date: ', date);
    setFormData((prevData) => ({
      ...prevData,
      bulk_order_start_date: date,
    }));
  };

  const handleEndDateChange = (date) => {
    console.log('End Date: ', date);
    setFormData((prevData) => ({
      ...prevData,
      bulk_order_end_date: date,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitMealsInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('formData befor submit: ', formData);

      const res = await axios.post(`${baseUrl}/api/bulk-order`, formData);
      setFormData({
        bulk_order_name: '',
        bulk_order_description: '',
        company_name: '',
        bulk_order_start_date: '',
        bulk_order_end_date: '',
        per_day_meal_qty: '',
      });

      setForm(true);
      setKitchenUpdateShowPopup(true);
    } catch (error) {
      console.error('Error adding kitchen:', error);
      setshowErrorPopup(true);
    }
  };

  const handleCompanySelect = (e, type) => {
    const selectedOption = e.target.value;
    if (selectedOption) {
      setFormData({
        ...formData,
        [type]: selectedOption,
      });
    }
  };

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bulk Order" pageTitle="Bulk Order" />
      {form ? (
        <>
          {hideAddKitchen && (
            <div className="pb-5">
              <div className="flex justify-end p-3 container bg-white rounded-lg">
                <div className="button flex items-center">
                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                  >
                    <Icon
                      as={IoIosAddCircle}
                      width="23px"
                      height="23px"
                      color="inherit"
                    />
                    <span>Add Bulk Order</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          <BulkOrdersDataTable handleEditForm={handleEditForm} />
        </>
      ) : (
        <>
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">
                Fill Bulk Order Details
              </h1>
            </div>
            <div className="button flex item-center justify-center items-center">
              <button
                type="button"
                onClick={() => setForm(true)}
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
          <form onSubmit={submitMealsInfo}>
            <div className="">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      General Information
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="flex flex-col gap-5.5 ">
                      <label className=" block text-black dark:text-white pt-2 min-w-max">
                        Select Company
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          onChange={(e) => handleCompanySelect(e, 'company')}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  'text-black dark:text-white' : ''
                                                                }`}
                        >
                          <option
                            value=""
                            className="text-body dark:text-bodydark"
                          >
                            Select Company
                          </option>
                          {companies.map((item) => (
                            <option
                              value={item.company_id}
                              className="text-body dark:text-bodydark"
                            >
                              {item.company_name}
                            </option>
                          ))}
                        </select>

                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="stateDropdown"
                        className="mb-3 block text-black dark:text-white"
                      >
                        Select Kitchen
                      </label>
                      <MenuMultiSelect
                        id="multiSelect"
                        options={kitchens.map((kitchen) => kitchen.kitchenName)}
                        selectedCities={selectedKitchen}
                        onKitchenChange={handleKitchenChange}
                      />
                    </div>
                    <div className="">
                      <div>
                        <label
                          htmlFor="stateDropdown"
                          className="mb-3 block text-black dark:text-white"
                        >
                          Select Meal Plan
                        </label>

                        <BulkOrderMealPlanMultiSelect
                          id="multiSelect"
                          options={mealPlans.map(
                            (mealplan) => mealplan.meal_plan_name,
                          )}
                          selectedCities={selectedMealPlan}
                          onKitchenChange={handleMealPlanChange}
                        />
                      </div>
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-2">
                        Per Day Meal Quantity
                      </label>
                      <input
                        type="text"
                        name="per_day_meal_qty"
                        required
                        value={formData.per_day_meal_qty}
                        onChange={handleChange}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9]/g,
                            '',
                          );
                        }}
                        placeholder="Per Day Meal Quantity"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-2">
                        Start Date
                      </label>
                      <DatePickerOne onDateChange={handleStartDateChange} />
                    </div>

                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-2">
                        End Date
                      </label>
                      <DatePickerOne onDateChange={handleEndDateChange} />
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-5">
                        Description
                      </label>
                      <textarea
                        name="bulk_order_description"
                        value={formData.bulk_order_description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {showKitchenUpdatedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Meal Added successfully!</p>
            <button
              onClick={() => {
                setKitchenUpdateShowPopup(false);
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showErrorPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Faild!</p>
            <p>Meal Adding Faild!</p>
            <button
              onClick={() => {
                setshowErrorPopup(false);
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

export default BulkOrderFormElements;
