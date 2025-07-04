import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function LogoutConfirm() {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user || !isAuthenticated) {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-[#1a237e] font-semibold">
        Chargement...
      </div>
    );
  }

  const handleConfirm = async () => {
    const firstName = user?.firstName || "";
    localStorage.setItem("logoutName", firstName);
    await logout();
    navigate("/logout-success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-[#1a237e] mb-4">
        ERDRE PULSE.
      </h1>
        <p className="text-base font-medium mb-6 text-[#1a237e]">
          Êtes-vous sûr de vouloir vous déconnecter ?
      </p>
        <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-[#1a237e] font-bold px-6 py-2 rounded-full"
        >
          Non
        </button>
        <button
          onClick={handleConfirm}
          className="bg-[#1a237e] text-white font-bold px-6 py-2 rounded-full"
        >
          Oui
        </button>
      </div>
    </div>
    </div>
  );
}
