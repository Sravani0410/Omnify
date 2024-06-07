import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen flex flex-col justify-between p-4">
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Front Desk</h2>
          <p>Location Name</p>
          <p>08:30 AM Tue 20 Jan</p>
        </div>
        <div className="mb-4">
          <ul>
            <li>Orders</li>
            <li>Subscriptions</li>
            <li>Calendar</li>
            <li>Waitlist</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <p>Dashboard</p>
          <p>Admin Name</p>
          <p>Help Center</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
