"use client";

import SnapshotPolicyForm from "../components/SnapshotPolicyForm";

export default function PerformanceMetrics() {

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-21 font-bold text-gray-200">Edit Snapshot Policy</h1>
      </div>
      <SnapshotPolicyForm />
    </div>
  );
}
