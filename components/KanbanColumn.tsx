"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { KanbanCard } from "./KanbanCard";
import { KanbanColumnProps } from "@/types";

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
}: KanbanColumnProps) {
  // States
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardPriority, setCardPriority] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const [cardBgColor, setCardBgColor] = useState("bg-muted");
  const [dragOverColumn, setDragOverColumn] = useState(false);

  // Add a new card
  const handleAddCard = () => {
    if (cardTitle.trim()) {
      onAddCard(id, cardTitle, cardDescription, cardPriority, cardBgColor);

      setCardTitle("");
      setCardDescription("");
      setCardPriority("medium");
      setCardBgColor("bg-muted");
      setIsAdding(false);
    }
  };

  // Allow dropping cards
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(true);
  };

  // Remove drag highlight
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(false);
  };

  // Move card to column
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(false);

    const draggedData = e.dataTransfer.getData("text/plain");
    const [cardId, fromColumnId] = draggedData.split("|");

    if (fromColumnId !== id) {
      onDropCard(fromColumnId, id, cardId);
    }
  };

  return (
    <div className="w-80 flex-shrink-0">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${backgroundColor} min-h-96 h-full rounded-lg p-4 transition-all ${
          dragOverColumn ? "ring-2 ring-blue-500" : ""
        }`}
      >
        {/* Column header */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${color}`} />

            <h2 className="font-semibold text-foreground">{title}</h2>

            <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
              {cards.length}
            </span>
          </div>

          {/* Delete column button */}
          <button
            onClick={() => onDeleteColumn(id)}
            aria-label="Delete column"
            className="rounded p-1 text-red-600 transition-colors hover:bg-red-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cards list */}
        <div className="mb-4 space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", `${card.id}|${id}`);
                onDragStart(e, card.id, id);
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
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", `${card.id}|${id}`);
                }}
              />
            </div>
          ))}
        </div>

        {/* Add card button */}
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-400 hover:text-blue-600"
          >
            <Plus size={16} />
            Add Card
          </button>
        ) : (
          // New card form
          <div className="space-y-3 rounded-lg border border-border bg-card p-3">
            {/* Card title */}
            <input
              type="text"
              placeholder="Card title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard();
                }
              }}
            />

            {/* Card description */}
            <textarea
              placeholder="Description (optional)"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              className="h-16 w-full resize-none rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Priority selector */}
            <div className="grid grid-cols-2 gap-2">
              <select
                value={cardPriority}
                onChange={(e) =>
                  setCardPriority(e.target.value as "low" | "medium" | "high")
                }
                className="rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Form actions */}
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Add
              </button>

              <button
                onClick={() => {
                  setIsAdding(false);
                  setCardTitle("");
                  setCardDescription("");
                  setCardPriority("medium");
                  setCardBgColor("bg-muted");
                }}
                className="flex-1 rounded bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
