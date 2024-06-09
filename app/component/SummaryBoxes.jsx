import React from "react";

const SummaryBoxes = ({ data }) => {
  // console.log("-----data----------", data);
  const waitlistdata = data.length;
  const leaddata = data.filter((item) => item.status === "Lead").length;
  data.sort((a, b) => new Date(a.created_on) - new Date(b.created_on));

  const newData = data.slice(-10);
  const count = newData.length;
  return (
    <div className="h-[3%] grid gap-2 grid-cols-3 p-4 mb-10">
      <div className="p-4 bg-white rounded-lg shadow">
        {`All Waitlists ${waitlistdata}`}{" "}
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        {`Newly Added ${count}`}{" "}
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        {`Leads ${leaddata}`}{" "}
      </div>
    </div>
  );
};

export default SummaryBoxes;
