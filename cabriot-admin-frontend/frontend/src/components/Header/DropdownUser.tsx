import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import adminImg from '../../images/user/admin1.jpg';
import axios from 'axios';
import { TbLogout2 } from 'react-icons/tb';
import { MdOutlineLocationOn } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const userRole = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = JSON.parse(localStorage.getItem('email') || '{}');
  const companyName = localStorage.getItem('companyName');
  const branchName = localStorage.getItem('branchName');

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/account/admin-logout/',
        {
          refresh_token: localStorage.getItem('refresh_token'),
        },
      );

      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('companyName');
        localStorage.removeItem('branchName');
        localStorage.removeItem('ID');
        localStorage.removeItem('branchId');
        localStorage.removeItem('companyID');
        window.location.href = '/'; // Redirect to the homepage after logout
      }
    } catch (error) {
      console.error('Logout failed:', error.response);
    }
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userEmail}
          </span>
          {/* <span className="block text-xm text-black">{userEmail}</span> */}
          <span className="block text-xm">
            {' '}
            {branchName || companyName || userRole}
          </span>
        </span>

        <span className="h-9 w-9 rounded-full">
          <img src={adminImg} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon
                as={FaRegUser}
                width="22px"
                height="22px"
                className="fill-current"
              />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon
                as={MdOutlineLocationOn}
                width="22px"
                height="22px"
                className="fill-current"
              />
              All Locations
            </Link>
          </li>
          <li>
            <Link
              to="/pages/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon
                as={IoSettingsOutline}
                width="22px"
                height="22px"
                className="fill-current"
              />
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              to="/reset-password"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon
                as={IoSettingsOutline}
                width="22px"
                height="22px"
                className="fill-current"
              />
              Reset Password
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <Icon as={TbLogout2} width="22px" height="22px" />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
