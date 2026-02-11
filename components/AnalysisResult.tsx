
import React, { Fragment } from 'react';

interface AnalysisResultProps {
  result: string;
}

const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const nodes: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            nodes.push(
                <ul key={`ul-${nodes.length}`} className="list-disc pl-6 space-y-1 my-2 text-slate-300">
                    {listItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.startsWith('## ')) {
            flushList();
            nodes.push(<h2 key={index} className="text-2xl font-bold text-cyan-400 mt-6 mb-3 border-b border-slate-600 pb-2">{line.substring(3)}</h2>);
        } else if (line.startsWith('### ')) {
            flushList();
            nodes.push(<h3 key={index} className="text-xl font-semibold text-teal-300 mt-4 mb-2">{line.substring(4)}</h3>);
        } else if (line.startsWith('* ')) {
            listItems.push(line.substring(2));
        } else if (line.trim() === '') {
            flushList();
            nodes.push(<div key={index} className="h-2"></div>);
        } else {
            flushList();
            const parts = line.split(/(\*\*.*?\*\*)/g);
            nodes.push(
                <p key={index} className="my-2 text-slate-300 leading-relaxed">
                    {parts.map((part, i) => 
                        part.startsWith('**') && part.endsWith('**') ? 
                        <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong> : 
                        part
                    )}
                </p>
            );
        }
    });

    flushList(); 
    return nodes;
};


export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-cyan-400 prose-strong:text-white">
      {parseMarkdown(result).map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </div>
  );
};
