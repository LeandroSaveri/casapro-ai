import React, { useState, useEffect } from 'react';

import { useProjectStore } from './store/projectStore';
import { useUIStore } from './store/uiStore';
import { useUserStore } from './store/userStore';
import { useTemplateStore } from './store/templateStore';

import Toolbar from './components/ui/Toolbar';
import Canvas2D from './components/canvas/Canvas2D';
import Canvas3D from './components/canvas/Canvas3D';
import FurniturePanel from './components/ui/FurniturePanel';
import AIAssistant from './components/ui/AIAssistant';
import PropertiesPanel from './components/ui/PropertiesPanel';
import WelcomeScreen from './components/welcome/WelcomeScreen';

import CreateProjectModal, { type ProjectConfig } 
  from './components/modals/CreateProjectModal';

import AIGenerationModal from './components/modals/AIGenerationModal';
import DesignSuggestionsPanel from './components/panels/DesignSuggestionsPanel';
import LoginModal from './components/modals/LoginModal';
import ExportModal from './components/modals/ExportModal';
import AdminPanel from './components/admin/AdminPanel';

import {
  Sparkles,
  Wand2,
  Lightbulb,
  User,
  LogOut,
  Download,
  Save,
  Cloud,
  CloudOff,
  Loader2
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import './App.css';


// ================= USER MENU =================

const UserMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onExport: () => void;
}> = ({ isOpen, onLogin, onExport }) => {

  const { isAuthenticated, user, logout, isSyncing, lastSync, syncAll } = useUserStore();
  const { currentProject, updateProject } = useProjectStore();
  const [showMenu, setShowMenu] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="relative">
      <button
        onClick={() => isAuthenticated ? setShowMenu(!showMenu) : onLogin()}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
      >
        {isAuthenticated && user ? (
          <>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-white/80 hidden sm:inline">
              {user.name.split(' ')[0]}
            </span>

            {isSyncing ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            ) : lastSync ? (
              <Cloud className="w-4 h-4 text-green-400" />
            ) : (
              <CloudOff className="w-4 h-4 text-amber-400" />
            )}
          </>
        ) : (
          <>
            <User className="w-5 h-5 text-white/60" />
            <span className="text-sm text-white/80">Entrar</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {showMenu && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <p className="text-white font-medium truncate">{user?.name}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  if (currentProject) {
                    updateProject({ updatedAt: new Date() });
                  }
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg"
              >
                <Save className="w-4 h-4" />
                Salvar projeto
              </button>

              <button
                onClick={onExport}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>

              <button
                onClick={async () => {
                  await syncAll();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg"
              >
                <Cloud className="w-4 h-4" />
                Sincronizar
              </button>
            </div>

            <div className="p-2 border-t border-white/10">
              <button
                onClick={async () => {
                  await logout();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};


// ================= EDITOR =================

const EditorInterface: React.FC = () => {

  const { viewMode, currentProject, selectedElement } = useProjectStore();
  const { panels, setPanel, sidebarOpen, toggleSidebar, setViewMode } = useUIStore();
  const { isAuthenticated, syncProject } = useUserStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    if (currentProject && isAuthenticated) {
      const timeout = setTimeout(() => {
        syncProject(currentProject);
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [currentProject, isAuthenticated, syncProject]);

  useEffect(() => {
    if (selectedElement) {
      setPanel('properties', true);
    }
  }, [selectedElement, setPanel]);

  return (
    <div className="h-screen flex bg-[#0a0a0f] overflow-hidden">

      {sidebarOpen && (
        <div className="w-20">
          <Toolbar />
        </div>
      )}

      <div className="flex-1 relative">

        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0a0a0f]/90 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar}>
              ☰
            </button>
            <div>
              <div className="text-white font-semibold">{currentProject?.name}</div>
            </div>
          </div>

          <UserMenu
            isOpen={true}
            onClose={() => {}}
            onLogin={() => setShowLoginModal(true)}
            onExport={() => setShowExportModal(true)}
          />
        </div>

        <div className="h-full pt-16">
          {viewMode === '2d' ? <Canvas2D /> : <Canvas3D />}
        </div>
      </div>

      {panels.furniture && <FurniturePanel />}
      {panels.ai && <AIAssistant />}
      {panels.properties && <PropertiesPanel />}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {currentProject && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          project={currentProject}
        />
      )}
    </div>
  );
};


// ================= APP ROOT =================

function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { currentProject, createProject } = useProjectStore();
  const { loadTemplates, loadStyles } = useTemplateStore();
  const { loadPlans, initialize } = useUserStore();

  useEffect(() => {
    loadTemplates();
    loadStyles();
    loadPlans();
    initialize();
  }, []);

  useEffect(() => {
    if (currentProject) {
      setShowWelcome(false);
    }
  }, [currentProject]);

  const handleCreateProject = (config: ProjectConfig) => {
    createProject(config.name, config.description);
    setShowCreateModal(false);
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <>
        <WelcomeScreen 
          onCreateProject={() => setShowCreateModal(true)}
          onOpenProjects={() => setShowCreateModal(true)}
          onExploreTemplates={() => setShowCreateModal(true)}
          onSubscribePro={() => alert('Pro em breve')}
        />

        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      </>
    );
  }

  return <EditorInterface />;
}

export default App;
