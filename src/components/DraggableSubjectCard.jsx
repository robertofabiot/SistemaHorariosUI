import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Lock } from 'lucide-react';

export default function DraggableSubjectCard({ materia, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: materia.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const cardBorderClass = materia.esIntocable ? 'border-slate-300 bg-slate-50' : 'border-slate-200 bg-white';

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      onClick={onEdit}
      className={`group flex items-center p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing relative z-50 overflow-hidden border ${cardBorderClass} ${materia.esIntocable ? 'hover:border-slate-500' : 'hover:border-teal-300'}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity ${materia.esIntocable ? 'bg-slate-600' : 'bg-teal-500'}`}></div>
      
      <div 
        className="text-slate-300 group-hover:text-teal-500 transition-colors mr-3 ml-1"
        {...listeners} 
        {...attributes}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-bold text-slate-400 mb-0.5 tracking-wider uppercase flex items-center">
          {materia.codigo}
        </p>
        <p className={`text-sm font-semibold leading-tight ${materia.esIntocable ? 'text-slate-800' : 'text-slate-700'}`}>
          {materia.nombre}
        </p>
      </div>
      {materia.esIntocable && (
        <div className="ml-2 text-slate-400" title="Materia intocable">
          <Lock className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
