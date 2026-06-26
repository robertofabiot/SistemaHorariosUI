import React from 'react';
import { X, Download, AlertTriangle } from 'lucide-react';

const MOCK_ERRORES = [
  { id: 1, materia: 'Introducción a las TIC', detalle: 'Faltan 2 horas asignadas (Requeridas: 3, Programadas: 1).' },
  { id: 2, materia: 'Metodología de la Investigación', detalle: 'Materia requerida en el semestre no tiene docente asignado.' }
];

export default function ModalExportacion({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    console.log("Iniciando descarga de exportación...");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              Exportar Horario a Excel (Sala Docente)
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors focus:outline-none">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 mb-1">Advertencia de Inconsistencias</h3>
              <p className="text-sm text-amber-700/80 leading-relaxed">
                Se han detectado inconsistencias en la carga horaria de las siguientes clases:
              </p>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl bg-slate-50 p-2 space-y-2">
            {MOCK_ERRORES.map(error => (
              <div key={error.id} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex flex-col">
                <span className="font-bold text-slate-700 text-sm">{error.materia}</span>
                <span className="text-xs text-rose-600 font-medium mt-1">{error.detalle}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600 font-medium mt-6 text-center">
            ¿Deseas proceder con la exportación ignorando estas advertencias?
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleDownload}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg rounded-xl transition-all transform hover:-translate-y-px flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Confirmar y Descargar
          </button>
        </div>

      </div>
    </div>
  );
}
