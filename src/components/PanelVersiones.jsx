import React from 'react';
import { X, Copy } from 'lucide-react';

export default function PanelVersiones({ isOpen, onClose, versiones, onClonarVersion, onCambiarEstado }) {
  if (!isOpen) return null;

  const handleClonar = () => {
    onClonarVersion();
  };

  const getNodeColor = (estado) => {
    switch(estado) {
      case 'BORRADOR': return 'bg-amber-400';
      case 'EN_REVISION': return 'bg-teal-500';
      case 'APROBADA': return 'bg-emerald-500';
      case 'RECHAZADA': return 'bg-rose-500';
      case 'EXPORTADA': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusClasses = (estado) => {
    switch(estado) {
      case 'BORRADOR': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'EN_REVISION': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'APROBADA': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'RECHAZADA': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'EXPORTADA': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slide-over panel */}
      <div className="relative w-96 bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Historial de Versiones</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
            {(versiones || []).map((v) => (
              <div key={v.id} className="relative pl-6">
                {/* Node */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${getNodeColor(v.estado)}`}></div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800">Versión {v.numeroVersion}</h3>
                    <select
                      value={v.estado}
                      onChange={(e) => onCambiarEstado(v.id, e.target.value)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider outline-none border focus:ring-2 focus:ring-slate-300 appearance-none cursor-pointer transition-colors ${getStatusClasses(v.estado)}`}
                    >
                      <option value="BORRADOR">BORRADOR</option>
                      <option value="EN_REVISION">EN REVISIÓN</option>
                      <option value="APROBADA">APROBADA</option>
                      <option value="RECHAZADA">RECHAZADA</option>
                      <option value="EXPORTADA">EXPORTADA</option>
                    </select>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.observaciones}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="p-6 border-t border-slate-100 bg-white">
          <button 
            onClick={handleClonar}
            className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 flex items-center justify-center text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px"
          >
            <Copy className="w-4 h-4 mr-2" />
            Crear Nueva Versión (Clonar actual)
          </button>
        </div>
      </div>
    </div>
  );
}
