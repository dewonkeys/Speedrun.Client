import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { fetchSRStrainsBySRSystemId, deleteSRStrain } from "../services/srApi";
import { SRStrain } from "../types";

export function SRStrains() {
  const { id } = useParams<{ id: string }>();
  const systemId = parseInt(id || "0");
  const [strains, setStrains] = useState<SRStrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStrains = async () => {
      try {
        const data = await fetchSRStrainsBySRSystemId(systemId);
        setStrains(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load strains");
        setLoading(false);
        console.error(err);
      }
    };

    if (systemId) {
      loadStrains();
    }
  }, [systemId]);

  const handleDelete = async (id: number) => {
    try {
      await deleteSRStrain(id);
      setStrains(strains.filter((strain) => strain.id !== id));
    } catch (err) {
      setError("Failed to delete strain");
      console.error(err);
    }
  };

  const columns = [
    {
      header: "Name",
      render: (strain: SRStrain) => strain.name,
    },
    {
      header: "Actions",
      render: (strain: SRStrain) => (
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/strain/${strain.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(strain.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <h1>System Strains</h1>
      <button onClick={() => navigate("/")}>Back to Systems</button>
      <Table
        data={strains}
        columns={columns}
        onRowClick={(strain) => navigate(`/strain/${strain.id}`)}
      />
    </div>
  );
}
