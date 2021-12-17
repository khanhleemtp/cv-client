import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCvStart } from './../redux/cv/cv.action';

const CvTemplate = () => {
  const { setValue, getValues, control } = useFormContext();
  const dispatch = useDispatch();

  const setTemplate = (layout) => () => {
    setValue('style.layout', layout);
    const cvData = getValues();
    dispatch(
      updateCvStart({
        updateData: cvData,
        id: cvData?.id,
      })
    );
  };

  const layout = useWatch({ control, name: 'style.layout' });

  return (
    <div className="flex flex-wrap items-center justify-center">
      {[
        {
          name: 'single',
          src: '/assets/template/one.png',
          title: 'Một cột',
        },
        {
          name: 'double',
          src: '/assets/template/two.png',
          title: 'Hai cột',
        },
      ].map((temp) => (
        <div
          key={temp.name}
          className="flex flex-col items-center justify-center"
          onClick={setTemplate(temp.name)}
        >
          <div
            className={clsx('bg-gray-200 w-36 m-2 shadow-2xl cursor-pointer', {
              'ring-1 ring-blue-400': temp.name === layout,
            })}
          >
            <img src={temp.src} className="w-full h-auto" alt="abc" />
          </div>
          <h2 className="font-medium text-gray-500">{temp.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default CvTemplate;
