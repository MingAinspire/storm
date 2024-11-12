import { useState, useEffect } from 'react';
import { Brain, Layout, GitBranch, Network, Target, Settings, Users, Globe, Moon, Sun } from 'lucide-react';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import TaskQueue from './components/TaskQueue';
import ManagementControls from './components/ManagementControls';
import SystemGuide from './components/SystemGuide';
import SystemIntegration from './components/SystemIntegration';
import TimelineView from './components/TimelineView';
import TaskHistory from './components/TaskHistory';
import SystemSettings from './components/SystemSettings';
import ActiveSystems from './components/ActiveSystems';
import NetworkHub from './components/NetworkHub';
import TutorialMode from './components/TutorialMode';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'guide' | 'history' | 'timeline' | 'settings' | 'active' | 'network'>('active');
  const [darkMode, setDarkMode] = useState(true);
  const [showTutorial, setShowTutorial] = useState(() => {
    // Check if tutorial has been completed before
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    return !tutorialCompleted;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setShowTutorial(false);
  };

  const handleTutorialSkip = () => {
    const skipConfirmed = window.confirm('Are you sure you want to skip the tutorial? You can always access it later from the settings.');
    if (skipConfirmed) {
      localStorage.setItem('tutorialCompleted', 'true');
      setShowTutorial(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'guide':
        return <SystemGuide />;
      case 'history':
        return <TaskHistory />;
      case 'timeline':
        return <TimelineView />;
      case 'settings':
        return (
          <div className="space-y-8">
            <SystemSettings />
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Tutorial</h2>
              <p className="text-gray-300 mb-4">
                Need a refresher? You can restart the tutorial at any time.
              </p>
              <button
                onClick={() => setShowTutorial(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Restart Tutorial
              </button>
            </div>
          </div>
        );
      case 'network':
        return <NetworkHub />;
      case 'active':
        return (
          <div className="space-y-8">
            <ActiveSystems />
            <TaskQueue />
            <ManagementControls />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <WorkflowVisualizer />
            <SystemIntegration />
            <TaskQueue />
            <ManagementControls />
          </div>
        );
    }
  };

  if (showTutorial) {
    return (
      <TutorialMode
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialSkip}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">System Orchestrator</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView('active')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'active'
                  ? 'bg-blue-900 text-blue-200'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Active Systems</span>
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-purple-900 text-purple-200'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Workflows</span>
            </button>
            <button
              onClick={() => setActiveView('network')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'network'
                  ? 'bg-green-900 text-green-200'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Network</span>
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'settings'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
