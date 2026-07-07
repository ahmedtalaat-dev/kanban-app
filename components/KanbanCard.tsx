'use client'

import { KanbanCardProps } from '@/types'
import { Trash2 } from 'lucide-react'

const priorityColors = {
  low: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
  high: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
}

export function KanbanCard({
  id,
  title,
  description,
  priority = 'medium',
  backgroundColor = 'bg-slate-100 dark:bg-slate-800',
  onDelete,
  onDragStart,
}: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className={`p-4 rounded-lg border cursor-move transition-all hover:shadow-lg group ${backgroundColor} border-slate-200 dark:border-slate-700`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
          {title}
        </h3>
        <button
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
          {description}
        </p>
      )}
      <div className="mt-3 flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          priority === 'low' ? 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200' :
          priority === 'medium' ? 'bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200' :
          'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200'
        }`}>
          {priority}
        </span>
      </div>
    </div>
  )
}
