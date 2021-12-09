import { useFieldArray, useFormContext } from 'react-hook-form';
import CvSectionWrapper from './CvSectionWrapper';
import CvTypography from './CvTypography';
import CvSettingItem from './Setting/CvSettingItem';

const CvTags = ({
  name,
  updateData,
  addItem,
  removeItem,
  upItem,
  downItem,
}) => {
  const { control, register, setFocus } = useFormContext();

  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: `${name}.tags`,
    keyName: '_id',
  });

  const handleKeyPress = (event, l) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      insert(l, { text: '' }, { focusName: `${name}.tags.${l + 1}` });
      updateData();
    }
  };

  const handleKeyDown = (event, l) => {
    if (fields[l]?.text && event.key === 'Backspace') {
      event.preventDefault();
      if (l === 0) {
        return;
      }
      remove(l);
      setFocus(`${name}.tags.${l - 1}.text`);
      updateData();
    }
  };

  const addTag = () => {
    append({ text: '' });
  };

  const removeTag = () => {
    remove(fields?.length - 1);
  };

  return (
    <CvSectionWrapper
      name={name}
      setting={
        <CvSettingItem
          add={addItem}
          remove={removeItem}
          up={upItem}
          down={downItem}
          // addTag={addTag(k)}
          addTag={addTag}
          removeTag={fields?.length === 1 ? null : removeTag}
        />
      }
    >
      <CvTypography
        type="p"
        placeholder="Nhóm kỹ năng"
        {...register(`${name}.title`)}
        color="secondary"
        bold
      />
      {fields?.map((field, l) => (
        <div
          key={field._id}
          className="inline-flex border-2 border-gray-400 p-1 rounded-lg mr-2 mb-2 text-center w-1/4"
          onKeyPress={(e) => handleKeyPress(e, l)}
          onKeyDown={(e) => handleKeyDown(e, l)}
        >
          <CvTypography
            {...register(`${name}.tags.${l}.text`)}
            className="text-center"
            type="h5"
            placeholder="Thông tin chi tiết"
          />
        </div>
      ))}
    </CvSectionWrapper>
  );
};

export default CvTags;
