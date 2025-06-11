import { Sparkles, Target, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="text-center py-12 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Transform Your Career with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI-Powered Insights
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and get personalized job recommendations, skill suggestions, 
            and professional improvement tips powered by advanced AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Perfect Job Matches</h3>
            <p className="text-slate-600 text-sm">
              Discover roles that align perfectly with your experience and career goals.
            </p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Skill Development</h3>
            <p className="text-slate-600 text-sm">
              Get personalized recommendations for skills to boost your marketability.
            </p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Resume Enhancement</h3>
            <p className="text-slate-600 text-sm">
              Professional suggestions to make your resume stand out to employers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}