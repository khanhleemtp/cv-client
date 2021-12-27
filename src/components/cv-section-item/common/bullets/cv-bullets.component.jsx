import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import CvTypography from './../typography/cv-typography';

const CvBullets = ({ name, showBullets, section, item }) => {
  const { control, setFocus, setValue, getValues } = useFormContext();
  const isEnable = useWatch({ control, name: showBullets, defaultValue: true });

  const bullets = getValues(name);

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
        remove(l);
        return setValue(showBullets, false);
      }
      remove(l);
      setFocus(`${name}.${l - 1}.text`);
    }
  };

  return isEnable
    ? fields?.map((field, l) => (
        <div
          key={field._id}
          className="inline-flex"
          onKeyPress={(e) => handleKeyPress(e, l)}
          onKeyDown={(e) => handleKeyDown(e, l)}
        >
          <span className="flex items-center justify-center w-4 h-4">
            &bull;
          </span>
          <CvTypography
            name={`${name}.${l}.text`}
            type="h5"
            placeholder="Thông tin chi tiết"
            section={section}
            item={item}
          />
        </div>
      ))
    : null;
};

export default CvBullets;
