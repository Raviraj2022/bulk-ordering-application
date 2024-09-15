// Inside the Menu component
import axios from 'axios';
import { useEffect, useState } from 'react';
interface FieldName {
  Name: string;
  Selection: string;
  Price: boolean;
  Calorie: boolean;
}

export default function Menu({ Name, Selection, Price, Calorie }: FieldName) {
  const [kitchens, setKitchens] = useState([]);
  const [formData, setFormData] = useState({
    kitchen: '', // Store kitchen ID instead of kitchen name
    name: '',
    description: '',
    status: 'available',
  });

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/kitchen');
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/menu/', formData);
      alert('Menu added successfully!');
      setFormData({
        kitchen: '',
        name: '',
        description: '',
        status: 'available',
      });
    } catch (error) {
      console.error('Error adding menu:', error);
      alert('Error adding menu. Please try again.');
    }
  };

  return (
    <div>
      {/* Menu List */}
      <div className="flex flex-col ">
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">{Name}</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  {Name}
                </label>
                <input
                  type="text"
                  placeholder="Name Of The Kitchen"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Default textarea
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Default textarea"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {Selection}
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formData.kitchen} // Use formData.kitchen instead of formData.name
                      onChange={handleInputChange}
                      name="kitchen"
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select a Kitchen</option>
                      {kitchens.map((kitchen) => (
                        <option key={kitchen.id} value={kitchen.id}>
                          {kitchen.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {Price && (
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Price
                    </label>
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
                {Calorie && (
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Calorie
                    </label>
                    <input
                      type="text"
                      placeholder="Calorie"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Status
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={formData.status}
                      onChange={handleInputChange}
                      name="status"
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
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
      </div>
    </div>
  );
}
