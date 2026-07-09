"use client";

import { useState, useEffect } from "react";
import { Plus, Moon, Sun, Search } from "lucide-react";
import { KanbanColumn } from "./KanbanColumn";
import { useTheme } from "./ThemeProvider";
import { Column } from "@/types";
import { columnsData } from "@/data";

export function KanbanBoard() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [columns, setColumns] = useState(columnsData);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnBgColor, setNewColumnBgColor] = useState("bg-muted");

  const handleAddCard = (
    columnId: string,
    title: string,
    description: string,
    priority: "low" | "medium" | "high",
    backgroundColor: string,
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
          : col,
      ),
    );
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.filter((card) => card.id !== cardId),
            }
          : col,
      ),
    );
  };

  const handleDropCard = (
    fromColumnId: string,
    toColumnId: string,
    cardId: string,
  ) => {
    const card = columns
      .find((col) => col.id === fromColumnId)
      ?.cards.find((c) => c.id === cardId);

    if (!card) return;

    setColumns(
      columns.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      }),
    );
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  const handleUpdateColumnColor = (
    columnId: string,
    backgroundColor: string,
  ) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, backgroundColor } : col,
      ),
    );
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: Math.random().toString(36).substr(2, 9),
        title: newColumnTitle,
        color: "bg-slate-500",
        backgroundColor: newColumnBgColor,
        cards: [],
      };
      setColumns([...columns, newColumn]);
      setNewColumnTitle("");
      setNewColumnBgColor("bg-slate-100 dark:bg-slate-800");
      setIsAddingColumn(false);
    }
  };

  const getFilteredColumns = () => {
    if (!searchQuery.trim()) {
      return columns;
    }

    const query = searchQuery.toLowerCase();
    return columns.map((col) => ({
      ...col,
      cards: col.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(query) ||
          card.description?.toLowerCase().includes(query),
      ),
    }));
  };

  if (!mounted) return null;

  return (
    // Main page container
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
        <div className="mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-muted-foreground">
                Organize your tasks with ease
              </p>
            </div>

            {/* Search and theme controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64 sm:flex-initial">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2 pr-4 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex-shrink-0 rounded-lg bg-secondary p-2 transition-colors hover:bg-accent"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-full overflow-x-auto">
        <div className="flex min-w-min gap-6 p-6">
          {/* Kanban columns */}
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

          {/* Add column button */}
          {!isAddingColumn ? (
            <div className="w-80 flex-shrink-0">
              <button
                onClick={() => setIsAddingColumn(true)}
                className="group flex h-full min-h-96 w-full items-center justify-center rounded-lg border-2 border-dashed border-border transition-all hover:border-blue-400 hover:bg-accent"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-blue-600">
                  <Plus size={32} />
                  <span className="font-medium">Add Column</span>
                </div>
              </button>
            </div>
          ) : (
            /* New column form */
            <div className="w-80 flex-shrink-0 rounded-lg bg-card p-4">
              <input
                type="text"
                placeholder="Column title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="mb-3 w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddColumn();
                  }
                }}
              />

              {/* Form actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddColumn}
                  className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Add
                </button>

                <button
                  onClick={() => {
                    setIsAddingColumn(false);
                    setNewColumnTitle("");
                  }}
                  className="flex-1 rounded bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
