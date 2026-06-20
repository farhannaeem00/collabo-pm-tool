"use client";

interface TaskCardProps {
  task: any;
  onClick: () => void;
}

const PRIORITY_EMOJI: any = {
  low: "🟢", medium: "🔵", high: "🟡", urgent: "🔴"
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      draggable
      onClick={onClick}
      className="bg-gray-900 border border-gray-800 hover:border-purple-500/30 rounded-xl p-3 cursor-pointer transition group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <span className="text-xs shrink-0">{PRIORITY_EMOJI[task.priority]}</span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-400 line-clamp-2 mb-2">{task.description}</p>
      )}

      {task.subtasks?.length > 0 && (
        <div className="mb-2">
          <div className="flex items-center gap-1">
            <div className="flex-1 bg-gray-700 rounded-full h-1">
              <div
                className="bg-purple-500 h-1 rounded-full"
                style={{
                  width: `${(task.subtasks.filter((s: any) => s.completed).length / task.subtasks.length) * 100}%`
                }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {task.subtasks.filter((s: any) => s.completed).length}/{task.subtasks.length}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex -space-x-1">
          {task.assignees?.slice(0, 3).map((a: any) => (
            <div key={a._id}
              className="w-5 h-5 rounded-full border border-gray-900 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: a.color }}
              title={a.name}>
              {a.name?.[0]}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {task.comments?.length > 0 && (
            <span className="text-xs text-gray-500">💬 {task.comments.length}</span>
          )}
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
