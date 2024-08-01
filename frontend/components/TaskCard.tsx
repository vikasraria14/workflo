import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { ColumnId } from "./KanbanBoard";
import { ClockIcon } from "@/assets/GlobalIcons";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
  description: string;
  priority: string;
  deadline: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 'auto',  // Ensures the dragged item is above other items
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  const changeColor = (key)=>{
    switch (key) {
      case 'Low': return 'bg-green-200'
        case 'Medium': return 'bg-orange-200'
        case 'Urgent': return 'bg-red-500'
      default: 'bg-transparent'
        
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      {...attributes}
      {...listeners}
    >
      <Card className="w-full text-left">
        <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
          <div className="flex-auto px-1 pt-6">
            <div>
              <h5>{task.content}</h5>
            </div>
            <p className="mb-6 mt-3 leading-normal text-sm">{task.description}</p>
            <div className="flex items-center justify-between">
              <div className={`inline-block ${changeColor(task.priority)} px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all border border-solid rounded-lg shadow-none leading-pro ease-soft-in text-xs`}>{task.priority}</div>
            </div>
            <div className="flex gap-x-3 mt-4">
              <div><ClockIcon /></div>
              <div className="leading-normal text-sm">{new Date(task.deadline).toLocaleString('sv-SE')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
