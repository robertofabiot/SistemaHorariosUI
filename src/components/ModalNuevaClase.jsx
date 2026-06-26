import React, { useState, useEffect } from 'react';
import { X, Plus, Clock, Calendar, Check, AlertCircle } from 'lucide-react';

export default function ModalNuevaClase({ isOpen, onClose, initialData, claseSeleccionada, materias, onSave }) {
  const [formData, setFormData] = useState({
    materiaId: '',
    docenteId: '',
    grupoId: '',
    modalidad: 'Presencial',
    fija: false,
    dia: 'Lunes',
    horaInicio: '08:00',
    horaFin: '10:00'
  });

  const [docentes, setDocentes] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoadingCatalogos(true);
      Promise.all([
        fetch('http://localhost:8080/api/docentes/activos').then(res => res.json()).catch(() => []),
        fetch('http://localhost:8080/api/grupos').then(res => res.json()).catch(() => [])
      ])
      .then(([docentesData, gruposData]) => {
        setDocentes(docentesData || []);
        setGrupos(gruposData || []);
      })
      .finally(() => {
        setLoadingCatalogos(false);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (claseSeleccionada) {
        setFormData({
          materiaId: claseSeleccionada.materia?.id || '',
          docenteId: claseSeleccionada.docente?.id || claseSeleccionada.docente || '',
          grupoId: claseSeleccionada.grupo?.id || claseSeleccionada.grupo || '',
          modalidad: claseSeleccionada.modalidad || 'Presencial',
          fija: claseSeleccionada.fija || false,
          dia: claseSeleccionada.sesiones?.[0]?.dia || 'Lunes',
          horaInicio: claseSeleccionada.sesiones?.[0]?.horaInicio || '08:00',
          horaFin: claseSeleccionada.sesiones?.[0]?.horaFin || '10:00'
        });
      } else if (initialData) {
        let day = 'Lunes';
        let hour = '08:00';
        
        if (initialData.initialCell) {
          const parts = initialData.initialCell.split('-');
          if (parts.length === 2) {
            day = parts[0];
            hour = parts[1];
          }
        }

        const [h, m] = hour.split(':').map(Number);
        const endH = Math.min(22, h + 2).toString().padStart(2, '0');
        const endM = m.toString().padStart(2, '0');

        setFormData({
          materiaId: initialData.materia?.id || '',
          docenteId: '',
          grupoId: '',
          modalidad: 'Presencial',
          fija: false,
          dia: day,
          horaInicio: hour,
          horaFin: `${endH}:${endM}`
        });
      } else {
        setFormData({
          materiaId: '',
          docenteId: '',
          grupoId: '',
          modalidad: 'Presencial',
          fija: false,
          dia: 'Lunes',
          horaInicio: '08:00',
          horaFin: '10:00'
        });
      }
    }
  }, [initialData, claseSeleccionada, isOpen]);

  if (!isOpen) return null;

  const handleAddSession = () => {
    alert("Función de guardar múltiples sesiones simultáneas en desarrollo en backend");
  };

  const handleSave = () => {
    const selectedMateria = (materias || []).find(m => m.id === formData.materiaId);
    if (!selectedMateria) return alert("Por favor, selecciona una materia.");

    const dObj = (docentes || []).find(d => d.id.toString() === formData.docenteId.toString());
    const gObj = (grupos || []).find(g => g.id.toString() === formData.grupoId.toString());

    const nuevaClase = {
      id: claseSeleccionada ? claseSeleccionada.id : `new-${Date.now()}`,
      materia: selectedMateria,
      docente: dObj ? `${dObj.nombres} ${dObj.apellidos}` : (formData.docenteId || 'Docente por asignar'),
      grupo: gObj ? gObj.nombre : (formData.grupoId || 'G1'),
      modalidad: formData.modalidad,
      fija: formData.fija,
      sesiones: [{
        dia: formData.dia,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin
      }]
    };

    onSave(nuevaClase);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Window */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {claseSeleccionada ? 'Editar Clase' : 'Nueva Clase'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Configura los detalles de la asignación académica</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {loadingCatalogos ? (
          <div className="p-12 text-center text-slate-500 font-medium flex-1 flex flex-col justify-center items-center">
            <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
            Cargando catálogos...
          </div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Materia</label>
                <select 
                  value={formData.materiaId}
                  onChange={e => setFormData({...formData, materiaId: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                >
                  <option value="" disabled>Seleccione una materia...</option>
                {(materias || []).map(m => (
                  <option key={m.id} value={m.id}>{m.codigo} - {m.nombre}</option>
                ))}
              </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Docente</label>
                <select 
                  value={formData.docenteId}
                  onChange={e => setFormData({...formData, docenteId: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                >
                  <option value="">Seleccione docente...</option>
                {(docentes || []).map(d => (
                  <option key={d.id} value={d.id}>{d.nombres} {d.apellidos}</option>
                ))}
              </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Grupo</label>
                <select 
                  value={formData.grupoId}
                  onChange={e => setFormData({...formData, grupoId: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                >
                  <option value="">Seleccione grupo...</option>
                {(grupos || []).map(g => (
                  <option key={g.id} value={g.id}>{g.nombre}</option>
                ))}
              </select>
              </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Modalidad</label>
              <div className="grid grid-cols-3 gap-3">
                {['Presencial', 'Virtual', 'Mixta'].map(mod => (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setFormData({...formData, modalidad: mod})}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all flex justify-center items-center ${formData.modalidad === mod ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {formData.modalidad === mod && <Check className="w-3.5 h-3.5 mr-1.5" />}
                    {mod}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-teal-600" />
              Horario de Sesiones
            </h3>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm hover:border-teal-200 transition-colors">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <select 
                  value={formData.dia}
                  onChange={e => setFormData({...formData, dia: e.target.value})}
                  className="flex-1 min-w-[120px] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input 
                    type="time" 
                    value={formData.horaInicio}
                    onChange={e => setFormData({...formData, horaInicio: e.target.value})}
                    className="bg-transparent text-sm font-medium focus:outline-none w-full"
                  />
                </div>
                
                <span className="text-slate-400 font-medium hidden sm:inline">-</span>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input 
                    type="time" 
                    value={formData.horaFin}
                    onChange={e => setFormData({...formData, horaFin: e.target.value})}
                    className="bg-transparent text-sm font-medium focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddSession}
              className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-teal-600 hover:bg-teal-50 hover:border-teal-300 flex items-center justify-center text-sm font-semibold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Añadir otra sesión / repetición
            </button>
          </div>

          <div className="pt-4 pb-2">
             <label className="flex items-start space-x-3 cursor-pointer group bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
               <div className="relative flex items-center justify-center mt-0.5">
                 <input 
                   type="checkbox" 
                   checked={formData.fija}
                   onChange={e => setFormData({...formData, fija: e.target.checked})}
                   className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded bg-white checked:bg-slate-700 checked:border-slate-700 transition-colors cursor-pointer focus:ring-2 focus:ring-slate-400 focus:ring-offset-1" 
                 />
                 <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
               </div>
               <div className="flex-1">
                 <span className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">Clase fija (compartida)</span>
                 <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                   Marcar si la clase tiene inamovilidad logística (ej. laboratorios de facultad o clases transversales). Se mostrará en gris oscuro.
                 </p>
               </div>
               <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
             </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg rounded-xl transition-all transform hover:-translate-y-px flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Guardar clase
          </button>
        </div>

      </div>
    </div>
  );
}
