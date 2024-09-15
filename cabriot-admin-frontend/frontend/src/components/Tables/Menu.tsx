import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Editmenu from '../../Forms/Editmenu';
import TableOne from './TableOne';
import Editmenulist from '../../Forms/Editmenulist';

const Menu = () => {
  const [kitchens, setKitchens] = useState([]);
  const [view, setView] = useState(false);
  const [menuview, setmenuView] = useState(false);
  const [selectedID, setSelectedID] = useState('');
  const [selectedmenuID, setSelectedmenuID] = useState('');

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/menuitem/');
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://admindashboard-fr4p.onrender.com/api/menuitem/${id}`,
      );
      // After successful deletion, update the menu items list
      const updatedMenuItems = kitchens.filter((menu) => menu.id !== id);
      setKitchens(updatedMenuItems);
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const [menus, setMenus] = useState([]); // State to store the list of menus

  useEffect(() => {
    // Fetch list of menus from the backend when the component mounts
    axios
      .get('https://admindashboard-fr4p.onrender.com/api/menu/')
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
      });
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {!view && !selectedID && (
        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm dark:bg-meta-4">
            <div className="p-1 text-center">Item Image</div>
            <div className="p-1 text-center">Menu</div>
            <div className="p-1 text-center">Item Name</div>
            <div className="p-1 text-center">Price</div>
            <div className="p-1 text-center">Calories</div>
            <div className="p-1 text-center">Status</div>
            <div className="p-1 text-center">Actions</div>
          </div>
          <hr />

          {kitchens.map((brand) => (
            <div className="grid grid-cols-7" key={brand.id}>
              <div className="p-2.5 text-center">
                <img src={brand.image} alt="img" />
              </div>
              <div className="p-2.5 text-center">
                {menus.find((menu) => menu.id === brand.menu)?.name ||
                  'Unknown Menu'}
              </div>
              <div className="p-2.5 text-center">{brand.name}</div>
              <div className="p-2.5 text-center">{brand.price}</div>
              <div className="p-2.5 text-center">{brand.calories}</div>
              <div className="p-2.5 text-center">
                {brand.status ? 'Available' : 'Not Available'}
              </div>
              <div className="p-2.5 text-center items-center flex justify-center">
                {/* <Link
                  to=""
                  title="Edit Kitchen"
                  onClick={() => {
                    setSelectedID(brand.id);
                    setView(true);
                  }}
                >
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/bubbles/50/edit.png"
                    alt="edit"
                  />
                </Link> */}
                <Link
                  to=""
                  title="Edit Kitchen"
                  onClick={() => {
                    setSelectedmenuID(brand.id);
                    setmenuView(!menuview);
                  }}
                >
                  {' '}
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/bubbles/50/edit.png"
                    alt="edit"
                  />
                </Link>

                <button
                  className="hover:text-primary"
                  // @ts-ignore
                  onClick={() => handleDelete(brand.id)}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                      fill=""
                    />
                    <path
                      d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                      fill=""
                    />
                    <path
                      d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                      fill=""
                    />
                    <path
                      d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {menuview && (
        <>
          <h1
            className="p-2 text-lg cursor-pointer"
            onClick={() => setmenuView(!menuview)}
          >
            Back
          </h1>
          <Editmenulist
            id={selectedmenuID}
            name="Menu Name"
            calories=""
            description=""
            menu=""
            price=""
            status=""
          />
        </>
      )}

      {view && (
        <>
          <h1
            className="p-2 text-lg cursor-pointer"
            onClick={() => setView(false)}
          >
            Back
          </h1>
          <Editmenu
            Id={selectedID}
            Name="Menu Name"
            Selection="Kitchen"
            Price={false}
            Calorie={false}
          />
        </>
      )}

      {!view && selectedID && (
        <div
          className="text-lg font-semibold cursor-pointer"
          onClick={() => setSelectedID('')}
        >
          Back
        </div>
      )}

      {!view && selectedID && <TableOne ID={selectedID} />}
    </div>
  );
};

export default Menu;
