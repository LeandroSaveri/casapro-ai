import React, { useState } from 'react';
import { useProjectStore } from './store/projectStore';
import { Send, Sparkles, Wand2, Palette, Layout, Lightbulb, Check, X } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');

  const {
    aiRecommendations = [],
    isAILoading,
    generateAIRecommendations,
    applyAIRecommendation,
    clearAIRecommendations,
    currentProject,
  } = useProjectStore() as any;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || !currentProject) return;
    await generateAIRecommendations(prompt);
  };

  const quickPrompts: { icon: JSX.Element; text: string }[] = [
    { icon: <Layout size={14} />, text: 'Sugerir layout para casa moderna' },
    { icon: <Palette size={14} />, text: 'Paleta de cores minimalista' },
    { icon: <Lightbulb size={14} />, text: 'Melhorar iluminação' },
    { icon: <Wand2 size={14} />, text: 'Decorar sala de estar' },
  ];

  const getIconForType = (type: string): JSX.Element => {
    switch (type) {
      case 'layout': return <Layout size={18} />;
      case 'style': return <Palette size={18} />;
      case 'color': return <Sparkles size={18} />;
      case 'furniture': return <Wand2 size={18} />;
      case 'lighting': return <Lightbulb size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-l border-[#444]">

      {/* Header */}
      <div className="p-4 border-b border-[#444]">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-[#c9a962]" size={20} />
          <h2 className="text-white font-semibold">Assistente IA</h2>
        </div>
        <p className="text-[#888] text-xs">
          Descreva o que você quer e a IA vai ajudar no design
        </p>
      </div>

      {/* Input */}
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPrompt(e.target.value)
              }
              placeholder="Ex: Quero uma casa moderna com 2 quartos..."
              className="w-full h-24 bg-[#2a2a2a] border border-[#444] rounded-lg p-3 pr-10 text-white text-sm resize-none"
              disabled={isAILoading}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isAILoading || !currentProject}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#c9a962] text-black"
            >
              {isAILoading ? '...' : <Send size={16} />}
            </button>
          </div>
        </form>
      </div>

      {/* Recommendations */}
      <div className="flex-1 overflow-y-auto p-4">
        {aiRecommendations.map((rec: any, idx: number) => (
          <div key={idx} className="bg-[#2a2a2a] p-3 rounded-lg mb-3">
            <div className="flex items-start gap-3">
              <div className="text-[#c9a962]">
                {getIconForType(rec.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-white text-sm font-medium">
                  {rec.title}
                </h3>
                <p className="text-[#888] text-xs mt-1">
                  {rec.description}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => applyAIRecommendation(rec)}
                    className="px-3 py-1 bg-[#c9a962] text-black rounded text-xs"
                  >
                    <Check size={12} /> Aplicar
                  </button>
                  <button
                    onClick={clearAIRecommendations}
                    className="px-3 py-1 bg-[#444] text-white rounded text-xs"
                  >
                    <X size={12} /> Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAssistant;
