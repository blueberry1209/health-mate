
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
          AI 러닝 코치
        </h1>
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto">
          당신의 러닝 기록을 분석하여 개인 맞춤형 피드백을 제공합니다.
        </p>
      </div>
    </header>
  );
};
