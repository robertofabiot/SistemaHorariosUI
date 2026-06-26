import React from 'react';
import { Download, History } from 'lucide-react';

export default function TopBar({ currentVersion, onOpenVersiones, onExportar }) {
  const formatEstado = (estado) => {
    switch(estado) {
      case 'BORRADOR': return 'Borrador';
      case 'EN_REVISION': return 'En Revisión';
      case 'APROBADA': return 'Aprobada';
      case 'RECHAZADA': return 'Rechazada';
      case 'EXPORTADA': return 'Exportada';
      default: return estado;
    }
  };
  const versionText = currentVersion ? `Versión ${currentVersion.numeroVersion} (${formatEstado(currentVersion.estado)})` : 'Versiones';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-20 relative">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
          <span className="text-white font-bold text-lg leading-none tracking-tighter">J</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          JaguarBox
        </span>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        {/* TODO: Fetch /api/carreras */}
        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner">
          <option>Ingeniería en Sistemas - I Semestre</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={onOpenVersiones}
          className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm"
        >
          <History className="w-4 h-4 mr-2 text-slate-400" />
          {versionText}
        </button>
        <button 
          onClick={onExportar}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-px"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </button>
      </div>
    </header>
  );
}
