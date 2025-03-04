// src/pages/StrainSegments.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import {
  fetchSRSegmentsBySRStrainId,
  deleteSRSegment,
  resetSRSegment,
} from "../services/srApi";
import { SRSegment } from "../types";

export function SRSegments() {
  const { id } = useParams<{ id: string }>();
  const strainId = parseInt(id || "0");
  const [segments, setSegments] = useState<SRSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSegments = async () => {
      try {
        const data = await fetchSRSegmentsBySRStrainId(strainId);
        setSegments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load segments");
        setLoading(false);
        console.error(err);
      }
    };

    if (strainId) {
      loadSegments();
    }
  }, [strainId]);

  const handleDelete = async (id: number) => {
    try {
      await deleteSRSegment(id);
      setSegments(segments.filter((segment) => segment.id !== id));
    } catch (err) {
      setError("Failed to delete segment");
      console.error(err);
    }
  };

  const handleReset = async (id: number) => {
    try {
      await resetSRSegment(id);
      // Reload segments to get updated data
      const data = await fetchSRSegmentsBySRStrainId(strainId);
      setSegments(data);
    } catch (err) {
      setError("Failed to reset segment");
      console.error(err);
    }
  };

  const formatDuration = (ms: number): string => {
    return (ms / 1000).toFixed(3);
  };

  const columns = [
    {
      header: "Name",
      render: (segment: SRSegment) => segment.name,
    },
    {
      header: "Duration (seconds)",
      render: (segment: SRSegment) => formatDuration(segment.msDuration),
    },
    {
      header: "Actions",
      render: (segment: SRSegment) => (
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/segment/${segment.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(segment.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset(segment.id);
            }}
          >
            Reset
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <h1>Strain Segments</h1>
      <button onClick={() => navigate(`/system/${segments[0]?.srStrainId}`)}>
        Back to Strains
      </button>
      <Table data={segments} columns={columns} />
    </div>
  );
}
