
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UserInfoForm } from './components/UserInfoForm';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResult } from './components/AnalysisResult';
import { Loader } from './components/Loader';
import { analyzeRunningImage } from './services/geminiService';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [age, setAge] = useState<string>('');
  const [weeklyGoal, setWeeklyGoal] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = useCallback(async () => {
    if (!imageFile || !age || !weeklyGoal) {
      setError('모든 정보를 입력해주세요: 러닝 기록 이미지, 나이, 주간 목표 거리');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const result = await analyzeRunningImage(imageFile, parseInt(age, 10), parseInt(weeklyGoal, 10));
      setAnalysis(result);
    } catch (e: any) {
      setError(`분석 중 오류가 발생했습니다: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, age, weeklyGoal]);
  
  const isButtonDisabled = !imageFile || !age || !weeklyGoal || isLoading;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400">1. 정보 입력</h2>
            <UserInfoForm
              age={age}
              setAge={setAge}
              weeklyGoal={weeklyGoal}
              setWeeklyGoal={setWeeklyGoal}
            />
            <h2 className="text-2xl font-bold text-cyan-400 pt-4 border-t border-slate-700">2. 기록 업로드</h2>
            <ImageUploader onImageUpload={setImageFile} />
            <button
              onClick={handleAnalyze}
              disabled={isButtonDisabled}
              className={`w-full py-3 px-6 rounded-lg text-lg font-bold transition-all duration-300 ease-in-out flex items-center justify-center
                ${isButtonDisabled 
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 transform hover:scale-105 shadow-lg shadow-cyan-500/30'}`}
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span className="ml-2">분석 중...</span>
                </>
              ) : (
                '분석 시작하기'
              )}
            </button>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 min-h-[300px]">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. AI 분석 결과</h2>
            {error && <div className="bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700">{error}</div>}
            {isLoading && !analysis && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Loader />
                <p className="mt-4 text-lg">AI 코치가 러닝 기록을 분석하고 있습니다.</p>
                <p className="text-sm">잠시만 기다려주세요...</p>
              </div>
            )}
            {analysis && <AnalysisResult result={analysis} />}
            {!isLoading && !analysis && !error && (
               <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm-1.125 4.5a4.5 4.5 0 1 1-8.25 3.286A11.959 11.959 0 0 1 3.598 6H3.522c3.196 0 6.1 1.248 8.25 3.286Z" />
                </svg>

                 <p className="text-lg font-semibold">분석 결과가 여기에 표시됩니다.</p>
                 <p className="mt-1">정보를 입력하고 분석을 시작하세요!</p>
               </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
