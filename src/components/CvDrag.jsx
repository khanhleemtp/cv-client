import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';
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
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={clsx('bg-white p-2 m-2 rounded-sm', {
              'bg-green-200': snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.content}
          </div>
        )}
      </Draggable>
    </>
  );
};

const Column = ({ column, tasks }) => {
  return (
    <div className="bg-gray-200 w-36 flex flex-col mx-2">
      <p>{column.title}</p>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx('flex-grow', {
              'bg-red-300': snapshot.isDraggingOver,
            })}
          >
            {tasks?.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const CvDragSection = () => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'sections',
    keyName: '_id',
  });

  // layout

  const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: '1' },
      'task-2': { id: 'task-2', content: '2' },
      'task-3': { id: 'task-3', content: '3' },
      'task-4': { id: 'task-4', content: '4' },
      'task-5': { id: 'task-5', content: '5' },
      'task-6': { id: 'task-6', content: '6' },
      'task-7': { id: 'task-7', content: '7' },
      'task-8': { id: 'task-8', content: '8' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Todo',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Todo2',
        taskIds: ['task-8', 'task-5', 'task-6', 'task-7'],
      },
    },
    // Facilitate Reordering of the columns
    columnOrder: ['column-1', 'column-2'],
  };

  // layout
  /* 
    const layouts = {
      column: ['column-1', 'column-2']
    }
  */

  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    console.log('result: ', result);

    const { source, draggableId, destination } = result;
    console.log(
      'destionation:',
      destination,
      '\n',
      'source: ',
      source,
      '\n',
      'draggableId',
      draggableId,
      '\n'
    );

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      // remove from index
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startIds = Array.from(start.taskIds);
    const finishIds = Array.from(finish.taskIds);

    startIds.splice(source.index, 1);
    finishIds.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...start,
      taskIds: startIds,
    };

    const newFinishColumn = {
      ...finish,
      taskIds: finishIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [start.id]: newStartColumn,
        [finish.id]: newFinishColumn,
      },
    };
    setData(newData);
  };

  // layout -> single -> set col = 1
  // layout -> double -> set col = 0/ set col 1

  // console.log('dataDrag: ', fields);
  return (
    <div>
      <p className="text-md">Kéo thả các phần đề thay đổi giao diện</p>
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {data?.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column?.taskIds?.map((taskId) => data.tasks[taskId]);
            return <Column column={column} tasks={tasks} key={column.id} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default CvDragSection;
