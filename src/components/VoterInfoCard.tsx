import React from "react";
import {
  FaIdBadge,
  FaUniversity,
  FaBuilding,
  FaHome,
  FaBarcode,
  FaUser,
} from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";

export type Voter = {
  SL_RU: number;
  "Voter ID": string;
  "Student ID": string;
  Name: string;
  Department: string;
  "Residence Status": string;
  hallKey?: string;
};

export type HallInfo = {
  name: string;
  polling_center: string[]; // [English, Bengali]
};

interface VoterInfoCardProps {
  voter: Voter;
  hallInfo?: HallInfo;
}

const VoterInfoCard: React.FC<VoterInfoCardProps> = ({ voter, hallInfo }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl mx-auto mt-8 border border-gray-200 transition duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <FaUser className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">{voter.Name}</h2>
      </div>

      <div className="text-gray-700">
        <InfoItem
          icon={<FaBarcode />}
          label="Student ID"
          value={voter["Student ID"]}
        />
        <InfoItem
          icon={<MdHowToVote />}
          label="Voter ID"
          value={voter["Voter ID"]}
        />
        <InfoItem
          icon={<FaUniversity />}
          label="Department"
          value={voter.Department}
        />
        <InfoItem
          icon={<FaHome />}
          label="Residence Status"
          value={voter["Residence Status"]}
        />
        <InfoItem
          icon={<FaIdBadge />}
          label="SL (RU)"
          value={voter.SL_RU.toString()}
        />
      </div>

      {hallInfo && (
        <>
          <div className="text-gray-700">
            <InfoItem
              icon={<FaBuilding />}
              label="Residence Hall"
              value={hallInfo.name}
            />
            <InfoItem
              icon={<MdHowToVote />}
              label="Polling Center"
              values={hallInfo.polling_center}
            />
          </div>
        </>
      )}
    </div>
  );
};

// Reusable info row
const InfoItem = ({
  icon,
  label,
  value,
  values = [],
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  values?: string[];
}) => {
  // Combine single value and values array if needed:
  const allValues = value ? [value, ...values] : values;

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-start gap-2 py-3 text-nowrap"
      style={{
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        fontWeight: 400,
      }}
    >
      {/* Optional icon + label */}
      <p className="flex items-center gap-2">
        {icon && <span className="text-blue-400">{icon}</span>}
        <span className="font-medium text-[#425dd8]">{label}:</span>
      </p>

      {/* Values */}
      <span style={{ whiteSpace: "pre-line" }} className="font-semibold">{allValues.join("\n")}</span>
    </div>
  );
};

export default VoterInfoCard;
