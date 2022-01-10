import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './../../button/button.component';
import AppEditor from './../../editor/editor.component';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import InputApp from './../../input-app/input-app.component';
import MultiSelect from '../../input-app/muilti-select.component';
import InputSelect from './../../input-app/input-select.component';
import { updateCompanyStart } from './../../../redux/company/company.action';
import InputFile from './input-file.component';

import {
  STATUS_COMPANY,
  SIZE_COMPANY,
  FIELDS_COMPANY,
  TYPE_COMPANY,
  AREA,
} from '../../data/input.data';
import { openModal } from '../../../redux/viewState/viewState.action';
import { selectCurrentUser } from './../../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

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

// const optionsComputed = [];
// for (const [value, label] of Object.entries(options))
// optionsComputed.push({ label, value });

const renderDefaultValue = (optionsComputed, defaultValue) => {
  let defaultValueComputed;
  // convert defaultValue from [1] to [{label=a,value=1}]
  if (defaultValue) {
    defaultValueComputed = [];
    for (const value of defaultValue)
      defaultValueComputed.push(
        optionsComputed.find((option) => option.value === value)
      );
  }
  return defaultValueComputed;
};

const CompanyEditForm = ({ company, updateCompany, uploadImage, user }) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: company?.name,
      email: company?.email,
      tax: company?.tax,
      fields: company?.fields,
      area: company?.area,
      type: company?.type,
      size: company?.size,
      phone: company?.phone,
      website: company?.website,
      descriptions: company?.descriptions,
      status: company?.status,
      host: company?.host,
    },
    resolver: yupResolver(companySchema),
  });

  const resetValue = () =>
    reset({
      name: company?.name,
      email: company?.email,
      tax: company?.tax,
      fields: company?.fields,
      area: company?.area,
      type: company?.type,
      size: company?.size,
      phone: company?.phone,
      website: company?.website,
      descriptions: company?.descriptions,
      status: company?.status,
      host: company?.host,
    });
  const handleSubmitOnClick = (data) => {
    updateCompany({ id: company.id, updateData: data });
    console.log('dataCOm', data);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-2 space-x-0 md:space-x-4 md:space-y-0"></div>
      <form onSubmit={handleSubmit(handleSubmitOnClick)} className="w-full">
        <InputFile
          label="Logo"
          placeholder="Cập nhật"
          onClick={uploadImage(company)}
          photo={company?.logo}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
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
            label="Chủ công ty"
            placeholder="Chủ công ty"
            register={register}
            name="host"
            error={errors?.host?.message}
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
          {user?.role === 'admin' && (
            <InputSelect
              register={register}
              label="Trạng thái"
              options={STATUS_COMPANY}
              name="status"
              error={errors?.status?.message}
            />
          )}
          <div>
            <MultiSelect
              name="fields"
              control={control}
              label="Lĩnh vực"
              placeholder="Chọn nhiều lĩnh vực"
              options={FIELDS_COMPANY}
              defaultValue={renderDefaultValue(FIELDS_COMPANY, company?.fields)}
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
              // defaultValue={company?.address}
              defaultValue={renderDefaultValue(AREA, company?.area)}
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
          <div className="col-span-2">
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
            onClick={resetValue}
          />
          <Button text="Cập nhật" btnType="submit" />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCompany: (data) => dispatch(updateCompanyStart(data)),
  uploadImage: (company) => () =>
    dispatch(
      openModal('UPDATE_COMPANY_IMAGE', {
        company,
      })
    ),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditForm);
