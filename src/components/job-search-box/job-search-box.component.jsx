import { useState, Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';

import MultiSelect from './../input-app/muilti-select.component';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  AREA,
  TECHNOLOGY_SKILL,
  POSITION_JOB,
  TYPE_JOB,
  EXPERIENCE_JOB,
  SALARY_JOB,
} from '../../data/input.data';
import SingleSelect from './../input-app/single-select.component';
import InputApp from '../input-app/input-app.component';
import Button from './../button/button.component';
import { connect } from 'react-redux';
import { loadingListJobStart } from '../../redux/job/job.action';
import { join } from 'lodash-es';

const JobSearchBox = ({ loadListJob }) => {
  let { register, control, handleSubmit, setValue } = useFormContext();

  // let page = useWatch({
  //   control,
  //   name: 'page',
  // });

  useEffect(() => {
    loadListJob(`?page=1&limit=9`);
  }, [loadListJob]);

  const renderSearch = (data) => {
    const { skills, area, title, position, type, experience, salary } = data;
    setValue('page', 0);
    let query = `?page=1&limit=9`;

    if (skills.length > 0)
      query = query.concat(
        `&skills=${encodeURIComponent(`${join(skills, ',')}`)}`
      );
    if (area) query = query.concat(`&area=${area}`);
    if (title) query = query.concat(`&slug=${title}`);

    if (position) query = query.concat(`&position=${position}`);
    if (type) query = query.concat(`&type=${type}`);
    if (experience) query = query.concat(`&experience=${experience}`);
    if (salary) query = query.concat(`&salary=${salary}`);

    return query;
  };

  const maxOptions = 3;

  const skills = useWatch({ control, name: 'skills' });

  const [expand, setExpand] = useState(false);
  const handToggle = () => setExpand((pre) => !pre);
  const onSubmit = (data) => {
    // alert(JSON.stringify(renderSearch(data)));
    let qr = renderSearch(data);
    loadListJob(qr);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-xl text-center font-medium">
        T??m vi???c ph?? h???p v???i b???n
      </div>
      <div className="flex flex-col space-y-4 max-w-lg container mx-auto p-2 md:p-4 bg-gray-200">
        <div className="flex flex-col md:flex-row space-x-2 items-center space-y-2">
          <InputApp
            register={register}
            name="title"
            className="rounded-sm border-none"
            placeholder="T??m ki???m theo ti??u ?????"
          />
          <Button text="T??m ki???m" btnType="submit" className="" />
        </div>
        <div className=" flex justify-between">
          <div className="font-medium">T??m ki???m n??ng cao</div>
          <div
            className="text-indigo-400 cursor-pointer select-none hover:text-indigo-500"
            onClick={handToggle}
          >
            {expand ? 'Thu g???n' : 'M??? r???ng'}
          </div>
        </div>
        <Transition
          show={expand}
          enter="transition-all ease-in"
          enterFrom="opacity-0 h-10"
          enterTo="opacity-100 h-32"
          leave="transition-all ease-out"
          leaveFrom="opacity-100 h-32"
          leaveTo="opacity-0 h-0"
        >
          <Transition.Child as={Fragment}>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <MultiSelect
                  name="skills"
                  control={control}
                  placeholder="K?? n??ng"
                  options={
                    skills?.length === maxOptions ? [] : TECHNOLOGY_SKILL
                  }
                  noOptionsMessage={() => {
                    return skills?.length === maxOptions
                      ? 'B???n ???? ?????t t???i ??a l???a ch???n'
                      : 'Kh??ng t??m th???y k???t qu??? ph?? h???p';
                  }}
                />
              </div>
              <SingleSelect
                name="area"
                control={control}
                placeholder="Khu v???c"
                options={AREA}
              />
              <SingleSelect
                name="position"
                control={control}
                placeholder="V??? tr??"
                options={POSITION_JOB}
              />
              <SingleSelect
                name="type"
                control={control}
                placeholder="Ki???u c??ng vi???c"
                options={TYPE_JOB}
              />
              <SingleSelect
                name="experience"
                control={control}
                placeholder="Kinh nghi???m"
                options={EXPERIENCE_JOB}
              />
              <SingleSelect
                name="salary"
                control={control}
                placeholder="M???c l????ng"
                options={SALARY_JOB}
              />
            </div>
          </Transition.Child>
        </Transition>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
});

export default connect(null, mapDispatchToProps)(JobSearchBox);
