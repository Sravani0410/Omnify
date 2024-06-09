import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import { FaRegCalendarCheck, FaRegDotCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { LuHash } from "react-icons/lu";

const Table = ({ data,selectedColumns }) => {
  return (
    <div className="px-0 scroll-smooth overflow-y-auto">
      <table className="mt-4 w-full min-w-max table-auto text-left overflow-y">
        <thead>
          <tr className="bg-gray-100 border-b">
          {selectedColumns.includes('created_on') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegCalendarCheck /> Created On
                </p>
              </th>
            )}
            {selectedColumns.includes('payer') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegUser /> Payer
                </p>
              </th>
            )}
            {selectedColumns.includes('status') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegDotCircle /> Status
                </p>
              </th>
            )}
            {selectedColumns.includes('email') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                  <LuHash /> Email
                </p>
              </th>
            )}
            {selectedColumns.includes('payer_phone') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                  <LuHash /> Payer Phone
                </p>
              </th>
            )}
            {selectedColumns.includes('services') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                  <LuHash /> Services
                </p>
              </th>
            )}
            {selectedColumns.includes('scheduled') && (
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegCalendarCheck /> Scheduled
                </p>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => {
            // console.log(el);
            return (
              <tr key={el.id}>
                 {selectedColumns.includes('created_on') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                        {el.created_on}
                      </p>
                    </div>
                  </td>
                )}
                {selectedColumns.includes('payer') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.payer}
                    </p>
                  </td>
                )}
                {selectedColumns.includes('status') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className={`flex flex-row font-sans select-none ${
                          el.status == "Inactive"
                            ? "bg-slate-100 text-black"
                            : el.status == "Active"
                            ? "bg-green-100 text-green-700"
                            : el.status === "Private"
                            ? "bg-slate-100 text-green-700"
                            : el.status === "Public"
                            ? "bg-slate-100 text-amber-600"
                            : el.status === "Disable"
                            ? "bg-slate-100 text-red-600"
                            : el.status === "Draft"
                            ? "bg-slate-100 text-blue-500"
                            : "bg-slate-100 text-yellow-500"
                        } py-1 px-2 text-xs rounded-md`}
                      >
                        <GoDotFill />
                        <span className="">{el.status}</span>
                      </div>
                    </div>
                  </td>
                )}
                {selectedColumns.includes('email') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.email}
                    </p>
                  </td>
                )}
                {selectedColumns.includes('payer_phone') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.payer_phone}
                    </p>
                  </td>
                )}
                {selectedColumns.includes('services') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.services}
                    </p>
                  </td>
                )}
                {selectedColumns.includes('scheduled') && (
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.scheduled}
                    </p>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
