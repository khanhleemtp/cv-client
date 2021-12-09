import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import CvTypography from './CvTypography';

const CvTags = ({ name, updateData }) => {
  const { control, register, setFocus } = useFormContext();

  const tags = useWatch({ control, name });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}`,
    keyName: '_id',
  });

  const handleKeyPress = (event, l) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      append({ text: '' }, { focusIndex: l + 1 });
      updateData();
    }
  };

  const handleKeyDown = (event, l) => {
    if (!tags[l].text && event.key === 'Backspace') {
      event.preventDefault();
      if (l === 0) {
        return;
      }
      remove(l);
      setFocus(`${name}.${l - 1}.text`);
      updateData();
    }
  };

  return (
    fields &&
    fields?.map((field, l) => (
      <div
        key={field._id}
        className="inline-flex border-2 border-gray-400 p-1 rounded-lg mr-2 mb-2 text-center w-1/4"
        onKeyPress={(e) => handleKeyPress(e, l)}
        onKeyDown={(e) => handleKeyDown(e, l)}
      >
        <CvTypography
          {...register(`${name}.${l}.text`)}
          className="text-center"
          type="h5"
          placeholder="Thông tin chi tiết"
        />
      </div>
    ))
  );
};

export default CvTags;
