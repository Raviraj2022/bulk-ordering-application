import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import '../../css/toggle.css';
import '../../css/uploadimage.css';
import { IoIosAddCircle } from 'react-icons/io';
import { Icon } from '@chakra-ui/react';
import MultiSelectDropDown from '../../components/Forms/SelectGroup/MultiSelectDropDown';
import { Cloudinary } from '@cloudinary/url-gen';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import MealPlanPriceCheckbox from '../../components/Checkboxes/MealPlanPriceCheckbox';
import MealPlanMenusDishesMultiSelect from '../../components/Forms/SelectGroup/MealPlanMenusDishesMultiSelect';
import MealPlanMenuDaysCheckbox from '../../components/Checkboxes/MealPlanMenuDaysCheckbox';
import CorporateMealPlanDataTable from '../../components/Tables/CorporateMealPlanDataTable';
// import MealPlanPricingCheckBox from '../../components/Checkboxes/MealPlanPricingCkeckBox';
import CorporateMealPlanPricingCheckBox from '../../components/Checkboxes/CorporateMealPlanPricingCheckBox';
import ErrorBoundary from '../../ErrorBoundary';

const baseUrl = 'http://127.0.0.1:7000';
const cld = new Cloudinary({ cloud: { cloudName: 'djmhrkv5t' } });

type FileState = File | null;

const CorporateMealPlan = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyUser, setCompanyUser] = useState<string[]>([]);
  const [companyData, setCompanyData] = useState<string[]>([]);
  const [form, setForm] = useState(true);
  const [dietary, setDietary] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
  const [ExistingCuisineNames, setExistingCuisineNames] = useState([]);
  const [allMealData, setAllMealData] = useState([]);
  const [allDishesData, setAllDishesData] = useState([]);

  const [corporate_daily_breakfast_price, Set_corporate_daily_breakfast_price] =
    useState(false);
  const [corporate_daily_lunch_price, Set_corporate_daily_lunch_price] =
    useState(false);
  const [corporate_daily_dinner_price, Set_corporate_daily_dinner_price] =
    useState(false);

  const [corporate_daily_breakfast_qty, Set_corporate_daily_breakfast_qty] =
    useState(false);
  const [corporate_daily_lunch_qty, Set_corporate_daily_lunch_qty] =
    useState(false);
  const [corporate_daily_dinner_qty, Set_corporate_daily_dinner_qty] =
    useState(false);

  const [corporate_is_monday_available, Set_corporate_is_monday_available] =
    useState(false);
  const [corporate_is_tuesday_available, Set_corporate_is_tuesday_available] =
    useState(false);
  const [
    corporate_is_wednesday_available,
    Set_corporate_is_wednesday_available,
  ] = useState(false);
  const [corporate_is_thursday_available, Set_corporate_is_thursday_available] =
    useState(false);
  const [corporate_is_friday_available, Set_corporate_is_friday_available] =
    useState(false);
  const [corporate_is_saturday_available, Set_corporate_is_saturday_available] =
    useState(false);
  const [corporate_is_sunday_available, Set_corporate_is_sunday_available] =
    useState(false);

  const [corporate_monday_breakfast_dish, Set_corporate_monday_breakfast_dish] =
    useState(false);
  const [corporate_monday_breakfast_meal, Set_corporate_monday_breakfast_meal] =
    useState(false);
  const [corporate_monday_lunch_dish, Set_corporate_monday_lunch_dish] =
    useState(false);
  const [corporate_monday_lunch_meal, Set_corporate_monday_lunch_meal] =
    useState(false);
  const [corporate_monday_dinner_dish, Set_corporate_monday_dinner_dish] =
    useState(false);
  const [corporate_monday_dinner_meal, Set_corporate_monday_dinner_meal] =
    useState(false);

  const [
    corporate_tuesday_breakfast_dish,
    Set_corporate_tuesday_breakfast_dish,
  ] = useState(false);
  const [
    corporate_tuesday_breakfast_meal,
    Set_corporate_tuesday_breakfast_meal,
  ] = useState(false);
  const [corporate_tuesday_lunch_dish, Set_corporate_tuesday_lunch_dish] =
    useState(false);
  const [corporate_tuesday_lunch_meal, Set_corporate_tuesday_lunch_meal] =
    useState(false);
  const [corporate_tuesday_dinner_dish, Set_corporate_tuesday_dinner_dish] =
    useState(false);
  const [corporate_tuesday_dinner_meal, Set_corporate_tuesday_dinner_meal] =
    useState(false);

  const [
    corporate_wednesday_breakfast_dish,
    Set_corporate_wednesday_breakfast_dish,
  ] = useState(false);
  const [
    corporate_wednesday_breakfast_meal,
    Set_corporate_wednesday_breakfast_meal,
  ] = useState(false);
  const [corporate_wednesday_lunch_dish, Set_corporate_wednesday_lunch_dish] =
    useState(false);
  const [corporate_wednesday_lunch_meal, Set_corporate_wednesday_lunch_meal] =
    useState(false);
  const [corporate_wednesday_dinner_dish, Set_corporate_wednesday_dinner_dish] =
    useState(false);
  const [corporate_wednesday_dinner_meal, Set_corporate_wednesday_dinner_meal] =
    useState(false);

  const [
    corporate_thursday_breakfast_dish,
    Set_corporate_thursday_breakfast_dish,
  ] = useState(false);
  const [
    corporate_thursday_breakfast_meal,
    Set_corporate_thursday_breakfast_meal,
  ] = useState(false);
  const [corporate_thursday_lunch_dish, Set_corporate_thursday_lunch_dish] =
    useState(false);
  const [corporate_thursday_lunch_meal, Set_corporate_thursday_lunch_meal] =
    useState(false);
  const [corporate_thursday_dinner_dish, Set_corporate_thursday_dinner_dish] =
    useState(false);
  const [corporate_thursday_dinner_meal, Set_corporate_thursday_dinner_meal] =
    useState(false);

  const [corporate_friday_breakfast_dish, Set_corporate_friday_breakfast_dish] =
    useState(false);
  const [corporate_friday_breakfast_meal, Set_corporate_friday_breakfast_meal] =
    useState(false);
  const [corporate_friday_lunch_dish, Set_corporate_friday_lunch_dish] =
    useState(false);
  const [corporate_friday_lunch_meal, Set_corporate_friday_lunch_meal] =
    useState(false);
  const [corporate_friday_dinner_dish, Set_corporate_friday_dinner_dish] =
    useState(false);
  const [corporate_friday_dinner_meal, Set_corporate_friday_dinner_meal] =
    useState(false);

  const [
    corporate_saturday_breakfast_dish,
    Set_corporate_saturday_breakfast_dish,
  ] = useState(false);
  const [
    corporate_saturday_breakfast_meal,
    Set_corporate_saturday_breakfast_meal,
  ] = useState(false);
  const [corporate_saturday_lunch_dish, Set_corporate_saturday_lunch_dish] =
    useState(false);
  const [corporate_saturday_lunch_meal, Set_corporate_saturday_lunch_meal] =
    useState(false);
  const [corporate_saturday_dinner_dish, Set_corporate_saturday_dinner_dish] =
    useState(false);
  const [corporate_saturday_dinner_meal, Set_corporate_saturday_dinner_meal] =
    useState(false);

  const [corporate_sunday_breakfast_dish, Set_corporate_sunday_breakfast_dish] =
    useState(false);
  const [corporate_sunday_breakfast_meal, Set_corporate_sunday_breakfast_meal] =
    useState(false);
  const [corporate_sunday_lunch_dish, Set_corporate_sunday_lunch_dish] =
    useState(false);
  const [corporate_sunday_lunch_meal, Set_corporate_sunday_lunch_meal] =
    useState(false);
  const [corporate_sunday_dinner_dish, Set_corporate_sunday_dinner_dish] =
    useState(false);
  const [corporate_sunday_dinner_meal, Set_corporate_sunday_dinner_meal] =
    useState(false);

  const [formData, setFormData] = useState({
    corporate_meal_plan_name: '',
    corporate_meal_plan_description: '',
    corporate_meal_base_price: '',
    corporate_meal_weight: '',
    corporate_meal_plan_availability_status: 'available',
    corporate_company_id: '',
    corporate_manager_id: '',
    dietary_choices: [],
    cuisine_choices: [],

    corporate_daily_breakfast_price: '',
    corporate_daily_lunch_price: '',
    corporate_daily_dinner_price: '',

    corporate_daily_breakfast_qty: '',
    corporate_daily_lunch_qty: '',
    corporate_daily_dinner_qty: '',

    corporate_is_monday_available: false,
    corporate_monday_breakfast_dish: [],
    corporate_monday_breakfast_meal: [],
    corporate_monday_breakfast_dish_option: [],
    corporate_monday_breakfast_meal_option: [],
    corporate_monday_lunch_dish: [],
    corporate_monday_lunch_meal: [],
    corporate_monday_lunch_dish_option: [],
    corporate_monday_lunch_meal_option: [],
    corporate_monday_dinner_dish: [],
    corporate_monday_dinner_meal: [],
    corporate_monday_dinner_dish_option: [],
    corporate_monday_dinner_meal_option: [],

    corporate_is_tuesday_available: false,
    corporate_tuesday_breakfast_dish: [],
    corporate_tuesday_breakfast_meal: [],
    corporate_tuesday_breakfast_dish_option: [],
    corporate_tuesday_breakfast_meal_option: [],
    corporate_tuesday_lunch_dish: [],
    corporate_tuesday_lunch_meal: [],
    corporate_tuesday_lunch_dish_option: [],
    corporate_tuesday_lunch_meal_option: [],
    corporate_tuesday_dinner_dish: [],
    corporate_tuesday_dinner_meal: [],
    corporate_tuesday_dinner_dish_option: [],
    corporate_tuesday_dinner_meal_option: [],

    corporate_is_wednesday_available: false,
    corporate_wednesday_breakfast_dish: [],
    corporate_wednesday_breakfast_meal: [],
    corporate_wednesday_breakfast_dish_option: [],
    corporate_wednesday_breakfast_meal_option: [],
    corporate_wednesday_lunch_dish: [],
    corporate_wednesday_lunch_meal: [],
    corporate_wednesday_lunch_dish_option: [],
    corporate_wednesday_lunch_meal_option: [],
    corporate_wednesday_dinner_dish: [],
    corporate_wednesday_dinner_meal: [],
    corporate_wednesday_dinner_dish_option: [],
    corporate_wednesday_dinner_meal_option: [],

    corporate_is_thursday_available: false,
    corporate_thursday_breakfast_dish: [],
    corporate_thursday_breakfast_meal: [],
    corporate_thursday_breakfast_dish_option: [],
    corporate_thursday_breakfast_meal_option: [],
    corporate_thursday_lunch_dish: [],
    corporate_thursday_lunch_meal: [],
    corporate_thursday_lunch_dish_option: [],
    corporate_thursday_lunch_meal_option: [],
    corporate_thursday_dinner_dish: [],
    corporate_thursday_dinner_meal: [],
    corporate_thursday_dinner_dish_option: [],
    corporate_thursday_dinner_meal_option: [],

    corporate_is_friday_available: false,
    corporate_friday_breakfast_dish: [],
    corporate_friday_breakfast_meal: [],
    corporate_friday_breakfast_dish_option: [],
    corporate_friday_breakfast_meal_option: [],
    corporate_friday_lunch_dish: [],
    corporate_friday_lunch_meal: [],
    corporate_friday_lunch_dish_option: [],
    corporate_friday_lunch_meal_option: [],
    corporate_friday_dinner_dish: [],
    corporate_friday_dinner_meal: [],
    corporate_friday_dinner_dish_option: [],
    corporate_friday_dinner_meal_option: [],

    corporate_is_saturday_available: false,
    corporate_saturday_breakfast_dish: [],
    corporate_saturday_breakfast_meal: [],
    corporate_saturday_breakfast_dish_option: [],
    corporate_saturday_breakfast_meal_option: [],
    corporate_saturday_lunch_dish: [],
    corporate_saturday_lunch_meal: [],
    corporate_saturday_lunch_dish_option: [],
    corporate_saturday_lunch_meal_option: [],
    corporate_saturday_dinner_dish: [],
    corporate_saturday_dinner_meal: [],
    corporate_saturday_dinner_dish_option: [],
    corporate_saturday_dinner_meal_option: [],

    corporate_is_sunday_available: false,
    corporate_sunday_breakfast_dish: [],
    corporate_sunday_breakfast_meal: [],
    corporate_sunday_breakfast_dish_option: [],
    corporate_sunday_breakfast_meal_option: [],
    corporate_sunday_lunch_dish: [],
    corporate_sunday_lunch_meal: [],
    corporate_sunday_lunch_dish_option: [],
    corporate_sunday_lunch_meal_option: [],
    corporate_sunday_dinner_dish: [],
    corporate_sunday_dinner_meal: [],
    corporate_sunday_dinner_dish_option: [],
    corporate_sunday_dinner_meal_option: [],
  });
  console.log('Form Elements formData: ', formData);
  // console.log(cuisineData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dietaryChoicesResponse = await axios.get(
          `${baseUrl}/api/dietary`,
        );
        const cuisineChoicesResponse = await axios.get(
          `${baseUrl}/api/cusisine`,
        );
        const dishinfo = await axios.get(`${baseUrl}/api/dishinfo`);
        const mealinfo = await axios.get(`${baseUrl}/api/mealinfo`);

        const allDishesData = dishinfo.data.map((dish) => ({
          id: dish.dish_id,
          name: dish.dish_name,
        }));
        const allMealData = mealinfo.data.map((meal) => ({
          id: meal.meal_id,
          name: meal.meal_name,
        }));
        setAllMealData(allMealData);
        setAllDishesData(allDishesData);

        // console.log(dietaryChoicesResponse);
        setDietary(dietaryChoicesResponse.data);
        const CuisineList = cuisineChoicesResponse.data.map(
          (item) => item.name,
        );
        setCuisineData(CuisineList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDietarySelect = (e, type) => {
    const selectedOption = e.target.value;
    if (selectedOption) {
      setFormData({
        ...formData,
        [type]: [selectedOption],
      });
    }
  };

  const handleCuisineChange = (cities: string[]) => {
    const duplicateIndices = cuisineData
      .map((value, index) => (cities.includes(value) ? index + 1 : -1))
      .filter((index) => index !== -1);
    setFormData((prevData) => ({
      ...prevData,
      cuisine_choices: duplicateIndices,
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
      const imgData = new FormData();
      imgData.append('file', selectedFile);
      imgData.append('upload_preset', 'cabriot');
      imgData.append('cloud_name', 'djmhrkv5t');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/djmhrkv5t/image/upload',
        {
          method: 'POST',
          body: imgData,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      const user_id = localStorage.getItem('ID');
      const dataToSend = {
        ...formData,
        MealPlanImgUrl: data.url,
        corporate_user_id: user_id,
      };

      console.log('dataToSend: ', dataToSend);

      const res = await axios.post(
        `${baseUrl}/api/corporatemealplan`,
        dataToSend,
      );
      setFormData({
        corporate_meal_plan_name: '',
        corporate_meal_plan_description: '',
        corporate_meal_base_price: '',
        corporate_meal_weight: '',
        corporate_meal_plan_availability_status: 'available',
        corporate_company_id: '',
        corporate_manager_id: '',
        dietary_choices: [],
        cuisine_choices: [],

        corporate_daily_breakfast_price: '',
        corporate_daily_lunch_price: '',
        corporate_daily_dinner_price: '',

        corporate_daily_breakfast_qty: '',
        corporate_daily_lunch_qty: '',
        corporate_daily_dinner_qty: '',

        corporate_is_monday_available: true,
        corporate_monday_breakfast_dish: [],
        corporate_monday_breakfast_meal: [],
        corporate_monday_breakfast_dish_option: [],
        corporate_monday_breakfast_meal_option: [],
        corporate_monday_lunch_dish: [],
        corporate_monday_lunch_meal: [],
        corporate_monday_lunch_dish_option: [],
        corporate_monday_lunch_meal_option: [],
        corporate_monday_dinner_dish: [],
        corporate_monday_dinner_meal: [],
        corporate_monday_dinner_dish_option: [],
        corporate_monday_dinner_meal_option: [],

        corporate_is_tuesday_available: true,
        corporate_tuesday_breakfast_dish: [],
        corporate_tuesday_breakfast_meal: [],
        corporate_tuesday_breakfast_dish_option: [],
        corporate_tuesday_breakfast_meal_option: [],
        corporate_tuesday_lunch_dish: [],
        corporate_tuesday_lunch_meal: [],
        corporate_tuesday_lunch_dish_option: [],
        corporate_tuesday_lunch_meal_option: [],
        corporate_tuesday_dinner_dish: [],
        corporate_tuesday_dinner_meal: [],
        corporate_tuesday_dinner_dish_option: [],
        corporate_tuesday_dinner_meal_option: [],

        corporate_is_wednesday_available: true,
        corporate_wednesday_breakfast_dish: [],
        corporate_wednesday_breakfast_meal: [],
        corporate_wednesday_breakfast_dish_option: [],
        corporate_wednesday_breakfast_meal_option: [],
        corporate_wednesday_lunch_dish: [],
        corporate_wednesday_lunch_meal: [],
        corporate_wednesday_lunch_dish_option: [],
        corporate_wednesday_lunch_meal_option: [],
        corporate_wednesday_dinner_dish: [],
        corporate_wednesday_dinner_meal: [],
        corporate_wednesday_dinner_dish_option: [],
        corporate_wednesday_dinner_meal_option: [],

        corporate_is_thursday_available: true,
        corporate_thursday_breakfast_dish: [],
        corporate_thursday_breakfast_meal: [],
        corporate_thursday_breakfast_dish_option: [],
        corporate_thursday_breakfast_meal_option: [],
        corporate_thursday_lunch_dish: [],
        corporate_thursday_lunch_meal: [],
        corporate_thursday_lunch_dish_option: [],
        corporate_thursday_lunch_meal_option: [],
        corporate_thursday_dinner_dish: [],
        corporate_thursday_dinner_meal: [],
        corporate_thursday_dinner_dish_option: [],
        corporate_thursday_dinner_meal_option: [],

        corporate_is_friday_available: true,
        corporate_friday_breakfast_dish: [],
        corporate_friday_breakfast_meal: [],
        corporate_friday_breakfast_dish_option: [],
        corporate_friday_breakfast_meal_option: [],
        corporate_friday_lunch_dish: [],
        corporate_friday_lunch_meal: [],
        corporate_friday_lunch_dish_option: [],
        corporate_friday_lunch_meal_option: [],
        corporate_friday_dinner_dish: [],
        corporate_friday_dinner_meal: [],
        corporate_friday_dinner_dish_option: [],
        corporate_friday_dinner_meal_option: [],

        corporate_is_saturday_available: true,
        corporate_saturday_breakfast_dish: [],
        corporate_saturday_breakfast_meal: [],
        corporate_saturday_breakfast_dish_option: [],
        corporate_saturday_breakfast_meal_option: [],
        corporate_saturday_lunch_dish: [],
        corporate_saturday_lunch_meal: [],
        corporate_saturday_lunch_dish_option: [],
        corporate_saturday_lunch_meal_option: [],
        corporate_saturday_dinner_dish: [],
        corporate_saturday_dinner_meal: [],
        corporate_saturday_dinner_dish_option: [],
        corporate_saturday_dinner_meal_option: [],

        corporate_is_sunday_available: true,
        corporate_sunday_breakfast_dish: [],
        corporate_sunday_breakfast_meal: [],
        corporate_sunday_breakfast_dish_option: [],
        corporate_sunday_breakfast_meal_option: [],
        corporate_sunday_lunch_dish: [],
        corporate_sunday_lunch_meal: [],
        corporate_sunday_lunch_dish_option: [],
        corporate_sunday_lunch_meal_option: [],
        corporate_sunday_dinner_dish: [],
        corporate_sunday_dinner_meal: [],
        corporate_sunday_dinner_dish_option: [],
        corporate_sunday_dinner_meal_option: [],
      });

      Set_corporate_daily_breakfast_price(false);
      Set_corporate_daily_dinner_price(false);
      Set_corporate_daily_lunch_price(false);

      Set_corporate_daily_breakfast_qty(false);
      Set_corporate_daily_dinner_qty(false);
      Set_corporate_daily_lunch_qty(false);

      Set_corporate_is_friday_available(false);
      Set_corporate_is_monday_available(false);
      Set_corporate_is_saturday_available(false);
      Set_corporate_is_sunday_available(false);
      Set_corporate_is_thursday_available(false);
      Set_corporate_is_tuesday_available(false);
      Set_corporate_is_wednesday_available(false);

      Set_corporate_monday_breakfast_dish(false);
      Set_corporate_monday_breakfast_meal(false);
      Set_corporate_monday_lunch_dish(false);
      Set_corporate_monday_lunch_meal(false);
      Set_corporate_monday_dinner_dish(false);
      Set_corporate_monday_dinner_meal(false);

      Set_corporate_tuesday_breakfast_dish(false);
      Set_corporate_tuesday_breakfast_meal(false);
      Set_corporate_tuesday_lunch_dish(false);
      Set_corporate_tuesday_lunch_meal(false);
      Set_corporate_tuesday_dinner_dish(false);
      Set_corporate_tuesday_dinner_meal(false);

      Set_corporate_wednesday_breakfast_dish(false);
      Set_corporate_wednesday_breakfast_meal(false);
      Set_corporate_wednesday_lunch_dish(false);
      Set_corporate_wednesday_lunch_meal(false);
      Set_corporate_wednesday_dinner_dish(false);
      Set_corporate_wednesday_dinner_meal(false);

      Set_corporate_thursday_breakfast_dish(false);
      Set_corporate_thursday_breakfast_meal(false);
      Set_corporate_thursday_lunch_dish(false);
      Set_corporate_thursday_lunch_meal(false);
      Set_corporate_thursday_dinner_dish(false);
      Set_corporate_thursday_dinner_meal(false);

      Set_corporate_friday_breakfast_dish(false);
      Set_corporate_friday_breakfast_meal(false);
      Set_corporate_friday_lunch_dish(false);
      Set_corporate_friday_lunch_meal(false);
      Set_corporate_friday_dinner_dish(false);
      Set_corporate_friday_dinner_meal(false);

      Set_corporate_saturday_breakfast_dish(false);
      Set_corporate_saturday_breakfast_meal(false);
      Set_corporate_saturday_lunch_dish(false);
      Set_corporate_saturday_lunch_meal(false);
      Set_corporate_saturday_dinner_dish(false);
      Set_corporate_saturday_dinner_meal(false);

      Set_corporate_sunday_breakfast_dish(false);
      Set_corporate_sunday_breakfast_meal(false);
      Set_corporate_sunday_lunch_dish(false);
      Set_corporate_sunday_lunch_meal(false);
      Set_corporate_sunday_dinner_dish(false);
      Set_corporate_sunday_dinner_meal(false);

      setForm(true);
      setKitchenUpdateShowPopup(true);
    } catch (error) {
      console.error('Error adding kitchen:', error);
      setshowErrorPopup(true);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDishMealMultiSelectChange = (
    id: string,
    cities: string[],
    category: string[],
  ) => {
    const mealIds: number[] = [];
    const dishIds: number[] = [];
    category.forEach((cat, index) => {
      if (cat === 'meal') {
        mealIds.push(Number(cities[index]));
      } else if (cat === 'dish') {
        dishIds.push(Number(cities[index]));
      }
    });
    const newId = id.replace('dish', 'meal');

    setFormData((prevData) => ({
      ...prevData,
      [id]: dishIds,
      [newId]: mealIds,
    }));
  };

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm);
  };

  const handlePricingCheckBox = (id: string, PricingChecked: boolean) => {
    const functionName = `Set_${id}`;
    const setFunction = eval(functionName);
    setFunction(PricingChecked);

    if (!PricingChecked) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: '',
      }));
    }
  };

  const handleMenuDaysCheckBox = (id: string, PricingChecked: boolean) => {
    const functionName = `Set_${id}`;
    const setFunction = eval(functionName);
    setFunction(PricingChecked);

    setFormData((prevData) => ({
      ...prevData,
      [id]: PricingChecked,
    }));
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('user') || '');

    if (admin) {
      console.log('Admin status found:', admin); // For debugging
      setIsAdmin(admin === 'admin');
    } else {
      console.log('No admin status found in localStorage');
    }
  }, []);
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:7000/api/branch-data/',
      );
      setCompanyUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:7000/api/company-info/role',
      );
      setCompanyData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Corporate" pageTitle="Corporate" />
      {form ? (
        <>
          {hideAddKitchen && (
            <div className="pb-5">
              {isAdmin && (
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
                      <span>Add Corporate Meal Plan</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <ErrorBoundary>
            <CorporateMealPlanDataTable handleEditForm={handleEditForm} />
          </ErrorBoundary>
        </>
      ) : (
        <>
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">
                Fill Corporate Meal Plan Details
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
                    <div className="">
                      <label className="mb-3 block text-black dark:text-white min-w-max pt-2">
                        Image
                      </label>
                      <input
                        type="file"
                        name="corporate_meal_plan_image"
                        onChange={handleImageChange}
                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                      />
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="corporate_meal_plan_name"
                        required
                        value={formData.corporate_meal_plan_name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="">
                      <label className="mb-3 block text-black dark:text-white pt-5">
                        Description
                      </label>
                      <textarea
                        name="corporate_meal_plan_description"
                        value={formData.corporate_meal_plan_description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="status flex gap-6">
                      <div className="">
                        <label className="mb-3 block text-black dark:text-white min-w-max ">
                          Avaliable
                        </label>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={
                              formData.corporate_meal_plan_availability_status ===
                              'available'
                            }
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                corporate_meal_plan_availability_status: e
                                  .target.checked
                                  ? 'available'
                                  : 'unavailable',
                              })
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Category
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className=" block text-black dark:text-white pt-2 min-w-max">
                      Dietary Type
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        onChange={(e) =>
                          handleDietarySelect(e, 'dietary_choices')
                        }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  'text-black dark:text-white' : ''
                                            }`}
                      >
                        <option
                          value=""
                          className="text-body dark:text-bodydark"
                        >
                          Select dietary choice
                        </option>
                        {dietary.map((item) => (
                          <option
                            value={item.id}
                            className="text-body dark:text-bodydark"
                          >
                            {item.name}
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
                  <div className="flex flex-col mb-5 gap-5.5 px-6.5">
                    <div>
                      <label
                        htmlFor="stateDropdown"
                        className="mb-3 block text-black dark:text-white"
                      >
                        Cuisine Type
                      </label>
                      <MultiSelectDropDown
                        id="multiSelect"
                        options={cuisineData}
                        selectedCities={ExistingCuisineNames}
                        onChange={handleCuisineChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Users
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className=" block text-black dark:text-white pt-2 min-w-max">
                      Company
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        // onChange={(e) =>
                        //   handleDietarySelect(e, 'dietary_choices')
                        // }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  'text-black dark:text-white' : ''
                                            }`}
                        onChange={handleChange}
                        name="corporate_company_id"
                        value={formData.corporate_company_id}
                        onFocus={fetchCompany}
                      >
                        <option
                          value=""
                          className="text-body dark:text-bodydark"
                        >
                          Select Company
                        </option>
                        {companyData.map((item) => (
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
                  <div className="flex flex-col mb-5 gap-5.5 px-6.5">
                    <div>
                      <label
                        htmlFor="stateDropdown"
                        className="mb-3 block text-black dark:text-white"
                      >
                        Branch
                      </label>
                      <select
                        // onChange={(e) =>
                        //   handleDietarySelect(e, 'dietary_choices')
                        // }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  'text-black dark:text-white' : ''
                                            }`}
                        name="corporate_manager_id"
                        value={formData.corporate_manager_id}
                        onChange={handleChange}
                        onFocus={fetchUser}
                      >
                        <option
                          value=""
                          className="text-body dark:text-bodydark"
                        >
                          Select Manager
                        </option>
                        {companyUser.map((item) => (
                          <option
                            value={item.id}
                            className="text-body dark:text-bodydark"
                          >
                            {item.branch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Pricing
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-8.5 p-6.5">
                    <div className="gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4">
                      <div className="flex items-center gap-4 mb-4 mt-4">
                        <label
                          htmlFor="corporate_daily_breakfast_price"
                          className="block text-black dark:text-white pt-2"
                        >
                          <CorporateMealPlanPricingCheckBox
                            onChange={handlePricingCheckBox}
                            checkBoxId={'corporate_daily_breakfast_price'}
                            name={'BreakFast'}
                          />
                        </label>
                        <input
                          type="number"
                          name="corporate_daily_breakfast_price"
                          id="corporate_daily_breakfast_price"
                          required
                          value={formData.corporate_daily_breakfast_price}
                          onChange={handleChange}
                          placeholder="Price"
                          disabled={!corporate_daily_breakfast_price}
                          className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                          type="number"
                          name="corporate_daily_breakfast_qty"
                          id="corporate_daily_breakfast_qty"
                          value={formData.corporate_daily_breakfast_qty}
                          onChange={handleChange}
                          disabled={!corporate_daily_breakfast_price}
                          placeholder="Qty"
                          className="rounded-lg w-20 border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <label
                          htmlFor="daily_lunch_price"
                          className="block text-black dark:text-white pt-2"
                        >
                          <CorporateMealPlanPricingCheckBox
                            onChange={handlePricingCheckBox}
                            checkBoxId={'corporate_daily_lunch_price'}
                            name={'Lunch'}
                          />
                        </label>
                        <input
                          type="number"
                          name="corporate_daily_lunch_price"
                          id="corporate_daily_lunch_price"
                          required
                          value={formData.corporate_daily_lunch_price}
                          onChange={handleChange}
                          placeholder="Price"
                          disabled={!corporate_daily_lunch_price}
                          className="rounded-lg w-32 border-[1.5px] ml-[24px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                          type="number"
                          name="corporate_daily_lunch_qty"
                          id="corporate_daily_lunch_qty"
                          value={formData.corporate_daily_lunch_qty}
                          onChange={handleChange}
                          disabled={!corporate_daily_lunch_price}
                          placeholder="Qty"
                          className="rounded-lg w-20 border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <label
                          htmlFor="corporate_daily_dinner_price"
                          className="block text-black dark:text-white pt-2"
                        >
                          <CorporateMealPlanPricingCheckBox
                            onChange={handlePricingCheckBox}
                            checkBoxId={'corporate_daily_dinner_price'}
                            name={'Dinner'}
                          />
                        </label>
                        <input
                          type="number"
                          name="corporate_daily_dinner_price"
                          id="corporate_daily_dinner_price"
                          required
                          value={formData.corporate_daily_dinner_price}
                          onChange={handleChange}
                          placeholder="Price"
                          disabled={!corporate_daily_dinner_price}
                          className="rounded-lg w-32 border-[1.5px] ml-[23px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                          type="number"
                          name="corporate_daily_dinner_qty"
                          id="corporate_daily_dinner_qty"
                          value={formData.corporate_daily_dinner_qty}
                          onChange={handleChange}
                          disabled={!corporate_daily_dinner_price}
                          placeholder="Qty"
                          className="rounded-lg w-20 border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-9">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Menu
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8.5 p-6.5">
                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-22">
                            <label
                              htmlFor="corporate_is_monday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                checkboxDisabled={corporate_is_monday_available}
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_monday_available'}
                                name={'Monday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly ">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_monday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_monday_available
                                  }
                                  DaysDishValue={
                                    corporate_monday_breakfast_dish
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_monday_breakfast_dish'}
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={
                                  corporate_monday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_monday_breakfast_dish_option"
                                className="mb-3 lg:mt-4 block mt-[25px] text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={
                                  corporate_monday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_monday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_monday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_monday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={corporate_monday_lunch_dish}
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_monday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={corporate_monday_lunch_dish}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_monday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_monday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_monday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={
                                  corporate_monday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_monday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_monday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_monday_available}
                                checkPriceCheckbox={
                                  corporate_monday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-22">
                            <label
                              htmlFor="corporate_is_tuesday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_tuesday_available'}
                                name={'Tuesday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_tuesday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_tuesday_available
                                  }
                                  DaysDishValue={
                                    corporate_tuesday_breakfast_dish
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={
                                    'corporate_tuesday_breakfast_dish'
                                  }
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_tuesday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_tuesday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_tuesday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_tuesday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_tuesday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_tuesday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_tuesday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_tuesday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_tuesday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_tuesday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_tuesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_tuesday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-25">
                            <label
                              htmlFor="corporate_is_wednesday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_wednesday_available'}
                                name={'Wednesday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_wednesday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_wednesday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={
                                    'corporate_wednesday_breakfast_dish'
                                  }
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_wednesday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_wednesday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_wednesday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_wednesday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_wednesday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_wednesday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_wednesday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_wednesday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_wednesday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_wednesday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_wednesday_available
                                }
                                checkPriceCheckbox={
                                  corporate_wednesday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-25">
                            <label
                              htmlFor="corporate_is_thursday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_thursday_available'}
                                name={'Thursday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_thursday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_thursday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={
                                    'corporate_thursday_breakfast_dish'
                                  }
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_thursday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_thursday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_thursday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_thursday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_thursday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_thursday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_thursday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_thursday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_thursday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_thursday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_thursday_available
                                }
                                checkPriceCheckbox={
                                  corporate_thursday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-20">
                            <label
                              htmlFor="corporate_is_friday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_friday_available'}
                                name={'Friday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_friday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_friday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_friday_breakfast_dish'}
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={
                                  corporate_friday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_friday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={
                                  corporate_friday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_friday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_friday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_friday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={corporate_friday_lunch_dish}
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_friday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={corporate_friday_lunch_dish}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_friday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_friday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_friday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={
                                  corporate_friday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_friday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_friday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_friday_available}
                                checkPriceCheckbox={
                                  corporate_friday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-20">
                            <label
                              htmlFor="corporate_is_saturday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_saturday_available'}
                                name={'Saturday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_saturday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_saturday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={
                                    'corporate_saturday_breakfast_dish'
                                  }
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_saturday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_saturday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_saturday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_saturday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_saturday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_lunch_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_saturday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_saturday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_saturday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_saturday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_saturday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={
                                  corporate_is_saturday_available
                                }
                                checkPriceCheckbox={
                                  corporate_saturday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center">
                        <div className="gap-3 flex space-evenly">
                          <div className="w-20">
                            <label
                              htmlFor="corporate_is_sunday_available"
                              className="mb-3 mt-4 block text-black dark:text-white pt-2"
                            >
                              <MealPlanMenuDaysCheckbox
                                onChange={handleMenuDaysCheckBox}
                                checkBoxId={'corporate_is_sunday_available'}
                                name={'Sunday'}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_sunday_breakfast_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_sunday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_sunday_breakfast_dish'}
                                  name={'BreakFast'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_breakfast_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={
                                  corporate_sunday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_sunday_breakfast_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_breakfast_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={
                                  corporate_sunday_breakfast_dish
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_sunday_lunch_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_sunday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_sunday_lunch_dish'}
                                  name={'Lunch'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_lunch_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={corporate_sunday_lunch_dish}
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_sunday_lunch_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_lunch_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={corporate_sunday_lunch_dish}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly">
                          <div className="gap-3 flex space-evenly">
                            <div className="w-25">
                              <label
                                htmlFor="corporate_sunday_dinner_dish"
                                className="mb-0 mt-4 block text-black dark:text-white pt-2"
                              >
                                <MealPlanPriceCheckbox
                                  checkboxDisabled={
                                    corporate_is_sunday_available
                                  }
                                  onChange={handlePricingCheckBox}
                                  checkBoxId={'corporate_sunday_dinner_dish'}
                                  name={'Dinner'}
                                />
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_dinner_dish"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={
                                  corporate_sunday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                          <div className="gap-0 flex space-evenly">
                            <div className="w-20 ml-8">
                              <label
                                htmlFor="corporate_sunday_dinner_dish_option"
                                className="mb-3 mt-[25px] lg:mt-4 block text-black dark:text-white pt-1"
                              >
                                Options
                              </label>
                            </div>
                            <div>
                              <MealPlanMenusDishesMultiSelect
                                id="corporate_sunday_dinner_dish_option"
                                options={allMealData}
                                dishesData={allDishesData}
                                selectedCities={ExistingCuisineNames}
                                onChange={handleDishMealMultiSelectChange}
                                checkboxDisabled={corporate_is_sunday_available}
                                checkPriceCheckbox={
                                  corporate_sunday_dinner_dish
                                }
                              />
                            </div>
                          </div>
                        </div>
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
            </div>
          </form>
        </>
      )}
      {showKitchenUpdatedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Corporate Meal Added successfully!</p>
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
            <p>Corporate Meal Adding Faild!</p>
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

export default CorporateMealPlan;
