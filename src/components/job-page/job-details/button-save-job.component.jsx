import React from 'react';
import Button from './../../button/button.component';
import clsx from 'clsx';
import { HeartIcon } from '@heroicons/react/outline';
import { selectIsJobSaved } from '../../../redux/user/user.selectors';
import { userSaveJobStart } from './../../../redux/user/user.action';
import { connect } from 'react-redux';

const ButtonSaveJob = ({ saveJob, isSaved }) => {
  return (
    <Button
      text="Lưu tin"
      onClick={saveJob}
      leftIcon={HeartIcon}
      className={clsx({
        'text-indigo-500 bg-white ring-1 ring-indigo-500 hover:bg-indigo-100':
          !isSaved,
      })}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSaved: selectIsJobSaved(ownProps?.job?.id)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveJob: () => dispatch(userSaveJobStart(ownProps?.job?.id)),
});

connect(mapStateToProps, mapDispatchToProps)(ButtonSaveJob);

export default connect(mapStateToProps, mapDispatchToProps)(ButtonSaveJob);
