import UserActivitiesChart from "../components/UserActivitiesChart";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-white flex flex-col items-center justify-center">
      <UserActivitiesChart />
      {!user?.coach && (
        <Button className="mb-8" onClick={() => navigate('/bilans/history')}>
          Voir mon historique de bilans
        </Button>
      )}
    </div>
  );
} 