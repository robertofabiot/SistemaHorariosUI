import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import MainGrid from './components/MainGrid';
import ModalNuevaClase from './components/ModalNuevaClase';
import ModalDocente from './components/ModalDocente';
import ModalMateria from './components/ModalMateria';
import ModalExportacion from './components/ModalExportacion';
import PanelVersiones from './components/PanelVersiones';
import { DndContext, DragOverlay } from '@dnd-kit/core';

// ==============================================================================
// TODO: REMOVE - REEMPLAZAR CON FETCH A /api/clases-programadas y /api/materias
// ==============================================================================
const MOCK_MATERIAS = [
  { 
    id: 'm1', 
    codigo: 'CB-101', 
    nombre: 'Cálculo I', 
    horasRequeridas: 4, 
    nivelAcademico: 1, 
    modalidadTentativa: 'PRESENCIAL', 
    esIntocable: false 
  },
  { 
    id: 'm2', 
    codigo: 'SIS-110', 
    nombre: 'Introducción a las TIC', 
    horasRequeridas: 3, 
    nivelAcademico: 1, 
    modalidadTentativa: 'MIXTA', 
    esIntocable: true 
  }
];

const MOCK_CLASES = [
  {
    id: 'c1',
    materia: { id: 'm1', codigo: 'CB-101', nombre: 'Cálculo I' },
    docente: 'Dr. Juan Pérez',
    grupo: 'G1',
    modalidad: 'Presencial',
    fija: false,
    sesiones: [{ dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00' }]
  }
];

const MOCK_DOCENTES = [
  {
    id: 'd1',
    nombres: 'Carlos',
    apellidos: 'Mendoza',
    correo: 'carlos.mendoza@uam.edu',
    telefono: '+505 8888-1111',
    domicilio: 'Managua',
    gradoAcademico: 'Maestría',
    estadoCivil: 'Casado(a)',
    sexo: 'Masculino',
    expDocente: 10,
    expLaboral: 15,
    activo: true
  },
  {
    id: 'd2',
    nombres: 'Laura',
    apellidos: 'Gutiérrez',
    correo: 'laura.gutierrez@uam.edu',
    telefono: '+505 8888-2222',
    domicilio: 'Managua',
    gradoAcademico: 'Doctorado',
    estadoCivil: 'Soltero(a)',
    sexo: 'Femenino',
    expDocente: 5,
    expLaboral: 5,
    activo: false
  }
];

const MOCK_VERSIONES = [
  { id: 2, numeroVersion: 2, estado: 'BORRADOR', observaciones: 'Ajuste de choques en C-205' },
  { id: 1, numeroVersion: 1, estado: 'EN_REVISION', observaciones: 'Revisión inicial' }
];

function App() {
  const [materias, setMaterias] = useState(MOCK_MATERIAS);
  const [clasesProgramadas, setClasesProgramadas] = useState(MOCK_CLASES);
  const [docentes, setDocentes] = useState(MOCK_DOCENTES);
  const [versiones, setVersiones] = useState(MOCK_VERSIONES);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); 
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  
  const [isModalDocenteOpen, setIsModalDocenteOpen] = useState(false);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);

  const [isModalMateriaOpen, setIsModalMateriaOpen] = useState(false);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const [isPanelVersionesOpen, setIsPanelVersionesOpen] = useState(false);
  const [isModalExportacionOpen, setIsModalExportacionOpen] = useState(false);
  
  const [activeDragId, setActiveDragId] = useState(null);

  const currentVersion = versiones[0];

  const handleClonarVersion = () => {
    const highestVersion = Math.max(...(versiones || []).map(v => v.numeroVersion), 0);
    const nuevaVersion = {
      id: Date.now(),
      numeroVersion: highestVersion + 1,
      estado: 'BORRADOR',
      observaciones: `Duplicada desde versión ${highestVersion}`
    };
    setVersiones([nuevaVersion, ...versiones]);
  };

  const handleCambiarEstado = (versionId, nuevoEstado) => {
    setVersiones((versiones || []).map(v => 
      v.id === versionId ? { ...v, estado: nuevoEstado } : v
    ));
  };

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveDragId(null);
    const { active, over } = event;

    if (over) {
      // Opened modal with dropped subject and target cell info
      const materiaId = active.id;
      const targetCellId = over.id; // e.g. "Lunes-08:00"
      
      const materia = (materias || []).find(m => m.id === materiaId);
      
      setModalData({
        materia,
        initialCell: targetCellId,
      });
      setIsModalOpen(true);
    }
  };

  const handleCellClick = (day, time) => {
    setModalData({
      materia: null,
      initialCell: `${day}-${time}`
    });
    setClaseSeleccionada(null);
    setIsModalOpen(true);
  };

  const handleClassClick = (clase) => {
    setClaseSeleccionada(clase);
    setIsModalOpen(true);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-white text-slate-900 font-sans selection:bg-teal-200">
        <TopBar 
          currentVersion={currentVersion}
          onOpenVersiones={() => setIsPanelVersionesOpen(true)}
          onExportar={() => setIsModalExportacionOpen(true)}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            materias={materias} 
            docentes={docentes}
            onAddDocente={() => {
              setDocenteSeleccionado(null);
              setIsModalDocenteOpen(true);
            }}
            onEditDocente={(docente) => {
              setDocenteSeleccionado(docente);
              setIsModalDocenteOpen(true);
            }}
            onAddMateria={() => {
              setMateriaSeleccionada(null);
              setIsModalMateriaOpen(true);
            }}
            onEditMateria={(materia) => {
              setMateriaSeleccionada(materia);
              setIsModalMateriaOpen(true);
            }}
          />
          <MainGrid 
            clases={clasesProgramadas} 
            onCellClick={handleCellClick} 
            onClassClick={handleClassClick}
          />
        </div>
        
        <ModalNuevaClase 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setModalData(null);
            setClaseSeleccionada(null);
          }} 
          initialData={modalData}
          claseSeleccionada={claseSeleccionada}
          materias={materias}
          onSave={(nuevaClase) => {
            if (claseSeleccionada) {
              console.log(`Editando clase ID: ${claseSeleccionada.id}`);
              setClasesProgramadas((clasesProgramadas || []).map(c => c.id === claseSeleccionada.id ? nuevaClase : c));
            } else {
              setClasesProgramadas([...(clasesProgramadas || []), nuevaClase]);
            }
            setIsModalOpen(false);
            setModalData(null);
            setClaseSeleccionada(null);
          }}
        />

        <ModalDocente 
          isOpen={isModalDocenteOpen}
          onClose={() => setIsModalDocenteOpen(false)}
          initialData={docenteSeleccionado}
        />

        <ModalMateria 
          isOpen={isModalMateriaOpen}
          onClose={() => setIsModalMateriaOpen(false)}
          initialData={materiaSeleccionada}
        />

        <PanelVersiones 
          isOpen={isPanelVersionesOpen}
          onClose={() => setIsPanelVersionesOpen(false)}
          versiones={versiones}
          onClonarVersion={handleClonarVersion}
          onCambiarEstado={handleCambiarEstado}
        />

        <ModalExportacion 
          isOpen={isModalExportacionOpen}
          onClose={() => setIsModalExportacionOpen(false)}
        />
        
        <DragOverlay dropAnimation={null}>
          {activeDragId ? (
            <div 
              style={{ transformOrigin: '0 0' }}
              className="m-0 p-3.5 bg-white border border-teal-500 rounded-xl shadow-2xl opacity-90 rotate-2 flex items-center w-[288px]"
            >
               <div className="w-1.5 h-10 bg-teal-600 rounded-full mr-3"></div>
               <div>
                  <p className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-0.5">
                    {(materias || []).find(m => m.id === activeDragId)?.codigo}
                  </p>
                  <p className="font-bold text-sm text-slate-800 leading-tight">
                    {(materias || []).find(m => m.id === activeDragId)?.nombre}
                  </p>
               </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
