import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
// import PopoverSetting from './../PopoverSetting';

import { loadListCompanyStart } from '../../../redux/company/company.action';
import PaginatedItems from './../../paginate/paginate.component';
import InputApp from './../../input-app/input-app.component';
import {
  selectTotalCompany,
  selectResultCompany,
  selectListCompany,
  selectLoadingCompany,
} from './../../../redux/company/company.selectors';
import CompanyCardChoice from './../../company-card/company-card-choice.component';
import CompanyCardLoading from './../../company-card/company-card-loading.component';

const FindCompany = ({ loadListCompany, listCompany, isLoading, total }) => {
  const { register, watch, setValue, control } = useForm({
    defaultValues: {
      search: '',
      page: 0,
    },
  });

  const handleChangePage = (page) => setValue('page', page);

  useEffect(() => {
    loadListCompany('?page=1&limit=4&status=accept');
  }, [loadListCompany]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const { search, page } = value;
      if (name === 'search') setValue('page', 0);

      const renderSearch = () => {
        if (!search) return `?status=accept&page=${page + 1}&limit=4`;
        return `?status=accept&name=${search}&page=${page + 1}&limit=4`;
      };
      loadListCompany(renderSearch());
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
            placeholder="Tìm công ty"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((load) => (
            <CompanyCardLoading key={load} />
          ))}
        </div>
      ) : listCompany?.length === 0 ? (
        <div className="text-center text-base">
          Không có kết quả nào phù hợp
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
          {listCompany?.map((company) => (
            <CompanyCardChoice company={company} key={company?.id} />
          ))}
        </div>
      )}
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListCompany: (query) => dispatch(loadListCompanyStart(query)),
});

const mapStateToProps = createStructuredSelector({
  listCompany: selectListCompany,
  isLoading: selectLoadingCompany,
  total: selectTotalCompany,
  result: selectResultCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(FindCompany);
