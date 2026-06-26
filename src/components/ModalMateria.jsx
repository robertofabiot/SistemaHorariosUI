import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function ModalMateria({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    horasRequeridas: 1,
    nivelAcademico: 1,
    modalidadTentativa: 'PRESENCIAL',
    esIntocable: false,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        codigo: initialData.codigo || '',
        nombre: initialData.nombre || '',
        horasRequeridas: initialData.horasRequeridas || 1,
        nivelAcademico: initialData.nivelAcademico || 1,
        modalidadTentativa: initialData.modalidadTentativa || 'PRESENCIAL',
        esIntocable: initialData.esIntocable || false,
      });
    } else if (isOpen) {
      setFormData({
        codigo: '',
        nombre: '',
        horasRequeridas: 1,
        nivelAcademico: 1,
        modalidadTentativa: 'PRESENCIAL',
        esIntocable: false,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Datos a guardar de la materia:", formData);
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
        <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? 'Editar Materia' : 'Añadir Materia'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Configura la información académica</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="grid grid-cols-2 gap-5">
            {/* Código */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Código</label>
              <input 
                type="text"
                value={formData.codigo}
                onChange={e => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300 uppercase"
                placeholder="Ej. SIS0110"
              />
            </div>

            {/* Nivel Académico */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nivel Académico (Semestre)</label>
              <input 
                type="number"
                min="1"
                value={formData.nivelAcademico}
                onChange={e => setFormData({...formData, nivelAcademico: parseInt(e.target.value) || 1})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              />
            </div>

            {/* Nombre */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre de la Materia</label>
              <input 
                type="text"
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="Ej. Cálculo I"
              />
            </div>

            {/* Horas Requeridas */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Horas Requeridas</label>
              <input 
                type="number"
                min="1"
                value={formData.horasRequeridas}
                onChange={e => setFormData({...formData, horasRequeridas: parseInt(e.target.value) || 1})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              />
            </div>

            {/* Modalidad Tentativa */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Modalidad Tentativa</label>
              <select 
                value={formData.modalidadTentativa}
                onChange={e => setFormData({...formData, modalidadTentativa: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              >
                <option value="PRESENCIAL">PRESENCIAL</option>
                <option value="VIRTUAL">VIRTUAL</option>
                <option value="MIXTA">MIXTA</option>
              </select>
            </div>
          </div>

          <div className="pt-4 pb-2 border-t border-slate-100">
             <label className="flex items-center space-x-3 cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
               <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    checked={formData.esIntocable}
                    onChange={e => setFormData({...formData, esIntocable: e.target.checked})}
                    className="absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10"
                    style={{ transform: formData.esIntocable ? 'translateX(1.25rem)' : 'translateX(0)', borderColor: formData.esIntocable ? '#0f172a' : '#cbd5e1' }}
                  />
                  <div 
                    className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ease-in-out ${formData.esIntocable ? 'bg-slate-700' : 'bg-slate-300'}`}
                  ></div>
               </div>
               <div className="flex-1">
                 <span className={`text-sm font-bold transition-colors ${formData.esIntocable ? 'text-slate-800' : 'text-slate-600'}`}>
                    Es Intocable (Fija por logística)
                 </span>
                 <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                   Las materias intocables no pueden ser reasignadas fácilmente por el sistema o por usuarios sin permisos.
                 </p>
               </div>
             </label>
          </div>

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
            onClick={handleSave}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg rounded-xl transition-all transform hover:-translate-y-px flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
