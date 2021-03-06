import { useEffect } from 'react';
import InputSelect from '../input-app/input-select.component';
import { useForm, useWatch } from 'react-hook-form';
import { loadListCompanyStart } from './../../redux/company/company.action';
import { connect } from 'react-redux';
import {
  selectListCompany,
  selectLoadingCompany,
} from '../../redux/company/company.selectors';
import { createStructuredSelector } from 'reselect';
import LoadingSmall from './../loading-small/loading-small.component';
// import PopoverSetting from './../PopoverSetting';

import { PencilIcon, LinkIcon } from '@heroicons/react/solid';
import InputApp from './../input-app/input-app.component';
import {
  selectTotalCompany,
  selectResultCompany,
} from './../../redux/company/company.selectors';
import PaginatedItems from '../paginate/paginate.component';
import { openModal } from './../../redux/viewState/viewState.action';
import { STATUS_COMPANY_SEARCH } from '../../data/input.data';
import { Link } from 'react-router-dom';

const AdminUser = ({
  loadListCompany,
  listCompany,
  isLoading,
  total,
  editCompany,
}) => {
  const { register, watch, setValue, control } = useForm({
    defaultValues: {
      status: '',
      search: '',
      page: 0,
    },
  });

  const handleChangePage = (page) => setValue('page', page);

  useEffect(() => {
    loadListCompany('?page=1&limit=4');
    console.log('run here');
  }, [loadListCompany]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const { status, search, page } = value;
      if (name === 'search' || name === 'status') setValue('page', 0);

      const renderSearch = () => {
        if (status === '' && search === '') {
          return `?page=${page + 1}&limit=4`;
        }
        if (status && search === '') {
          return `?status=${status}&page=${page + 1}&limit=4`;
        }
        if (status === '' && search) {
          return `?slug=${search}&page=${page + 1}&limit=4`;
        }
        return `?status=${status}&slug=${search}&page=${page + 1}&limit=4`;
      };
      loadListCompany(renderSearch(status, search));
    });
    return () => subscription.unsubscribe();
  }, [loadListCompany, watch, setValue]);

  const page = useWatch({ control, name: 'page' });

  const renderCurrent = () => {
    if ((page + 1) * 4 > total) return total;
    else return (page + 1) * 4;
  };

  return (
    <div className="flex flex-col mx-auto container">
      <div className="flex flex-col md:flex-row justify-end items-center my-2 mx-8">
        <div className="max-w-xs mx-2 w-full">
          <InputApp
            name="search"
            register={register}
            placeholder="T??m c??ng ty"
          />
        </div>

        <InputSelect
          register={register}
          name="status"
          options={STATUS_COMPANY_SEARCH}
          label=""
        />
      </div>

      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    T??n c??ng ty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Th??ng tin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quy m?? c??ng ty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              {isLoading ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>
                      <LoadingSmall />
                    </td>
                  </tr>
                </tbody>
              ) : listCompany?.length === 0 ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>Kh??ng c?? k???t qu??? n??o ph?? h???p</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {listCompany?.map((company) => (
                    <tr key={company?.name}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {company?.logo ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={company?.logo}
                                alt=""
                              />
                            ) : (
                              <img className="h-10 w-10 rounded-full" alt="" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {company?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {company?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-500 font-medium">
                          Ch??? c??ng ty: {company?.hostInfo?.userInfo?.name}
                        </div>
                        <div className="text-sm text-gray-900">
                          {company?.hostInfo?.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company?.website}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {company?.size}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {company?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                        <div className="text-indigo-600 hover:text-indigo-900">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={() => editCompany(company)}
                          />
                        </div>
                        <Link
                          className="text-indigo-600 hover:text-indigo-900"
                          to={`/company-page/${company?.id}`}
                        >
                          <LinkIcon className="w-6 h-6" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <div className="flex items-center justify-end">
              <PaginatedItems
                itemsPerPage={4}
                pageCount={Math.ceil(total / 4)}
                cb={handleChangePage}
                page={page}
              />
              <div className="mx-2 w-12 h-full">
                {renderCurrent()}/{total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListCompany: (query) => dispatch(loadListCompanyStart(query)),
  editCompany: (company) =>
    dispatch(
      openModal('UPDATE_COMPANY', {
        company,
      })
    ),
});

const mapStateToProps = createStructuredSelector({
  listCompany: selectListCompany,
  isLoading: selectLoadingCompany,
  total: selectTotalCompany,
  result: selectResultCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
