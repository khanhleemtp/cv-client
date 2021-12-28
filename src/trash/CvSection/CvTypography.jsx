import TextareaAutosize from 'react-textarea-autosize';
import { useCallback, useRef } from 'react';
import clsx from 'clsx';
import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
  CalendarIcon,
} from '@heroicons/react/solid';

import useOnClickOutside from '../../hook/useOutsideClick';
import { connect, useDispatch } from 'react-redux';
import { closeField, openField } from '../../redux/viewState/viewState.action';
import { selectIsCurrentField } from '../../redux/viewState/viewState.selectors';
import { useFormState, useFormContext } from 'react-hook-form';
import { isEmpty } from 'lodash-es';
import { updateCvStart } from '../../redux/cv/cv.action';

const CvTypography = ({
  placeholder = '',
  type = 'p',
  color = 'primary',
  bold = false,
  medium = false,
  className,
  icon,
  name,
  isCurrentField,
  setField,
  closeField,
  isEnabled = true,
}) => {
  const renderStyle = useCallback(() => {
    switch (type) {
      case 'h1':
        return 'text-2xl';
      case 'h2':
        return 'text-xl';
      case 'h3':
        return 'text-lg';
      case 'h4':
        return 'text-sm';
      case 'h5':
        return 'text-xs';
      case 'p':
        return 'text-base';
      default:
        return '';
    }
  }, [type]);

  const renderColor = useCallback(() => {
    switch (color) {
      case 'primary':
        return 'text-gray-500  placeholder-gray-500 focus:placeholder-gray-300';
      case 'secondary':
        return 'text-blue-500 placeholder-blue-500 focus:placeholder-blue-300';
      default:
        return '';
    }
  }, [color]);

  const renderIcon = useCallback(() => {
    switch (icon) {
      case 'phone':
        return <PhoneIcon />;
      case 'mail':
        return <MailIcon />;
      case 'location':
        return <LocationMarkerIcon />;
      case 'link':
        return <LinkIcon />;
      case 'calendar':
        return <CalendarIcon />;
      default:
        return null;
    }
  }, [icon]);

  const { register, control, getValues } = useFormContext();

  const { dirtyFields } = useFormState({
    control,
    name: name,
  });

  const dispatch = useDispatch();

  const handleOpen = () => {
    if (isCurrentField) {
      return;
    }
    setField();
  };

  const handleClose = useCallback(() => {
    if (isCurrentField) {
      if (!isEmpty(dirtyFields)) {
        const cvData = getValues();
        dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
      }
      return closeField();
    }
  }, [dispatch, getValues, dirtyFields, closeField, isCurrentField]);

  const ref = useRef();

  useOnClickOutside(ref, handleClose);

  return (
    isEnabled && (
      <div
        className={clsx('w-full bg-transparent relative', { 'pl-5': icon })}
        onClick={handleOpen}
        ref={ref}
      >
        {icon && (
          <div className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-0">
            {renderIcon()}
          </div>
        )}
        <TextareaAutosize
          maxRows={9999}
          type="text"
          className={clsx(
            'w-full py-0 bg-transparent border-0 focus:ring-0 outline-none resize-none px-0',
            renderColor(),
            renderStyle(),
            {
              'font-semibold': bold,
            },
            {
              'font-medium': medium,
            },
            className
          )}
          {...register(name)}
          placeholder={placeholder}
        />
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => ({
  isCurrentField: selectIsCurrentField(ownProps.name)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setField: () => dispatch(openField(ownProps.name)),
  closeField: () => dispatch(closeField()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvTypography);
