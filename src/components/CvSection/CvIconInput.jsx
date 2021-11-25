import TextareaAutosize from 'react-textarea-autosize';

import { forwardRef } from 'react';

const CvIconInput = forwardRef(
  ({ icon: Icon, placeholder = '', ...props }, ref) => {
    return (
      <div className="w-full bg-transparent relative" ref={ref}>
        <Icon className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        <TextareaAutosize
          maxRows={9999}
          type="text"
          className="pl-8 w-full bg-transparent text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

export default CvIconInput;
