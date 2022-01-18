import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { loadListCompanyStart } from './../../../redux/company/company.action';
import {
  selectLoadingCompany,
  selectTotalCompany,
  selectListCompany,
  selectResultCompany,
} from './../../../redux/company/company.selectors';
import InputApp from './../../input-app/input-app.component';
import PaginatedItems from './../../paginate/paginate.component';
import CompanyCardLoading from './../../company-card/company-card-loading.component';
import CompanyCardSearch from './../../company-card/company-card-search.component';

const CompanyOverview = ({
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
    <div className="flex flex-col mx-auto container p-2">
      <div className="flex flex-col md:flex-row justify-end items-center my-2 mx-8">
        <div className="max-w-xs mx-2 w-full">
          <InputApp
            name="search"
            register={register}
            placeholder="Tìm công ty"
          />
        </div>
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

      <div className="grid md:grid-cols-2 gap-4 my-2 max-w-6xl container mx-auto">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <CompanyCardLoading key={item} />
          ))
        ) : listCompany?.length === 0 ? (
          <div className="text-center text-base">
            Không có kết quả nào phù hợp
          </div>
        ) : (
          listCompany?.map((company) => (
            <CompanyCardSearch company={company} key={company?.id} />
          ))
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);
