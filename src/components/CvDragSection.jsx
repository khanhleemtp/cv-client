import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSectionNormalize } from '../redux/cv/cv.selectors';
import { v4 as uuidv4 } from 'uuid';
import { selectMoveInOtherPropsModal } from '../redux/viewState/viewState.selectors';
import { updateCvStart } from './../redux/cv/cv.action';
import { groupBy } from './../utils/groupBy';

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

const Task = ({ task, index }) => {
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
            {String(task?.record).slice(0, 10)}
          </div>
        )}
      </Draggable>
    </>
  );
};

const Column = ({ id, column }) => {
  return (
    <div className="bg-gray-200 w-36 flex flex-col mx-2">
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

const CvDragSection = ({ cvNormalize, move, updateCvData }) => {
  const { setValue, getValues, control } = useFormContext();
  // layout
  /* 
    const layouts = {
      column: ['column-1', 'column-2']
    }
  */

  console.log('cvNormalize: ', cvNormalize);

  const [data, setData] = useState(cvNormalize);
  const cvData = useWatch({ control });

  const onDragEnd = (result) => {
    const { source, draggableId, destination } = result;

    // console.log(
    //   'draggableId: ',
    //   draggableId,
    //   '\n',
    //   'source: ',
    //   source,
    //   '\n',
    //   'destionation: ',
    //   destination
    // );
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = source.droppableId;
    const finish = destination.droppableId;
    console.log(
      'start',
      source.index,
      '\n',
      'finish: ',
      destination.index,
      '\n'
    );

    if (start === finish) {
      const newTaskIds = Array.from(data[source.droppableId]);
      const indexDrag = cvData?.sections.findIndex(
        (section) => section.record === newTaskIds[source.index]?.record
      );

      const indexDes = cvData?.sections.findIndex(
        (section) => section.record === newTaskIds[destination.index]?.record
      );
      const dragItem = newTaskIds.filter((task) => task._id === draggableId)[0];
      console.log('item src', newTaskIds[source.index]);
      console.log('item destionation', newTaskIds[destination.index]);

      // remove from index
      console.log('newTaskIds', newTaskIds, draggableId);
      newTaskIds.splice(source.index, 1);
      console.log('sections', cvData?.sections);

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
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {['1', '0'].map((columnId) => {
            const column = data?.[columnId];
            return <Column id={columnId} column={column} key={columnId} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cvNormalize: selectSectionNormalize,
  move: selectMoveInOtherPropsModal,
});

const mapDispatchToProps = (dispatch) => ({
  updateCvData: (data) => dispatch(updateCvStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvDragSection);
