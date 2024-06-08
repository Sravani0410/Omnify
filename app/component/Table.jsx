import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import { FaRegCalendarCheck, FaRegDotCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { LuHash } from "react-icons/lu";

const Table = ({ data }) => {
  console.log("data=========>", data);
  return (
    <div className="overflow-scroll px-0 scroll-smooth">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                <FaRegCalendarCheck /> Created On{" "}
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                <FaRegUser /> Payer{" "}
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                <FaRegDotCircle /> Status{" "}
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                <LuHash /> Email{" "}
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                <LuHash /> Payer Phone{" "}
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-0 font-normal">
                <LuHash /> Services
              </p>
            </th>
            <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                <FaRegCalendarCheck /> Scheduled
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => {
            console.log(el);
            return (
              <tr key={el.id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.created_on}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                    {el.payer}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div
                      className={`flex flex-row font-sans select-none ${
                        el.status == "Inactive"
                          ? "bg-slate-100 text-black"
                          : el.status == "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      } py-1 px-2 text-xs rounded-md`}
                    >
                      <GoDotFill />
                      <span className="">{el.status}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                    {el.email}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                    {el.payer_phone}
                  </p>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                    {el.services}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                    {el.scheduled}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
