import React, { useState } from 'react';
import { Brain, Book, Play, FastForward, ArrowRight, CheckCircle2, RefreshCcw } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  component: string;
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to System Orchestrator",
    description: "Let's start by getting to know each other. We'll explore how we can work together to build your perfect system.",
    component: "welcome",
    action: "Start Interview"
  },
  {
    title: "Mutual Interview",
    description: "Tell me about your work, goals, and challenges. I'll explain how I can help and adapt to your needs.",
    component: "interview",
    action: "Begin Discussion"
  },
  {
    title: "System Overview",
    description: "Let's explore the key components and how they work together. You can safely experiment here.",
    component: "overview",
    action: "Explore Systems"
  },
  {
    title: "Your First Build",
    description: "Time to create something together! We'll start with a simple but useful tool.",
    component: "build",
    action: "Start Building"
  },
  {
    title: "Ready to Launch",
    description: "You're ready to start using the main system. Don't worry - you can return to the tutorial anytime.",
    component: "launch",
    action: "Graduate to Main System"
  }
];

interface TutorialModeProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function TutorialMode({ onComplete, onSkip }: TutorialModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const renderStepContent = () => {
    const step = tutorialSteps[currentStep];
    
    switch (step.component) {
      case 'welcome':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Brain className="w-16 h-16 text-blue-400" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Welcome to the Sandbox</h2>
              <p className="text-gray-300">
                This is a safe space to learn and experiment with the System Orchestrator.
                Everything here is isolated from the main system.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDemo(true)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Start Tutorial
              </button>
            </div>
          </div>
        );

      case 'interview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Let's Get to Know Each Other</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What's your primary field of work?
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200">
                    <option value="legal">Legal</option>
                    <option value="development">Software Development</option>
                    <option value="content">Content Creation</option>
                    <option value="business">Business/Entrepreneurship</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What are your main goals?
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                    rows={3}
                    placeholder="Describe what you'd like to achieve..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Continue
              </button>
            </div>
          </div>
        );

      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Core Components</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Brain className="w-5 h-5 text-blue-400" />
                    <span>Orchestrator - Your AI Companion</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Book className="w-5 h-5 text-green-400" />
                    <span>Knowledge Base - Shared Learning</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <RefreshCcw className="w-5 h-5 text-purple-400" />
                    <span>Workflow Engine - Task Automation</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Sandbox Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Safe environment for experimentation</li>
                  <li>• Pre-built templates and examples</li>
                  <li>• Guided tutorials and tooltips</li>
                  <li>• Reset capability at any time</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Next
              </button>
            </div>
          </div>
        );

      case 'build':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Let's Build Something</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Choose a simple project to start with:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors text-left">
                    <h4 className="font-medium text-white">Task Automator</h4>
                    <p className="text-sm text-gray-300">Create a simple workflow automation</p>
                  </button>
                  <button className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors text-left">
                    <h4 className="font-medium text-white">Research Assistant</h4>
                    <p className="text-sm text-gray-300">Build a basic research helper</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Continue
              </button>
            </div>
          </div>
        );

      case 'launch':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Ready to Begin!</h3>
              <p className="text-gray-300 mb-6">
                You've completed the tutorial and are ready to start using the main system.
                Remember, you can always return to the sandbox to experiment with new ideas.
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowRight className="w-5 h-5" />
                Enter Main System
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Tutorial Progress
            </span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1"
            >
              <FastForward className="w-4 h-4" />
              Skip Tutorial
            </button>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              {tutorialSteps[currentStep].title}
            </h2>
            <p className="mt-2 text-gray-300">
              {tutorialSteps[currentStep].description}
            </p>
          </div>
          <div className="p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
