import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectEmployerHost,
  selectlistEmployer,
  selectLoadingListEmployer,
  selectCompanyEmployer,
  selectEmployer,
  selectTotalEmployer,
} from '../../../redux/employer/employer.selectors';
import PaginatedItems from '../../paginate/paginate.component';
import moment from 'moment';
import clsx from 'clsx';

import {
  loadListEmployerStart,
  updateEmployerStart,
} from '../../../redux/employer/employer.action';
import LoadingSmall from '../../loading-small/loading-small.component';
import ActiveEmployerSwitch from './active-employer.component';
import InputSelect from '../../input-app/input-select.component';

const CompanyListStaff = ({
  listEmployer,
  loading,
  company,
  loadListEmployer,
  updateEmployer,
  total,
}) => {
  const { register, setValue, control } = useForm({
    defaultValues: {
      active: 'all',
      page: 0,
    },
  });

  const handleChangePage = (page) => setValue('page', page);

  const page = useWatch({ control, name: 'page' });
  const active = useWatch({ control, name: 'active' });

  useEffect(() => {
    const query =
      active === 'all'
        ? `?company=${company?.id}&page=${page}&limit=4`
        : `?company=${company?.id}&page=${page}&limit=4&active=${active}`;
    loadListEmployer(query);
  }, [loadListEmployer, company, active, page]);

  const renderCurrent = () => {
    if ((page + 1) * 4 > total) return total;
    else return (page + 1) * 4;
  };

  return (
    <div className="flex flex-col mx-auto container">
      <div className="flex flex-col md:flex-row justify-end items-center my-2 mx-8">
        <InputSelect
          register={register}
          name="active"
          options={[
            { label: 'Đã kích hoạt', value: true },
            { label: 'Chưa kích hoạt', value: false },
            {
              label: 'Tất cả',
              value: 'all',
            },
          ]}
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
                    Tên nhân viên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sđt
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vị trí
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thời gian
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              {loading ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>
                      <LoadingSmall />
                    </td>
                  </tr>
                </tbody>
              ) : listEmployer?.length === 0 ? (
                <tbody className="text-center text-base">
                  <tr>
                    <td>Không có kết quả nào phù hợp</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {listEmployer?.map((employer) => (
                    <tr key={employer?.id}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div
                          className={clsx('flex items-center', {
                            'text-red-500 font-medium italic':
                              employer?.id === employer?.company?.host,
                          })}
                        >
                          {employer?.userInfo?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employer?.userInfo?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employer?.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employer?.position}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(employer?.updatedAt).format('DD/MM/YYYY')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                        <div className="text-indigo-600 hover:text-indigo-900 flex items-center select-none space-x-2">
                          <div title="Chỉnh sửa">
                            <ActiveEmployerSwitch
                              employer={employer}
                              activeEmployer={updateEmployer}
                              disabled={
                                employer?.id === employer?.company?.host
                              }
                            />
                          </div>
                        </div>
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

const mapStateToProps = createStructuredSelector({
  isHost: selectEmployerHost,
  listEmployer: selectlistEmployer,
  loading: selectLoadingListEmployer,
  company: selectCompanyEmployer,
  employer: selectEmployer,
  total: selectTotalEmployer,
});

const mapDispatchToProps = (dispatch) => ({
  loadListEmployer: (query) => dispatch(loadListEmployerStart(query)),
  updateEmployer: (data) => dispatch(updateEmployerStart(data, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListStaff);
