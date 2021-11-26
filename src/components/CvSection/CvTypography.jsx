import TextareaAutosize from 'react-textarea-autosize';
import { useCallback, forwardRef } from 'react';
import clsx from 'clsx';

const CvTypography = forwardRef(
  (
    {
      placeholder = '',
      type = 'p',
      color = 'primary',
      bold = false,
      className,
      ...props
    },
    ref
  ) => {
    const renderStyle = useCallback(() => {
      switch (type) {
        case 'h1':
          return 'text-2xl';
        case 'h2':
          return 'text-xl';
        case 'h3':
          return 'text-lg';
        case 'h4':
          return 'text-base';
        case 'p':
          return 'text-sm';
        default:
          return '';
      }
    }, [type]);

    const renderColor = useCallback(() => {
      switch (color) {
        case 'primary':
          return 'text-gray-500 placeholder-gray-500 focus:placeholder-gray-300';
        case 'secondary':
          return 'text-blue-500 placeholder-blue-500 focus:placeholder-blue-300';
        default:
          return '';
      }
    }, [color]);

    return (
      <TextareaAutosize
        ref={ref}
        maxRows={9999}
        type="text"
        className={clsx(
          'w-full py-1 bg-transparent border-0 focus:ring-0',
          renderColor(),
          renderStyle(),
          {
            'font-semibold': bold,
          },
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);
export default CvTypography;
