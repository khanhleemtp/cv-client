import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import { useForm, FormProvider } from 'react-hook-form';
import { selectSelectedSection } from './../../redux/viewState/viewState.selectors';
import { useEffect } from 'react';
import { loadCvStart } from '../../redux/cv/cv.action';

const CvContainer = ({ children, isSelected }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCvStart('618fd50318556022180debad'));
    return () => {};
  }, [dispatch]);

  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <button type="submit">Submit</button>
        <div
          className={clsx('relative bg-transparent mx-auto', {
            'bg-gray-300 bg-opacity-60': isSelected,
          })}
        >
          {children}
        </div>
      </form>
    </FormProvider>
  );
};

const mapDispatchToProps = createStructuredSelector({
  isSelected: selectSelectedSection,
});

export default connect(mapDispatchToProps)(CvContainer);
