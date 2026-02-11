
import React from 'react';

interface UserInfoFormProps {
  age: string;
  setAge: (age: string) => void;
  weeklyGoal: string;
  setWeeklyGoal: (goal: string) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ age, setAge, weeklyGoal, setWeeklyGoal }) => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-1">
          나이 (만)
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="예: 35"
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
        />
      </div>
      <div>
        <label htmlFor="weekly-goal" className="block text-sm font-medium text-slate-300 mb-1">
          주간 목표 거리 (km)
        </label>
        <input
          type="number"
          id="weekly-goal"
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(e.target.value)}
          placeholder="예: 30"
          className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
        />
      </div>
    </form>
  );
};
