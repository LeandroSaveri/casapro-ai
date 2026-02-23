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
  onClose: ()
