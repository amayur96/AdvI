import { lectures } from "../data/mockData";

export default function LectureSidebar({ open, onClose, currentLecture, onSelect }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-umblue-700/40 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        className={`fixed left-0 top-0 h-full w-72 bg-white z-50 shadow-xl transition-transform duration-200 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-umblue-100">
          <h2 className="font-bold text-umblue-700 text-base">Lectures</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-umblue-50 flex items-center justify-center text-umblue-400 hover:bg-umblue-100 transition-colors text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3">
          {lectures.map((lec) => {
            const active = lec.id === currentLecture;
            return (
              <div
                key={lec.id}
                onClick={() => onSelect(lec.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-0.5 ${
                  active
                    ? "bg-umblue-50 text-umblue-700 font-semibold"
                    : "text-umblue-400 hover:bg-umblue-50 hover:text-umblue-700"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    active ? "bg-maize-500" : "bg-umblue-100"
                  }`}
                />
                <span className="text-sm">
                  Lecture {lec.id} &ndash; {lec.title}
                </span>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
