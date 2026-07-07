'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { KanbanCard } from './KanbanCard'
import { ColorPicker } from './ColorPicker'
import { KanbanColumnProps } from '@/types'

export function KanbanColumn({
  id,
  title,
  color,
  backgroundColor,
  cards,
  onAddCard,
  onDeleteCard,
  onDropCard,
  onDeleteColumn,
  onDragStart,
  onUpdateColumnColor,
}: KanbanColumnProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const [cardDescription, setCardDescription] = useState('')
  const [cardPriority, setCardPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [cardBgColor, setCardBgColor] = useState('bg-slate-100 dark:bg-slate-800')
  const [dragOverColumn, setDragOverColumn] = useState(false)

  const handleAddCard = () => {
    if (cardTitle.trim()) {
      onAddCard(id, cardTitle, cardDescription, cardPriority, cardBgColor)
      setCardTitle('')
      setCardDescription('')
      setCardPriority('medium')
      setCardBgColor('bg-slate-100 dark:bg-slate-800')
      setIsAdding(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverColumn(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverColumn(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverColumn(false)
    
    const draggedData = e.dataTransfer.getData('text/plain')
    const [cardId, fromColumnId] = draggedData.split('|')
    
    if (fromColumnId !== id) {
      onDropCard(fromColumnId, id, cardId)
    }
  }

  return (
    <div className="flex-shrink-0 w-80">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${backgroundColor} rounded-lg p-4 h-full min-h-96 transition-all ${
          dragOverColumn ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
              {cards.length}
            </span>
            <ColorPicker
              value={backgroundColor}
              onChange={(color) => onUpdateColumnColor?.(id, color)}
              label=""
            />
          </div>
          <button
            onClick={() => onDeleteColumn(id)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('text/plain', `${card.id}|${id}`)
                onDragStart(e, card.id, id)
              }}
            >
              <KanbanCard
                id={card.id}
                title={card.title}
                description={card.description}
                priority={card.priority}
                backgroundColor={card.backgroundColor}
                onDelete={() => onDeleteCard(id, card.id)}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', `${card.id}|${id}`)
                }}
              />
            </div>
          ))}
        </div>

        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-2 px-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Plus size={16} />
            Add Card
          </button>
        ) : (
          <div className="space-y-3 p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <input
              type="text"
              placeholder="Card title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleAddCard()
                }
              }}
            />
            <textarea
              placeholder="Description (optional)"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={cardPriority}
                onChange={(e) => setCardPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <ColorPicker
                value={cardBgColor}
                onChange={setCardBgColor}
                label="Card Color"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setCardTitle('')
                  setCardDescription('')
                  setCardPriority('medium')
                  setCardBgColor('bg-slate-100 dark:bg-slate-800')
                }}
                className="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 rounded text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
