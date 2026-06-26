import React from 'react';
import DroppableCell from './DroppableCell';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6:00 to 22:00

export default function MainGrid({ clases, onCellClick, onClassClick }) {
  const formatHour = (h) => {
    const ampm = h >= 12 ? 'pm' : 'am';
    const hour12 = h > 12 ? h - 12 : h;
    return `${hour12}:00 ${ampm}`;
  };

  return (
    <main className="flex-1 bg-slate-50 overflow-hidden flex flex-col relative z-0">
      {/* Calendar Header */}
      <div className="flex border-b border-slate-200 bg-slate-50 shrink-0 pr-[15px] shadow-sm relative z-10">
        <div className="w-16 shrink-0 border-r border-slate-200"></div>
        {DAYS.map(day => (
          <div key={day} className="flex-1 py-3 text-center text-sm font-bold text-slate-700 border-r border-slate-100 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="flex-1 overflow-y-auto relative bg-slate-50">
        <div className="flex min-h-max">
          {/* Time Column */}
          <div className="w-16 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col relative z-10">
            {HOURS.map(hour => (
              <div key={hour} className="h-20 border-b border-slate-100 flex items-start justify-center pt-2">
                <span className="text-xs text-slate-400 font-semibold">{formatHour(hour)}</span>
              </div>
            ))}
          </div>

          {/* Days Columns Grid */}
          <div className="flex-1 flex relative">
             {/* Background Grid Cells */}
             {DAYS.map(day => (
                <div key={day} className="flex-1 border-r border-slate-200 last:border-r-0 flex flex-col relative">
                  {HOURS.map(hour => {
                    const timeString = `${hour.toString().padStart(2, '0')}:00`;
                    const cellId = `${day}-${timeString}`;
                    return (
                      <DroppableCell 
                        key={cellId} 
                        id={cellId} 
                        onClick={() => onCellClick(day, timeString)}
                      />
                    );
                  })}
                </div>
             ))}

             {/* Overlaid Classes Container */}
             <div className="absolute inset-0 pointer-events-none flex">
               {DAYS.map(day => (
                 <div key={`overlay-${day}`} className="flex-1 relative border-r border-transparent last:border-r-0">
                    {clases.map(clase => {
                       return clase.sesiones
                         .filter(s => s.dia === day)
                         .map((sesion, idx) => {
                            const [startH, startM] = sesion.horaInicio.split(':').map(Number);
                            const [endH, endM] = sesion.horaFin.split(':').map(Number);

                            const startOffset = (startH - 6) + (startM / 60);
                            const duration = (endH - startH) + ((endM - startM) / 60);

                            const top = startOffset * 80; // 80px = h-20 per hour
                            const height = duration * 80;

                            const bgColor = clase.fija 
                              ? 'bg-slate-700 border-slate-800 text-white shadow-md' 
                              : 'bg-teal-100/90 border-teal-200 text-teal-900 shadow-sm backdrop-blur-sm';
                            const textColor = clase.fija ? 'text-slate-200' : 'text-teal-700';

                            return (
                              <div 
                                key={`${clase.id}-${idx}`}
                                className={`absolute left-1.5 right-1.5 rounded-xl border p-2.5 overflow-hidden pointer-events-auto cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 group ${bgColor}`}
                                style={{ top: `${top}px`, height: `${height}px`, zIndex: 10 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClassClick(clase);
                                }}
                              >
                                <p className="font-bold text-xs mb-1.5 truncate leading-tight tracking-tight">{clase.materia.nombre}</p>
                                <div className="flex flex-col gap-1">
                                  <p className={`text-[11px] ${textColor} truncate font-semibold flex items-center`}>
                                    {clase.docente}
                                  </p>
                                  <p className={`text-[10px] ${textColor} truncate opacity-80 font-medium`}>
                                    {clase.grupo} • {clase.modalidad}
                                  </p>
                                </div>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-xl"></div>
                              </div>
                            );
                         });
                    })}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
