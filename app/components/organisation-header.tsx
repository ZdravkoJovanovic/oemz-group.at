import { FiPlus } from 'react-icons/fi';

export default function OrganisationHeader({
  onNewMember,
}: {
  onNewMember: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-10">

      {/* LEFT */}
      <div>
        <h1 className="text-xl font-semibold text-white">
          Zdravko Moses Jovanovic&apos;s Org
        </h1>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-white/70 text-sm">
            Team Members
          </span>
          <span className="text-white/40 text-sm">
            3
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={onNewMember}
        className="flex items-center gap-2 border border-white/20 px-3 py-1 text-white text-sm"
      >
        <FiPlus />
        New Member
      </button>

    </div>
  );
}
