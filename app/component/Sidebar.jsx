import { FaRegCalendarAlt, FaUser, FaBox, FaListAlt, FaTachometerAlt, FaUserShield, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Front-Desk</h1>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-sm font-bold">Location Name</h2>
          <p>08:30 AM Tue 20 Jan</p>
          <p>UTC: +5 hours</p>
        </div>
        <nav>
          <ul>
            <li className="mb-2 flex items-center">
              <FaRegCalendarAlt className="mr-2" /> Orders
            </li>
            <li className="mb-2 flex items-center">
              <FaBox className="mr-2" /> Subscriptions
            </li>
            <li className="mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" /> Calendar
            </li>
            <li className="mb-2 flex items-center font-bold">
              <FaListAlt className="mr-2" /> Waitlist
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <div className="mb-4">
          <FaTachometerAlt className="mr-2" /> Dashboard
        </div>
        <div className="mb-4">
          <FaUserShield className="mr-2" /> Admin Name
        </div>
        <div>
          <FaQuestionCircle className="mr-2" /> Help Center
        </div>
      </div>
    </div>
  );
}
