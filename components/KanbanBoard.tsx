'use client'

import { useState, useEffect } from 'react'
import { Plus, Moon, Sun, Search } from 'lucide-react'
import { KanbanColumn, Card } from './kanban-column'
import { useTheme } from './theme-provider'

interface Column {
  id: string
  title: string
  color: string
  backgroundColor: string
  cards: Card[]
}

export function KanbanBoard() {
  const { isDark, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-500',
      backgroundColor: 'bg-blue-100 dark:bg-blue-900',
      cards: [
        { id: '1', title: 'Design new landing page', description: 'Create wireframes and mockups', priority: 'high', backgroundColor: 'bg-blue-100 dark:bg-blue-900' },
        { id: '2', title: 'Update documentation', description: 'Add API endpoints', priority: 'medium', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-purple-500',
      backgroundColor: 'bg-purple-100 dark:bg-purple-900',
      cards: [
        { id: '3', title: 'Implement authentication', description: 'OAuth integration', priority: 'high', backgroundColor: 'bg-purple-100 dark:bg-purple-900' },
        { id: '4', title: 'Database optimization', priority: 'medium', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      backgroundColor: 'bg-green-100 dark:bg-green-900',
      cards: [
        { id: '5', title: 'Setup CI/CD pipeline', priority: 'low', backgroundColor: 'bg-green-100 dark:bg-green-900' },
        { id: '6', title: 'Configure monitoring', priority: 'low', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
  ])

  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [newColumnBgColor, setNewColumnBgColor] = useState('bg-slate-100 dark:bg-slate-800')

  const handleAddCard = (
    columnId: string,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    backgroundColor: string
  ) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  title,
                  description,
                  priority,
                  backgroundColor,
                },
              ],
            }
          : col
      )
    )
  }

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.filter((card) => card.id !== cardId),
            }
          : col
      )
    )
  }

  const handleDropCard = (
    fromColumnId: string,
    toColumnId: string,
    cardId: string
  ) => {
    const card = columns
      .find((col) => col.id === fromColumnId)
      ?.cards.find((c) => c.id === cardId)

    if (!card) return

    setColumns(
      columns.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          }
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            cards: [...col.cards, card],
          }
        }
        return col
      })
    )
  }

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId))
  }

  const handleUpdateColumnColor = (columnId: string, backgroundColor: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, backgroundColor } : col
      )
    )
  }

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: Math.random().toString(36).substr(2, 9),
        title: newColumnTitle,
        color: 'bg-slate-500',
        backgroundColor: newColumnBgColor,
        cards: [],
      }
      setColumns([...columns, newColumn])
      setNewColumnTitle('')
      setNewColumnBgColor('bg-slate-100 dark:bg-slate-800')
      setIsAddingColumn(false)
    }
  }

  const getFilteredColumns = () => {
    if (!searchQuery.trim()) {
      return columns
    }

    const query = searchQuery.toLowerCase()
    return columns.map((col) => ({
      ...col,
      cards: col.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(query) ||
          card.description?.toLowerCase().includes(query)
      ),
    }))
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Organize your tasks with ease
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full overflow-x-auto">
        <div className="p-6 flex gap-6 min-w-min">
          {getFilteredColumns().map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              backgroundColor={column.backgroundColor}
              cards={column.cards}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onDropCard={handleDropCard}
              onDeleteColumn={handleDeleteColumn}
              onUpdateColumnColor={handleUpdateColumnColor}
              onDragStart={() => {}}
            />
          ))}

          {/* Add Column Button */}
          {!isAddingColumn ? (
            <div className="flex-shrink-0 w-80">
              <button
                onClick={() => setIsAddingColumn(true)}
                className="w-full h-full min-h-96 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Plus size={32} />
                  <span className="font-medium">Add Column</span>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex-shrink-0 w-80 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <input
                type="text"
                placeholder="Column title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddColumn()
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddColumn}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingColumn(false)
                    setNewColumnTitle('')
                  }}
                  className="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 rounded text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
