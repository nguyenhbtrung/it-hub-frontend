import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export function useDragDrop<T extends { id: string }>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleDragEnd = (activeId: string, overId: string | null) => {
    if (!overId) return;

    const activeIndex = items.findIndex((item) => item.id === activeId);
    const overIndex = items.findIndex((item) => item.id === overId);

    if (activeIndex !== overIndex) {
      setItems(arrayMove(items, activeIndex, overIndex));
    }
  };

  const addItem = (item: T) => {
    setItems([...items, item]);
  };

  const updateItem = (id: string, updates: Partial<T>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return {
    items,
    setItems,
    handleDragEnd,
    addItem,
    updateItem,
    removeItem,
  };
}
