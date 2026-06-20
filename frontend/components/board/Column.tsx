"use client";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  column: { id: string; title: string; color: string };
  tasks: any[];
  onTaskClick: (task: any) => void;
  onAddTask: (columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: string) => void;
  onDragStart: (task: any) => void;
}

export function Column({
  column, tasks, onTaskClick, onAddTask,
  onDragOver, onDrop, onDragStart,
}: ColumnProps) {
  return (
    <div
      className="w-72 shrink-0"
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
    >
      <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${column.color}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="text-gray-400 hover:text-white transition text-lg"
        >+</button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} draggable onDragStart={() => onDragStart(task)}>
            <TaskCard task={task} onClick={() => onTaskClick(task)} />
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-xs">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}
