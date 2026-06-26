import React, { useState } from 'react';
import { Plus, BookOpen, Users } from 'lucide-react';
import DraggableSubjectCard from './DraggableSubjectCard';

export default function Sidebar({ materias, docentes, onAddDocente, onEditDocente, onAddMateria, onEditMateria }) {
  const [activeTab, setActiveTab] = useState('materias');

  return (
    <aside className="w-80 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 relative">
      <div className="flex bg-white border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('materias')}
          className={`flex-1 py-3.5 text-sm font-bold transition-all flex items-center justify-center border-b-[3px] ${activeTab === 'materias' ? 'border-teal-600 text-teal-600 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Materias
        </button>
        <button 
          onClick={() => setActiveTab('docentes')}
          className={`flex-1 py-3.5 text-sm font-bold transition-all flex items-center justify-center border-b-[3px] ${activeTab === 'docentes' ? 'border-teal-600 text-teal-600 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <Users className="w-4 h-4 mr-2" />
          Docentes
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <button 
          onClick={activeTab === 'materias' ? onAddMateria : onAddDocente}
          className="w-full mb-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir {activeTab === 'materias' ? 'materia' : 'docente'}
        </button>

        <div className="flex flex-col gap-3">
          {activeTab === 'materias' && materias.map(materia => (
            <DraggableSubjectCard 
              key={materia.id} 
              materia={materia} 
              onEdit={() => onEditMateria(materia)}
            />
          ))}
          {activeTab === 'docentes' && (
             docentes && docentes.length > 0 ? (
               docentes.map(docente => (
                 <div 
                   key={docente.id}
                   onClick={() => onEditDocente(docente)}
                   className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
                 >
                   <div className="flex flex-col">
                     <p className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-teal-700 transition-colors">
                       {docente.nombres} {docente.apellidos}
                     </p>
                     <p className="text-[11px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase">{docente.gradoAcademico}</p>
                   </div>
                   <div className="flex items-center">
                     <span className={`flex h-2.5 w-2.5 rounded-full ${docente.activo ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]' : 'bg-slate-300'}`} title={docente.activo ? "Activo" : "Inactivo"}></span>
                   </div>
                 </div>
               ))
             ) : (
               <div className="text-center text-sm text-slate-400 py-8 bg-white rounded-xl border border-slate-200 border-dashed">
                 No hay docentes registrados
               </div>
             )
          )}
        </div>
      </div>
    </aside>
  );
}
