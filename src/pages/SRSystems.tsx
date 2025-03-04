import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { fetchSRSystems, deleteSRSystem } from "../services/srApi";
import { SRSystem } from "../types";

export function SRSystems() {
  const [systems, setSystems] = useState<SRSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSystems = async () => {
      try {
        const data = await fetchSRSystems();
        setSystems(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load systems");
        setLoading(false);
        console.error(err);
      }
    };

    loadSystems();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSRSystem(id);
      setSystems(systems.filter((system) => system.id !== id));
    } catch (err) {
      setError("Failed to delete system");
      console.error(err);
    }
  };

  const columns = [
    {
      header: "Name",
      render: (system: SRSystem) => system.name,
    },
    {
      header: "Actions",
      render: (system: SRSystem) => (
        <div className="actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/system/${system.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(system.id);
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
      <h1>Speedrun Systems</h1>
      <Table
        data={systems}
        columns={columns}
        onRowClick={(system) => navigate(`/system/${system.id}`)}
      />
    </div>
  );
}
