import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import Button from './../../button/button.component';
import AppEditor from './../../editor/editor.component';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { openModal } from './../../../redux/viewState/viewState.action';
import InputApp from './../../input-app/input-app.component';
import InputFile from './input-file.component';
import MultiSelect from '../../input-app/muilti-select.component';
import InputSelect from './../../input-app/input-select.component';
import FindCompany from './find-company.component';

import { registerCompanyStart } from './../../../redux/company/company.action';
import {
  SIZE_COMPANY,
  FIELDS_COMPANY,
  TYPE_COMPANY,
  AREA,
} from '../../data/input.data';

const companySchema = yup.object().shape({
  name: yup
    .string()
    .required('Bạn cần nhập tên công ty')
    .min(3, 'Tên cần ít nhất 3 ký tự'),
  email: yup
    .string()
    .required('Bạn cần nhập email')
    .email('Bạn cần nhập đúng định dạng email'),
  tax: yup.string().required('Bạn cần nhập mã thuế'),
  type: yup.string().required('Bạn cần nhập loại công ty'),
  size: yup.string().required('Bạn cần nhập quy mô công ty'),
  phone: yup.string().required('Bạn số điện thoại'),
  website: yup.string().required('Bạn cần nhập địa chỉ website'),
  descriptions: yup.string().required('Bạn cần nhập mô tả công ty'),
});

const AccountCompany = ({ uploadImage, registerCompany }) => {
  const [isCreate, setIsCreate] = useState(true);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      tax: '',
      fields: [],
      area: [],
      type: '',
      size: '',
      phone: '',
      website: '',
      descriptions: '',
    },
    resolver: yupResolver(companySchema),
  });

  const handleSubmitOnClick = (data) => {
    registerCompany(data);
    console.log('dataCOm', data);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-2 space-x-0 md:space-x-4 md:space-y-0">
        <Button
          text="Tìm kiếm công ty"
          full
          onClick={() => setIsCreate(false)}
        />
        <Button text="Tạo mới công ty" full onClick={() => setIsCreate(true)} />
      </div>
      {isCreate ? (
        <form onSubmit={handleSubmit(handleSubmitOnClick)} className="w-full">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            <InputFile
              placeholder="Cập nhật"
              label="Logo"
              onClick={uploadImage}
            />

            <InputApp
              label="Tên công ty"
              placeholder="Tên công ty"
              register={register}
              name="name"
              error={errors?.name?.message}
            />
            <InputApp
              label="Email công ty"
              placeholder="Email công ty"
              register={register}
              name="email"
              error={errors?.email?.message}
            />
            <InputApp
              label="Số điện thoại"
              placeholder="Số điện thoại"
              register={register}
              name="phone"
              error={errors?.phone?.message}
            />
            <InputSelect
              register={register}
              label="Quy mô công ty"
              options={SIZE_COMPANY}
              name="size"
              error={errors?.size?.message}
            />
            <div>
              <MultiSelect
                name="fields"
                control={control}
                label="Lĩnh vực"
                placeholder="Chọn nhiều lĩnh vực"
                options={FIELDS_COMPANY}
              />
              {errors?.fields?.message && (
                <div className="text-red-500">{errors?.fields?.message}</div>
              )}
            </div>
            <div>
              <MultiSelect
                name="area"
                control={control}
                label="Khu vực"
                placeholder="Chọn nhiều lĩnh vực"
                options={AREA}
              />
              {errors?.fields?.message && (
                <div className="text-red-500">{errors?.fields?.message}</div>
              )}
            </div>
            <InputSelect
              register={register}
              label="Kiểu công ty"
              options={TYPE_COMPANY}
              name="type"
              error={errors?.type?.message}
            />
            <InputApp
              label="Mã số thuế"
              placeholder="Mã số thuế"
              register={register}
              name="tax"
              error={errors?.tax?.message}
            />
            <InputApp
              label="Website"
              placeholder="Website"
              register={register}
              name="website"
              error={errors?.website?.message}
            />
            <div className="col-span-1">
              <AppEditor
                control={control}
                name="descriptions"
                label="Mô tả công ty"
              />
              {errors?.descriptions?.message && (
                <div className="text-red-500">
                  {errors?.descriptions?.message}
                </div>
              )}
            </div>
          </div>

          <div className="space-x-2 my-2 flex items-center justify-end">
            <Button
              text="Huỷ"
              className="bg-gray-400 hover:bg-gray-600"
              onClick={() => reset()}
            />
            <Button text="Tạo mới" btnType="submit" />
          </div>
        </form>
      ) : (
        <FindCompany />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  uploadImage: () => dispatch(openModal('USER_UPLOAD_IMAGE', {})),
  registerCompany: (data) => dispatch(registerCompanyStart(data)),
});

export default connect(null, mapDispatchToProps)(AccountCompany);
