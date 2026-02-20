export default function LectureInfoCard() {
  return (
    <div className="bg-white rounded-2xl border border-umblue-100 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-maize-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-maize-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-umblue-700">Lecture 4</h3>
          <p className="text-xs text-umblue-400">Functions</p>
        </div>
      </div>
      <p className="text-xs text-umblue-400 leading-relaxed">
        Covers pass-by-value vs pass-by-reference, for/while loops, header files, function prototypes, scope & lifetime, and default arguments.
      </p>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] font-semibold text-umblue-400 bg-umblue-50 px-2.5 py-1 rounded-full">4 materials</span>
        <span className="text-[10px] font-semibold text-maize-700 bg-maize-50 px-2.5 py-1 rounded-full">6 concepts</span>
      </div>
    </div>
  );
}
