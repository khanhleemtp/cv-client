import React from 'react';
import { CalendarIcon } from '@heroicons/react/solid';
import { useWatch, useFormContext } from 'react-hook-form';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  setFields,
  clearBackground,
} from '../../../../redux/viewState/viewState.action';
import { selectIsCurrentPopover } from '../../../../redux/viewState/viewState.selectors';

const CvCalendar = ({
  from,
  to,
  isOngoing,
  open,
  isOpen,
  close,
  isEnabled,
}) => {
  const { control } = useFormContext();
  const isDateRange = useWatch({ control, name: isEnabled });
  const fromDate = useWatch({ control, name: from });
  const toDate = useWatch({ control, name: to });
  const isGoing = useWatch({ control, name: isOngoing });

  return (
    isDateRange && (
      <div
        className="flex flex-grow w-full items-center text-sm text-gray-500 cursor-pointer hover:bg-gray-200 select-none"
        onClick={isOpen ? close : open}
      >
        <div className="text-blue-500 pointer-events-none w-4 h-4">
          <CalendarIcon />
        </div>
        <div>{fromDate && moment(fromDate).format('DD/MM/YYYY')}</div>
        <span className="mx-0.5">-</span>
        {isGoing ? (
          <div className="truncate">Hiện tại</div>
        ) : (
          <div>{toDate && moment(toDate).format('DD/MM/YYYY')}</div>
        )}
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => ({
  isOpen: selectIsCurrentPopover(ownProps?.dayProps)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () =>
    dispatch(
      setFields({
        popover: ownProps?.dayProps,
        section: ownProps?.section,
        item: ownProps?.item,
      })
    ),
  close: () => dispatch(clearBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvCalendar);
