
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800/50 border-t border-slate-700 mt-12">
            <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} AI 러닝 코치. All rights reserved.</p>
                <p className="mt-1">Powered by Google Gemini</p>
            </div>
        </footer>
    );
};
