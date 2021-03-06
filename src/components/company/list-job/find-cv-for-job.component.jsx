import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { selectIdsInResumeJob } from './../../../redux/resumeJob/resumeJob.selectors';
import { useForm, useWatch } from 'react-hook-form';
import InputApp from './../../input-app/input-app.component';
import MultiSelect from './../../input-app/muilti-select.component';
import { TECHNOLOGY_SKILL } from './../../../data/input.data';
import Button from '../../button/button.component';
import LoadingSmall from '../../loading-small/loading-small.component';
import { Link } from 'react-router-dom';
import join from 'lodash-es/join';
import { loadListCvStart } from './../../../redux/cv/cv.action';
import {
  selectListCvData,
  selectLoadingApi,
  selectTotalCv,
} from './../../../redux/cv/cv.selectors';
import PaginatedItems from '../../paginate/paginate.component';
import { updateResumeJobStart } from './../../../redux/resumeJob/resumeJob.action';
import { saveCvInJob } from '../../../redux/job/job.action';
import { selectDetailJob } from './../../../redux/job/job.selectors';

const FindCvForJob = ({
  jobInfo,
  loading,
  loadListCv,
  listCv,
  total,
  idsCv,
  saveCv,
}) => {
  const { control, register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      skills: [],
      slug: '',
      page: 0,
    },
  });

  let skills = useWatch({ control, name: 'skills' });
  let maxOptions = 5;
  let displayPerPage = 3;
  const page = useWatch({ control, name: 'page' });

  const renderSearch = (data) => {
    let query = `?page=${page + 1}&limit=${displayPerPage}`;
    const { skills, slug } = data;

    if (skills.length > 0)
      query = query.concat(
        `&skills=${encodeURIComponent(`${join(skills, ',')}`)}`
      );
    if (slug) query = query.concat(`&slug=${slug}`);

    return query;
  };

  useEffect(() => {
    loadListCv(`?page=1&limit=${displayPerPage}`);
  }, [loadListCv, page, displayPerPage]);

  const onSubmit = (data) => {
    // alert(JSON.stringify(renderSearch(data)));
    setValue('page', 0);
    loadListCv(renderSearch(data));
  };

  const renderCurrent = () => {
    if ((page + 1) * displayPerPage > total) return total;
    else return (page + 1) * displayPerPage;
  };
  const handleChangePage = (pageValue) => {
    setValue('page', pageValue);
    const data = getValues();
    loadListCv(renderSearch(data));
  };

  const renderResponse = useCallback((res) => {
    switch (res) {
      case 'tu-choi':
        return {
          text: 'T??? ch???i',
          color: 'bg-red-400',
          status: 't??? ch???i',
        };
      case 'phu-hop':
        return {
          text: 'Ph?? h???p',
          color: 'bg-green-400',
          status: 'ph?? h???p',
        };
      case 'hen-phong-van':
        return {
          text: 'H???n ph???ng v???n',
          color: 'bg-blue-400',
          status: 'h???n ph???ng v???n',
        };
      default:
        return {
          text: 'Ch??a ph???n h???i',
          color: 'bg-gray-400',
          status: 'chua-phan-hoi',
        };
    }
  }, []);
  console.log('jobInfo', jobInfo);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="capitalize font-medium">Ti??u ?????: {jobInfo?.title}</div>
      <div className="grid md:grid-cols-12 md:gap-4">
        <div className="md:col-span-3 bg-white shadow-lg rounded-sm p-4 max-h-72">
          <div className="space-y-2">
            <div className="uppercase text-indigo-500 font-medium text-lg mt-2">
              T??m ki???m theo ti??u ?????
            </div>
            <div className="font-medium">T??? kho?? t??m ki???m</div>
            <InputApp
              name="slug"
              register={register}
              placeholder="Nh???p t??? kho?? t??m ki???m"
              className="px-2 py-1 rounded-sm"
            />
            <div>T??m ki???m theo k??? n??ng</div>
            <div>
              <MultiSelect
                name="skills"
                control={control}
                placeholder="K?? n??ng"
                options={skills?.length === maxOptions ? [] : TECHNOLOGY_SKILL}
                noOptionsMessage={() => {
                  return skills?.length === maxOptions
                    ? 'B???n ???? ?????t t???i ??a l???a ch???n'
                    : 'Kh??ng t??m th???y k???t qu??? ph?? h???p';
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button text="T??m CV" full btnType="submit" />
            </div>
          </div>
        </div>
        <div className="-my-2 overflow-x-auto col-span-9">
          <div className="flex items-center md:justify-end">
            <PaginatedItems
              itemsPerPage={displayPerPage}
              pageCount={Math.ceil(total / displayPerPage)}
              cb={handleChangePage}
              page={page}
            />
            <div className="mx-2 w-12 h-full">
              {renderCurrent()}/{total}
            </div>
          </div>
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full">
                {loading ? (
                  <tbody className="text-center text-base flex items-center justify-center">
                    <tr>
                      <td>
                        <LoadingSmall />
                      </td>
                    </tr>
                  </tbody>
                ) : listCv?.length === 0 ? (
                  <tbody className="text-center text-base">
                    <tr>
                      <td>Kh??ng c?? k???t qu??? ph?? h???p</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listCv?.map((cv) => (
                      <tr key={cv.id}>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="flex space-x-2">
                            <img
                              src={cv.header?.photo}
                              alt=""
                              className="w-8 h-8"
                            />
                            <div className="space-y-1">
                              <div className="flex font-medium">
                                {cv.header?.name}
                              </div>
                              <div>{cv.header?.title}</div>

                              <div>{cv.viewed ? <div>???? xem</div> : null}</div>
                              <div>
                                {cv.received === 'theo-doi' ? (
                                  <div>??ang theo d??i</div>
                                ) : null}
                              </div>
                              <Link
                                to={`/preview/${cv.id}`}
                                className="text-indigo-500 hover:text-indigo-700"
                              >
                                Chi ti???t
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div>
                              <div className="font-medium">H???c v???n</div>
                              <div>
                                {cv.sections
                                  ?.filter(
                                    (section) =>
                                      section.record === 'EducationSection'
                                  )[0]
                                  .items?.map((item) => (
                                    <div key={item?._id} className="flex">
                                      <div>{item?.degree}</div>
                                      <span className="mx-1 text-indigo-500 font-bold">
                                        -
                                      </span>
                                      <div>{item?.institution}</div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">Kinh nghi???m</div>
                              <div>
                                {cv.sections
                                  ?.filter(
                                    (section) =>
                                      section.record === 'ExperienceSection'
                                  )[0]
                                  .items?.map((item) => (
                                    <div key={item?._id} className="flex">
                                      <div>{item?.position}</div>
                                      <span className="mx-1 text-indigo-500 font-bold">
                                        -
                                      </span>
                                      <div>{item?.workplace}</div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">K??? n??ng ch??nh</div>
                              <div className="flex space-x-2">
                                {cv.sections
                                  ?.filter(
                                    (section) =>
                                      section.record === 'TechnologySection'
                                  )[0]
                                  .items?.map((item) =>
                                    item?.tags?.map((tag) => (
                                      <div
                                        className="bg-gray-200 px-1 rounded-sm"
                                        key={tag?.text}
                                      >
                                        {tag?.text}
                                      </div>
                                    ))
                                  )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-y-1">
                          {idsCv[cv?.id]?.response && (
                            <div className="flex flex-wrap item-center space-x-1">
                              <div
                                className={`w-4 h-4 mt-0.5 rounded-full ${
                                  renderResponse(idsCv[cv.id]?.response).color
                                }`}
                              ></div>
                              <div>
                                {renderResponse(idsCv[cv.id]?.response).text}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col space-y-2">
                            <Button
                              className={
                                jobInfo?.savedCv?.find((job) => job === cv?.id)
                                  ? 'bg-gray-400 hover:bg-gray-500'
                                  : ''
                              }
                              text={
                                jobInfo?.savedCv?.find((job) => job === cv?.id)
                                  ? 'B??? l??u'
                                  : 'L??u ngay'
                              }
                              size="small"
                              onClick={saveCv({
                                jobId: jobInfo?.id,
                                cvId: cv?.id,
                              })}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => ({
  jobInfo: selectDetailJob(ownProps.jobId)(state),
  listCv: selectListCvData(state),
  loading: selectLoadingApi(state),
  total: selectTotalCv(state),
  idsCv: selectIdsInResumeJob(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadListCv: (qr) => dispatch(loadListCvStart(qr)),
  editResumeJob: (data) => dispatch(updateResumeJobStart(data)),
  saveCv: (data) => () => dispatch(saveCvInJob(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindCvForJob);
