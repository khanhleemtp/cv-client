import { Link } from 'react-router-dom';

import clsx from 'clsx';

const CompanyCardSearch = ({ company }) => {
  return (
    <div className="space-y-2 w-full h-auto md:h-32 shadow-2xl ring-1 ring-gray-300 rounded-md p-4 hover:bg-gray-200">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
        <img
          src={company?.logo}
          alt=""
          className="w-8 h-8 md:w-12 md:h-12 rounded-full"
        />
        <div className="flex flex-col flex-grow space-y-2 w-44 md:w-72">
          <Link to={`/company-page/${company?._id}`}>
            <div
              className={clsx(
                'truncate text-gray-600 capitalize font-medium max-w-xs'
              )}
              title={company?.name}
            >
              {company?.name}
            </div>
          </Link>
          <div className="flex flex-col divide-x-0 md:flex-row md:divide-x-4">
            <div className="pr-2 truncate  w-1/2">{company?.address}</div>
            <div className="pl-2 truncate w-1/2">{company?.size} nhân sự</div>
          </div>
          <div className="flex space-y-2 flex-col w-full md:flex-row md:space-x-2 md:space-y-0 text-nowrap">
            {company?.fields?.map((field) => (
              <div
                className="truncate p-1 w-44 md:w-auto bg-gray-300 rounded-sm"
                key={field}
              >
                {field}
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex self-start rounded-full ring-1 ring-indigo-400 w-6 h-6 items-center justify-center cursor-pointer"
          title={`${company?.listJob?.length} việc làm`}
        >
          {company?.listJob?.length}
        </div>
      </div>
    </div>
  );
};

export default CompanyCardSearch;
