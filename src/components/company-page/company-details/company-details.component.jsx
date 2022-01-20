import { useEffect } from 'react';
import {
  GlobeIcon,
  OfficeBuildingIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

import { Link } from 'react-router-dom';
// import Button from './../../button/button.component';
import EditorPreview from './../../editor-preview/editor-preview.component';
import { loadCompanyStart } from '../../../redux/company/company.action';
import { createStructuredSelector } from 'reselect';
import {
  selectCompany,
  selectSingleLoadingCompany,
} from '../../../redux/company/company.selectors';
import { connect } from 'react-redux';
import ListJobCompany from './list-job-company.component';
import LoadingSmall from './../../loading-small/loading-small.component';

const CompanyDetails = ({ loadCompany, company, loading, ...props }) => {
  console.log(props?.match.params.companyId);

  let companyId = props?.match?.params?.companyId;

  useEffect(() => {
    loadCompany(companyId);
    return () => {};
  }, [companyId, loadCompany]);

  return loading ? (
    <LoadingSmall />
  ) : (
    <div className="container mx-auto max-w-6xl my-16">
      {/* Cover */}
      <div className="h-80 bg-white relative flex items-end p-4">
        <img
          src={company?.logo}
          alt="cover"
          className="h-1/3 md:h-full w-full object-cover absolute inset-0"
        />
        <div className="items-end relative w-full flex flex-wrap space-y-1 md:space-y-4 md:space-x-2">
          <div className="p-1 rounded-lg bg-white shadow-lg ring-1">
            <img
              src={company?.logo}
              alt="cover"
              className="object-contain h-32 w-32"
            />
          </div>
          <div className="bg-white text-gray-600 p-4 md:space-y-4 flex-grow truncate">
            <div className="font-medium text-lg md:text-2xl truncate">
              {company?.name}
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <GlobeIcon className="w-6 h-6" />
                <Link to={{ pathname: company?.website }} target="_blank">
                  {company?.website}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <OfficeBuildingIcon className="w-6 h-6" />
                <div> {company?.size} nhân viên</div>
              </div>
              <div></div>
            </div>
          </div>
          {/* <div className="">
            <Button text="Theo dõi công ty" />
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-6 my-2 gap-2">
        <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Giới thiệu công ty</div>
          </div>

          <EditorPreview element={company?.descriptions} />
        </div>
        <div className="col-span-6 md:col-span-2 bg-white p-6">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Địa chỉ</div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <LocationMarkerIcon className="w-8 h-8" />
            <div>{company?.address}</div>
          </div>

          <div className="divide-x-4 flex divide-indigo-400 my-2">
            <div className=""></div>
            <div className="pl-3 text-xl">Khu vực</div>
          </div>
          <div className="flex space-x-2 my-2 cursor-pointer">
            {company?.area?.map((add) => (
              <div className="p-2 bg-gray-200 rounded-full truncate" key={add}>
                <div>{add}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
          <div className="divide-x-4 flex divide-indigo-400">
            <div className=""></div>
            <div className="pl-3 text-xl">Tuyển dụng</div>
          </div>
          {company && <ListJobCompany company={company} />}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadCompany: (id) => dispatch(loadCompanyStart(id)),
});

const mapStateToProps = createStructuredSelector({
  company: selectCompany,
  loading: selectSingleLoadingCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
