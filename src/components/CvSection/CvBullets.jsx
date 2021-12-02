import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import CvTypography from './CvTypography';

const CvBullets = ({ name, showBullets }) => {
  const { control, register, setFocus, setValue } = useFormContext();

  const isEnable = useWatch({ control, name: showBullets });

  const bullets = useWatch({ control, name });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}`,
    keyName: '_id',
  });

  const handleKeyPress = (event, l) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      append({ text: '' }, { focusIndex: l + 1 });
    }
  };

  const handleKeyDown = (event, l) => {
    if (!bullets[l].text && event.key === 'Backspace') {
      event.preventDefault();
      if (l === 0) {
        setValue(showBullets, false);
      }
      remove(l);
      setFocus(`${name}.${l - 1}.text`);
    }
  };

  return (
    !isEnable &&
    fields?.map((field, l) => (
      <div
        key={field._id}
        className="inline-flex"
        onKeyPress={(e) => handleKeyPress(e, l)}
        onKeyDown={(e) => handleKeyDown(e, l)}
      >
        <span className="flex items-center justify-center w-4 h-4">&bull;</span>
        <CvTypography
          {...register(`${name}.${l}.text`)}
          // onKeyDown={(e) => handleKeyDown(e, l)}
          type="h5"
          placeholder="Thông tin chi tiết"
        />
      </div>
    ))
  );
};

export default CvBullets;
