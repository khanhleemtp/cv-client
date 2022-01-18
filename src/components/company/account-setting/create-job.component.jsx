import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './../../button/button.component';
import AppEditor from './../../editor/editor.component';
import { useForm, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';
import InputApp from './../../input-app/input-app.component';
import MultiSelect from '../../input-app/muilti-select.component';
import InputSelect from './../../input-app/input-select.component';
import { createStructuredSelector } from 'reselect';
import InputDate from '../../input-app/date/input-date.component';
import { createJobStart } from './../../../redux/job/job.action';
import {
  TYPE_JOB,
  EXPERIENCE_JOB,
  AREA,
  POSITION_JOB,
  TECHNOLOGY_SKILL,
  SALARY_JOB,
} from './../../../data/input.data';
import { selectCompanyEmployer } from '../../../redux/employer/employer.selectors';

const jobSchema = yup.object().shape({
  title: yup
    .string()
    .required('Bạn cần nhập tiêu đề công việc')
    .min(3, 'Tên cần ít nhất 3 ký tự'),
  type: yup.string().required('Bạn cần nhập kiểu công việc'),
  position: yup.string().required('Bạn cần nhập vị trí công việc'),
  numOfPerson: yup
    .number()
    .typeError('Bạn cần nhập số ')
    .required('Bạn cần nhập số lượng'),
  salary: yup.string().required('Bạn cần nhập mức lương'),
  requirements: yup.string().required('Bạn cần nhập yêu cầu công việc'),
  descriptions: yup.string().required('Bạn cần nhập mô tả công việc'),
  benefits: yup.string().required('Bạn cần nhập quyền lợi ứng viên'),
});

const CreateJobForm = ({ createJob, company }) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      company: company?.id,
    },
    resolver: yupResolver(jobSchema),
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = methods;

  const resetValue = () => reset({});
  const handleSubmitOnClick = (data) => {
    createJob({ ...data, company: company.id });
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-2 space-x-0 md:space-x-4 md:space-y-0"></div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitOnClick)} className="w-full">
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="col-span-2">
              <InputApp
                label="Tiêu đề tuyển dụng"
                placeholder="Nhập tiều đề"
                register={register}
                name="title"
                error={errors?.title?.message}
              />
            </div>
            <InputApp
              label="Số lượng"
              placeholder="Nhập số lượng"
              register={register}
              name="numOfPerson"
              error={errors?.numOfPerson?.message}
            />
            <InputSelect
              register={register}
              label="Vị trí công việc"
              options={POSITION_JOB}
              name="position"
              error={errors?.position?.message}
            />
            <InputSelect
              register={register}
              label="Mức lương"
              options={SALARY_JOB}
              name="salary"
              error={errors?.salary?.message}
            />
            <InputSelect
              register={register}
              label="Loại hình công việc"
              options={TYPE_JOB}
              name="type"
              error={errors?.type?.message}
            />
            <InputSelect
              register={register}
              label="Kinh nghiệm"
              options={EXPERIENCE_JOB}
              name="experience"
              error={errors?.experience?.message}
            />

            <div className="col-span-2">
              <MultiSelect
                name="area"
                control={control}
                label="Khu vực"
                placeholder="Chọn khu vực"
                options={AREA}
              />
              {errors?.fields?.message && (
                <div className="text-red-500">{errors?.area?.message}</div>
              )}
            </div>

            <div className="col-span-2 pr-2">
              <AppEditor
                control={control}
                name="descriptions"
                label="Mô tả công việc"
              />
              {errors?.descriptions?.message && (
                <div className="text-red-500">
                  {errors?.descriptions?.message}
                </div>
              )}
            </div>
            <div className="col-span-2 pr-2">
              <AppEditor
                control={control}
                name="requirements"
                label="Yêu cầu ứng viên"
              />
              {errors?.descriptions?.message && (
                <div className="text-red-500">
                  {errors?.requirements?.message}
                </div>
              )}
            </div>
            <div className="col-span-2 pr-2">
              <AppEditor control={control} name="benefits" label="Quyền lợi" />
              {errors?.descriptions?.message && (
                <div className="text-red-500">{errors?.benefits?.message}</div>
              )}
            </div>
            <div className="col-span-2">
              <MultiSelect
                name="skills"
                control={control}
                label="Kỹ năng liên quan"
                placeholder="Chọn kĩ năng"
                options={TECHNOLOGY_SKILL}
              />
              {errors?.fields?.message && (
                <div className="text-red-500">{errors?.skills?.message}</div>
              )}
            </div>

            <InputDate name="to" label="Hạn nhận CV" />
          </div>

          <div className="space-x-2 my-2 flex items-center justify-end">
            <Button
              text="Huỷ"
              className="bg-gray-400 hover:bg-gray-600"
              onClick={resetValue}
            />
            <Button text="Tạo công việc" btnType="submit" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createJob: (data) => dispatch(createJobStart(data)),
});

const mapStateToProps = createStructuredSelector({
  company: selectCompanyEmployer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobForm);
