import { useEffect, useMemo, useRef, useState } from "react";
import axios from "@/core/dataFetchingConfigs/axiosGlobalConfig";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type Task } from "./TaskCard";
import type { Column } from "./BoardColumn";
import { hasDraggableData } from "./utils";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";

const defaultCols = [
  { id: "toDo", title: "Todo" },
  { id: "inProgress", title: "In progress" },
  { id: "underReview", title: "Under Review" },
  { id: "completed", title: "Finished" },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export default function WorkBoard() {
  const columns = useMemo(() => defaultCols, []);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.columnId;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${
          active.data.current.task.content
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.content
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }

      if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        {columns.map((col) => (
          <BoardColumn
            key={col.id}
            column={col}
            tasks={tasks.filter((task) => task.columnId === col.id)}
          />
        ))}
      </BoardContainer>
    </DndContext>
  );

  async function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
  }

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("enter", active, over);
    console.log("enter2", over);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;
    console.log(activeId === overId);
    if (activeId !== overId) return;

    const isActiveATask = activeData?.type === "Task";
    if (isActiveATask) {
      const activeTask = activeData.task;
      const newColumnId = overId as ColumnId;

      console.log("ddd", activeTask, newColumnId);

      // if (activeTask.columnId !== newColumnId) {
      try {
        const response = await axios.put(`/tasks/${activeId}`, {
          status: activeTask.columnId,
        });
        const response1 = await axios.get<Task[]>("/tasks");
        setTasks(response1.data);

        //   tasks.map((task) =>
        //     task.id === activeId ? { ...task, columnId: newColumnId } : task
        //   )
        // );
        // try {
        //   await axios.put(`/tasks/${activeId}`, {
        //     status: newColumnId,
        //   });
      } catch (error) {
        console.error("Error updating task status:", error);
      }
      // }
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.columnId !== overTask.columnId
        ) {
          activeTask.columnId = overTask.columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
  }
}
