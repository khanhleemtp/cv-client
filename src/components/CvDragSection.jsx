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
import { selectMoveInOtherPropsModal } from '../redux/viewState/viewState.selectors';
import { updateCvStart } from './../redux/cv/cv.action';
import { selectCvSection } from './../redux/cv/cv.selectors';

const Task = ({ task, index }) => {
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

const Column = ({ id, column }) => {
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
              return <Task key={section?._id} task={section} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const CvDragSection = ({ cvNormalize, move, updateCvData, layout }) => {
  const { setValue, control } = useFormContext();

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

    if (start === finish) {
      const newTaskIds = Array.from(data[source.droppableId]);
      const indexDrag = cvData?.sections.findIndex(
        (section) => section.record === newTaskIds[source.index]?.record
      );

      const indexDes = cvData?.sections.findIndex(
        (section) => section.record === newTaskIds[destination.index]?.record
      );
      const dragItem = newTaskIds.filter((task) => task._id === draggableId)[0];

      // remove from index
      newTaskIds.splice(source.index, 1);

      console.log('indexDes', indexDes, '\n', 'index Drag', indexDrag);

      // console.log('index Drag', indexDrag);

      newTaskIds.splice(destination.index, 0, {
        ...dragItem,
      });

      const newData = {
        ...data,
        [source.droppableId]: newTaskIds,
      };
      setData(newData);
      move(indexDrag, indexDes);

      updateCvData({ id: cvData._id, updateData: cvData });

      return;
    }

    const startIds = Array.from(data[source.droppableId]);

    const dragItem = startIds.filter((task) => task._id === draggableId)[0];

    const finishIds = data?.[destination.droppableId]
      ? data?.[destination.droppableId]
      : [];

    const indexDrag = cvData?.sections.findIndex(
      (section) => section.record === startIds[source.index]?.record
    );

    const indexDes = cvData?.sections.findIndex(
      (section) => section.record === finishIds[destination.index]?.record
    );

    setValue(`sections.${indexDrag}.column`, Number(destination.droppableId));

    move(indexDrag, indexDes);

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
    updateCvData({ id: cvData._id, updateData: cvData });
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
              return <Column id={columnId} column={column} key={columnId} />;
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
