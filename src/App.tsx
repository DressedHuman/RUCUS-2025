import React, { useState } from "react";
import data from "./assets/RUCSU_VOTER.json";
import logo from "./assets/RU official logo.png";
import VoterInfoCard, {
  type Voter,
  type HallInfo,
} from "./components/VoterInfoCard";
import CandidatePromotion from "./components/CandidatePromotion";
import SearchBar from "./components/SearchBox";

type RUCSUData = {
  student_info: Voter[];
  resident_halls: Record<string, HallInfo>;
};

const App: React.FC = () => {
  const [foundVoter, setFoundVoter] = useState<Voter | null>(null);
  const [hallInfo, setHallInfo] = useState<HallInfo | undefined>(undefined);
  const [searched, setSearched] = useState(false);

  const handleSearch = (studentId: string) => {
    setSearched(true);

    const { student_info, resident_halls } = data as RUCSUData;

    const result = student_info.find(
      (v) => v["Student ID"] === studentId.trim()
    );
    setFoundVoter(result || null);

    if (result) {
      const hallKey = result["Voter ID"].split(":")[0];
      const hall = resident_halls[hallKey];
      setHallInfo(hall);
    } else {
      setHallInfo(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-gray-900 flex flex-col lg:flex-row items-center justify-center px-4 py-10 lg:py-0 gap-8">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block lg:w-1/4">
        <CandidatePromotion />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center lg:w-3/4 w-full text-center flex-1 bg-yellow-100 border border-yellow-200 shadow-md rounded-2xl p-4">
        {/* RU Logo */}
        <img
          src={logo}
          alt="University of Rajshahi"
          className="w-36 mb-4 drop-shadow-md"
        />

        <h1 className="text-3xl font-bold mb-6">
          RUCSU 2025 Voter Information
        </h1>

        {/* SearchBar - visible on all screen sizes */}
        <div className="w-full max-w-lg mb-6 order-1">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Voter Result - comes BEFORE CandidatePromotion on mobile */}
        {searched && (
          <div className="w-full max-w-xl order-2">
            {foundVoter ? (
              <VoterInfoCard voter={foundVoter} hallInfo={hallInfo} />
            ) : (
              <p className="mt-6 text-red-600 text-center font-medium">
                No voter found with this Student ID.
              </p>
            )}
          </div>
        )}

        {/* CandidatePromotion for mobile */}
        <div className="block lg:hidden w-full max-w-md mt-6 order-3">
          <CandidatePromotion />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-500 order-4">
          © {new Date().getFullYear()} University of Rajshahi — RUCSU Election
        </footer>
      </div>
    </div>
  );
};

export default App;
