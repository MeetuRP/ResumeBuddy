import React from 'react';

interface APICostWidgetProps {
  stats: {
    total_calls: number;
    total_input: number;
    total_output: number;
    total_cost: number;
  };
}

const APICostWidget: React.FC<APICostWidgetProps> = ({ stats }) => {
  const totalTokens = stats.total_input + stats.total_output;

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] bg-indigo-50/20 p-8 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_rgba(79,70,229,0.06)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(79,70,229,0.12)] hover:-translate-y-2">
      {/* Premium Light Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/5 rounded-full blur-[60px]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-slate-400">
                AI Infrastructure
              </h3>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-0.5">Core Analytics Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 rounded-full border border-indigo-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-[9px] font-black text-indigo-700 uppercase tracking-tighter">Live Nodes</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="p-5 bg-white/40 rounded-3xl border border-white/80 shadow-sm transition-transform hover:scale-105 duration-300">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">Requests</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
                {stats.total_calls.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="p-5 bg-white/40 rounded-3xl border border-white/80 shadow-sm transition-transform hover:scale-105 duration-300">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">Net Cost</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-emerald-600">$</span>
              <span className="text-3xl font-black text-emerald-600 tabular-nums tracking-tighter">
                {stats.total_cost.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Token Distribution</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[9px] font-black text-indigo-600 uppercase">
                   <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> In
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-black text-violet-500 uppercase">
                   <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Out
                </span>
              </div>
            </div>
            <div className="relative h-4 w-full bg-slate-200/50 rounded-full overflow-hidden p-1 border border-white shadow-inner flex">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${(stats.total_input / (totalTokens || 1)) * 100}%` }}
              />
              <div 
                className="h-full bg-gradient-to-r from-violet-400 to-violet-500 rounded-full transition-all duration-1000 ease-out ml-1 shadow-lg"
                style={{ width: `${(stats.total_output / (totalTokens || 1)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 px-1">
              <span className="text-xs font-black text-slate-700 tabular-nums">
                {totalTokens.toLocaleString()} <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Units</span>
              </span>
              <span className="text-[8px] font-black text-slate-300 tracking-[0.3em] uppercase">V.2.5 Enterprise</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-indigo-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Provider Engine</span>
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase shadow-md transition-transform hover:scale-110">
              Gemini-2.5-Flash
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APICostWidget;
