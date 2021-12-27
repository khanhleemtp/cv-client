import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFormContext, useWatch } from 'react-hook-form';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectCvLayout,
  selectSectionNormalize,
} from '../redux/cv/cv.selectors';
import {
  selectMoveInOtherPropsModal,
  selectUpdateInOtherPropsModal,
} from '../redux/viewState/viewState.selectors';
import { updateCvStart } from './../redux/cv/cv.action';
import { selectCvSection } from './../redux/cv/cv.selectors';

const Task = ({ task, index, sections }) => {
  const taskText = useMemo(() => {
    switch (task?.record) {
      case 'SummarySection':
        return 'Tổng kết';
      case 'TechnologySection':
        return 'Kỹ năng chính';
      case 'LanguageSection':
        return 'Kỹ năng khác';
      case 'EducationSection':
        return 'Học vấn';
      case 'ExperienceSection':
        return 'Kinh nghiệm';
      default:
        return null;
    }
  }, [task]);

  return (
    <>
      <Draggable draggableId={task?._id} index={index}>
        {(provided, snapshot) => (
          <div
            className={clsx('bg-white p-2 m-2 rounded-sm', {
              'bg-green-200': snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {taskText}
          </div>
        )}
      </Draggable>
    </>
  );
};

const Column = ({ id, column, sections }) => {
  return (
    <div className="bg-gray-200 w-full flex flex-col">
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx('flex-grow', {
              'bg-red-300': snapshot.isDraggingOver,
            })}
          >
            {column?.map((section, index) => {
              return (
                <Task
                  key={section?._id}
                  task={section}
                  index={index}
                  col={id}
                  sections={sections}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const CvDragSection = ({ cvNormalize, move, updateCvData, layout, update }) => {
  const { setValue, control, getValues } = useFormContext();

  const [data, setData] = useState(cvNormalize);

  const cvData = useWatch({ control });

  const onDragEnd = (result) => {
    const { source, draggableId, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = source.droppableId;
    const finish = destination.droppableId;

    // Single Column
    if (start === finish) {
      const newTaskIds = Array.from(data[source.droppableId]);
      const indexDrag = cvData?.sections?.findIndex(
        (section) => section.record === newTaskIds[source.index]?.record
      );

      const indexDes = cvData?.sections?.findIndex(
        (section) => section.record === newTaskIds[destination.index]?.record
      );
      const dragItem = newTaskIds?.filter(
        (task) => task._id === draggableId
      )[0];

      // remove from index
      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, {
        ...dragItem,
      });

      const newData = {
        ...data,
        [source.droppableId]: newTaskIds,
      };
      setData(newData);
      move(indexDrag, indexDes);
      const cvValues = getValues();
      updateCvData({ id: cvValues._id, updateData: cvValues });

      return;
    }

    // TwoColumn

    // data column
    const startIds = Array.from(data[source.droppableId]);

    const finishIds = data?.[destination.droppableId]
      ? data?.[destination.droppableId]
      : [];

    // data section
    const dragItem = startIds.filter((task) => task._id === draggableId)[0];
    // find Index in form

    // drag

    const indexDrag = cvData?.sections?.findIndex(
      (section) => section.record === startIds[source.index]?.record
    );
    // previous
    const indexPrevious = cvData?.sections?.findIndex(
      (section) => section.record === finishIds[destination.index - 1]?.record
    );

    const indexDestination = cvData?.sections?.findIndex(
      (section) => section.record === finishIds[destination.index]?.record
    );
    // next

    setValue(`sections.${indexDrag}.column`, Number(destination.droppableId));

    if (indexPrevious === -1 && indexDestination === -1) {
      move(indexDrag, indexDestination);
    } else if (indexPrevious === -1) {
      console.log('run here');
      let cvSections = Array.from(cvData?.sections);
      cvSections.splice(indexDrag, 1);
      cvSections.splice(indexDestination, 0, {
        ...dragItem,
        column: Number(destination.droppableId),
      });

      const swapArrayLoc = (arr, from, to) => {
        arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      };

      if (
        finishIds[destination.index]?.record ===
        cvSections?.[indexDestination - 1]?.record
      ) {
        swapArrayLoc(cvSections, indexDestination - 1, indexDestination);
      }
      let updateCvSection = cvSections.filter((item) => item !== undefined);
      update(updateCvSection);
    } else if (indexDestination === -1) {
      // const cvValues = getValues();
      let cvSections = Array.from(cvData?.sections);

      cvSections.splice(indexDrag, 1);
      cvSections.splice(indexPrevious, 0, {
        ...dragItem,
        column: Number(destination.droppableId),
      });
      // console.log('sections: ', cvSections);
      const swapArrayLoc = (arr, from, to) => {
        arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      };

      if (dragItem?.record === cvSections?.[indexPrevious]?.record) {
        swapArrayLoc(cvSections, indexPrevious, indexPrevious + 1);
      }

      let updateCvSection = cvSections.filter((item) => item !== undefined);
      update(updateCvSection);
    } else {
      let cvSections = Array.from(cvData?.sections);

      cvSections.splice(indexDrag, 1);
      cvSections.splice(indexPrevious, 0, {
        ...dragItem,
        column: Number(destination.droppableId),
      });
      const swapArrayLoc = (arr, from, to) => {
        arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      };

      if (dragItem?.record === cvSections?.[indexPrevious]?.record) {
        swapArrayLoc(cvSections, indexPrevious, indexPrevious + 1);
      }

      /*      console.log(
        'indexPrevious: ',
        indexPrevious,
        '\n',
        'recorDrag',
        dragItem?.record,
        '\n',
        'recordNext',
        cvSections?.[indexPrevious]?.record
      );

      console.log('sections: ', cvSections); */

      let updateCvSection = cvSections.filter((item) => item !== undefined);
      update(updateCvSection);
    }

    const cvValues = getValues();
    updateCvData({ id: cvValues._id, updateData: cvValues });

    startIds.splice(source.index, 1);
    finishIds.splice(destination.index, 0, {
      ...dragItem,
      column: Number(destination.droppableId),
    });
    const newData = {
      ...data,
      [source.droppableId]: startIds,
      [destination.droppableId]: finishIds,
    };
    setData(newData);
  };

  return (
    <div>
      <p className="text-md">Kéo thả các phần đề thay đổi giao diện</p>
      <div className="flex w-full">
        {layout === 'double' && (
          <DragDropContext onDragEnd={onDragEnd}>
            {['1', '0'].map((columnId) => {
              const column = data?.[columnId];
              return (
                <Column
                  id={columnId}
                  column={column}
                  key={columnId}
                  sections={cvData?.sections}
                />
              );
            })}
          </DragDropContext>
        )}
        {layout === 'single' && (
          <DragDropContext onDragEnd={onDragEnd}>
            {['0'].map((columnId) => {
              const column = data?.[columnId];
              return <Column id={columnId} column={column} key={columnId} />;
            })}
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cvNormalize: selectSectionNormalize,
  cvSingle: selectCvSection,
  move: selectMoveInOtherPropsModal,
  layout: selectCvLayout,
  update: selectUpdateInOtherPropsModal,
});

const mapDispatchToProps = (dispatch) => ({
  updateCvData: (data) => dispatch(updateCvStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvDragSection);

/*

// drag
const draggabeSnapshot = {
  isDragging: true,
  draggingOver: 'column-1'
}
  // drog
const droppableSnapshot = {
  isDraggingOver: true,
  draggingOverWith: 'task-1'
}
}

** onDragStart
const start = {
  draggableId: 'task-1',
  type: "TYPE",
  source: {
    droppableId: 'column-1',
    index: 0
  }
}

** onDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: 'column-1',
    index: 1
  }
}

** onDragEnd
const result = {
    draggableId: 'task-1',
    type: 'TYPE',
    reason: 'DROP',
    source: {
      droppableId: 'column-1',
      index: 0,
    },
    destionation: {
      droppableId: 'column-1',
      index: 1,
    },
  };

*/

/* 
  - 1. Col
  - 2. Section
*/
