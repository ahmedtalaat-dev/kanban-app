
export interface Column {
  id: string
  title: string
  color: string
  backgroundColor: string
  cards: Card[]
}

export interface KanbanCardProps {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  backgroundColor?: string
  onDelete: (id: string) => void
  onDragStart: (e: React.DragEvent, id: string) => void
}

export interface Card {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  backgroundColor?: string
}

export interface KanbanColumnProps {
  id: string
  title: string
  color: string
  backgroundColor: string
  cards: Card[]
  onAddCard: (columnId: string, title: string, description: string, priority: 'low' | 'medium' | 'high', backgroundColor: string) => void
  onDeleteCard: (columnId: string, cardId: string) => void
  onDropCard: (fromColumnId: string, toColumnId: string, cardId: string) => void
  onDeleteColumn: (columnId: string) => void
  onDragStart: (e: React.DragEvent, cardId: string, columnId: string) => void
  onUpdateColumnColor?: (columnId: string, backgroundColor: string) => void
}

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}