import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import { selectSectionSelected } from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

const CvSectionTitle = ({ placeholder, name, isSelected }) => {
  return (
    <div
      className={clsx(
        'flex items-center w-full border-t-2 border-b-2 border-gray-300 mb-4',
        { 'rounded-t-lg': isSelected }
      )}
    >
      <PencilIcon className="w-8 h-8 pt-1 text-blue-500" />
      <TextareaAutosize
        type="text"
        className="w-full uppercase bg-transparent text-2xl text-blue-500 font-semibold border-0 focus:ring-0 placeholder-blue-500 focus:placeholder-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: selectSectionSelected(ownProps.name)(state),
});

export default connect(mapStateToProps)(CvSectionTitle);
