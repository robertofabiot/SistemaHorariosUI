import React, { useState, useEffect } from 'react';
import { X, Check, Briefcase, GraduationCap } from 'lucide-react';

export default function ModalDocente({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    domicilio: '',
    gradoAcademico: 'Licenciatura',
    estadoCivil: 'Soltero(a)',
    sexo: 'Masculino',
    expDocente: 0,
    expLaboral: 0,
    activo: true,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        nombres: initialData.nombres || '',
        apellidos: initialData.apellidos || '',
        correo: initialData.correo || '',
        telefono: initialData.telefono || '',
        domicilio: initialData.domicilio || '',
        gradoAcademico: initialData.gradoAcademico || 'Licenciatura',
        estadoCivil: initialData.estadoCivil || 'Soltero(a)',
        sexo: initialData.sexo || 'Masculino',
        expDocente: initialData.expDocente || 0,
        expLaboral: initialData.expLaboral || 0,
        activo: initialData.activo !== false, // Default true
      });
    } else if (isOpen) {
      setFormData({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        domicilio: '',
        gradoAcademico: 'Licenciatura',
        estadoCivil: 'Soltero(a)',
        sexo: 'Masculino',
        expDocente: 0,
        expLaboral: 0,
        activo: true,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Datos a guardar del docente:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? 'Editar Docente' : 'Añadir Docente'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Ingresa la información personal y profesional</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="grid grid-cols-2 gap-5">
            {/* Nombres */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombres</label>
              <input 
                type="text"
                value={formData.nombres}
                onChange={e => setFormData({...formData, nombres: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="Ej. Carlos"
              />
            </div>

            {/* Apellidos */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Apellidos</label>
              <input 
                type="text"
                value={formData.apellidos}
                onChange={e => setFormData({...formData, apellidos: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="Ej. Mendoza"
              />
            </div>

            {/* Correo */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Correo Institucional</label>
              <input 
                type="email"
                value={formData.correo}
                onChange={e => setFormData({...formData, correo: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="carlos.mendoza@uam.edu"
              />
            </div>

            {/* Teléfono */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono</label>
              <input 
                type="tel"
                value={formData.telefono}
                onChange={e => setFormData({...formData, telefono: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="+505 8000-0000"
              />
            </div>

            {/* Sexo */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sexo</label>
              <select 
                value={formData.sexo}
                onChange={e => setFormData({...formData, sexo: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Domicilio */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Domicilio</label>
              <input 
                type="text"
                value={formData.domicilio}
                onChange={e => setFormData({...formData, domicilio: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
                placeholder="Dirección completa"
              />
            </div>

            {/* Grado Académico */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1.5 text-teal-600" />
                Grado Académico
              </label>
              <select 
                value={formData.gradoAcademico}
                onChange={e => setFormData({...formData, gradoAcademico: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              >
                <option value="Licenciatura">Licenciatura</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
                <option value="Especialidad">Especialidad</option>
              </select>
            </div>

            {/* Estado Civil */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Estado Civil</label>
              <select 
                value={formData.estadoCivil}
                onChange={e => setFormData({...formData, estadoCivil: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              >
                <option value="Soltero(a)">Soltero(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viudo(a)">Viudo(a)</option>
              </select>
            </div>

            {/* Exp Docente */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-teal-600" />
                Exp. Docente (años)
              </label>
              <input 
                type="number"
                min="0"
                value={formData.expDocente}
                onChange={e => setFormData({...formData, expDocente: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              />
            </div>

            {/* Exp Laboral */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Exp. Laboral (años)</label>
              <input 
                type="number"
                min="0"
                value={formData.expLaboral}
                onChange={e => setFormData({...formData, expLaboral: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all hover:border-slate-300"
              />
            </div>
          </div>

          <div className="pt-4 pb-2 border-t border-slate-100">
             <label className="flex items-center space-x-3 cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors">
               <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    checked={formData.activo}
                    onChange={e => setFormData({...formData, activo: e.target.checked})}
                    className="absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10"
                    style={{ transform: formData.activo ? 'translateX(1.25rem)' : 'translateX(0)', borderColor: formData.activo ? '#0d9488' : '#cbd5e1' }}
                  />
                  <div 
                    className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ease-in-out ${formData.activo ? 'bg-teal-500' : 'bg-slate-300'}`}
                  ></div>
               </div>
               <div className="flex-1">
                 <span className={`text-sm font-bold transition-colors ${formData.activo ? 'text-teal-700' : 'text-slate-600'}`}>
                    Activo en el sistema
                 </span>
                 <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                   Si se desactiva, el docente no aparecerá en las asignaciones pero su historial se mantiene.
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
