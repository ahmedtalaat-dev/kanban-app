"use client";

import { KanbanCardProps } from "@/types";
import { Trash } from "lucide-react";

export function KanbanCard({
  id,
  title,
  description,
  priority = "medium",
  backgroundColor = "bg-muted",
  onDelete,
  onDragStart,
}: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className={`group cursor-move rounded-lg border border-border p-4 transition-all hover:shadow-lg ${backgroundColor}`}
    >
      {/* Left side */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          {/* Card header */}
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
            {title}
          </h3>

          {/* Task description */}
          {description && (
            <p className="line-clamp-3 text-xs text-muted-foreground">
              {description}
            </p>
          )}

          {/* Priority badge */}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                priority === "low"
                  ? "bg-green-200 text-green-800"
                  : priority === "medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
              }`}
            >
              {priority}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(id)}
          className="rounded p-1 text-red-600 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100"
        >
          <Trash size={32} />
        </button>
      </div>
    </div>
  );
}
