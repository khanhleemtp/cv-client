import { Link } from 'react-router-dom';

import clsx from 'clsx';
import EditorPreview from './../editor-preview/editor-preview.component';

const CompanyCard = ({ company }) => {
  return (
    <div className="space-y-2 w-full h-36 shadow-2xl ring-1 ring-gray-300 rounded-md p-4 hover:bg-gray-200">
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 md:h-12 md:w-12 rounded-lg">
          <img
            src={company?.logo}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <Link to={`/company-page/${company?._id}`}>
            <div
              className={clsx(
                'truncate text-gray-600 capitalize font-medium w-44 md:w-full max-w-xs'
              )}
              title={company?.name}
            >
              {company?.name}
            </div>
          </Link>
          <div>Hiện tại đang có {company?.listJob?.length} việc làm</div>
          <div className="rounded-lg text-sm line-clamp-2 container w-52 md:w-full max-w-sm">
            <EditorPreview element={company?.descriptions} />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'truncate text-gray-600 capitalize font-medium w-44 md:w-full max-w-xs'
        )}
        title={company?.area}
      >
        {company?.area}
      </div>
    </div>
  );
};

export default CompanyCard;
