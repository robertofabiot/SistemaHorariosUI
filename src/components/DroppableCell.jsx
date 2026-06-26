import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function DroppableCell({ id, onClick }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      onClick={onClick}
      className={`h-20 border-b border-slate-200 transition-all cursor-pointer group relative ${isOver ? 'bg-teal-50 ring-inset ring-2 ring-teal-400 z-10' : 'hover:bg-teal-50/30'}`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xl font-light text-slate-300">+</span>
      </div>
    </div>
  );
}
