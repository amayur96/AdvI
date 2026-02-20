import { useState, useEffect } from "react";
import { lectures } from "./data/mockData";
import { getAnalytics } from "./services/api";
import LectureSidebar from "./components/LectureSidebar";
import Topbar from "./components/Topbar";
import CriticalInfo from "./components/CriticalInfo";
import SuggestedQuestions from "./components/SuggestedQuestions";
import Dashboard from "./components/Dashboard";
import ConceptMastery from "./components/ConceptMastery";
import MaterialsCard from "./components/MaterialsCard";
import DiveDeepModal from "./components/DiveDeepModal";
import AiInsights from "./components/AiInsights";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(4);
  const [modal, setModal] = useState({ open: false, conceptId: null, conceptName: "", pct: 0 });
  const [analytics, setAnalytics] = useState({
    concept_mastery: [],
    critical_concepts: [],
    question_responses: [],
    total_students: 0,
    ai_insights: [],
  });

  const lecture = lectures.find((l) => l.id === currentLecture);
  const lectureName = `Lecture ${currentLecture}`;
  const lectureTitle = lecture?.title ?? "";
  const lectureId = `lec${currentLecture}`;

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics(lectureId);
        // Always use backend data, even if empty
        setAnalytics({
          concept_mastery: data.concept_mastery || [],
          critical_concepts: data.critical_concepts || [],
          question_responses: data.question_responses || [],
          total_students: data.total_students || 0,
          ai_insights: data.ai_insights || [],
        });
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        // Reset to empty state on error (don't use old data)
        setAnalytics({
          concept_mastery: [],
          critical_concepts: [],
          question_responses: [],
          total_students: 0,
          ai_insights: [],
        });
      }
    };

    fetchAnalytics();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, [lectureId]);

  function handleSelectLecture(id) {
    setCurrentLecture(id);
    setSidebarOpen(false);
  }

  function handleDiveDeep(conceptId, conceptName, pct) {
    setModal({ open: true, conceptId, conceptName, pct });
  }

  return (
    <div className="min-h-screen bg-umblue-50">
      <div className="bg-umblue-700 py-1.5 px-8 flex items-center justify-end">
        <div className="flex items-center gap-5">
          <span className="text-umblue-300 text-[10px] tabular-nums">Feb 20, 2026</span>
          <div className="flex items-center gap-1.5 text-[10px] text-umblue-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      <LectureSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLecture={currentLecture}
        onSelect={handleSelectLecture}
      />

      <Topbar />

      {/* Bento Grid */}
      <div className="px-8 pt-6 pb-8">
        <div className="grid grid-cols-12 gap-4">

          {/* Row 1: 4 stat cards */}
          <div className="col-span-12">
            <Dashboard statsOnly />
          </div>

          {/* Row 2: Critical Info (left) | Suggested Questions (right) */}
          <div className="col-span-6">
            <CriticalInfo 
              criticalConcepts={analytics.critical_concepts || []} 
              onDiveDeep={handleDiveDeep} 
            />
          </div>
          <div className="col-span-6">
            <SuggestedQuestions lectureId={lectureId} />
          </div>

          {/* Row 3: Concept Mastery (left) | Course Materials (right) */}
          <div className="col-span-6">
            <ConceptMastery 
              conceptMastery={analytics.concept_mastery || []}
              questionResponses={analytics.question_responses || []}
              totalStudents={analytics.total_students || 0}
            />
          </div>
          <div className="col-span-6">
            <MaterialsCard />
          </div>

          {/* Row 4: AI Insights */}
          <div className="col-span-8 col-start-3">
            <AiInsights insights={analytics.ai_insights || []} />
          </div>

        </div>
      </div>

      <DiveDeepModal
        open={modal.open}
        conceptId={modal.conceptId}
        conceptName={modal.conceptName}
        pct={modal.pct}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
