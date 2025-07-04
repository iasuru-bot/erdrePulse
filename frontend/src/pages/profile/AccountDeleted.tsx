import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountDeleted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
      <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-xl max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-[#1a237e] mb-4">
          ERDRE PULSE.
        </h1>
        <h2 className="text-2xl  font-bold mb-2 text-[#1a237e]">
          La suppression de votre compte a été effectuée avec succès.
        </h2>
        <p className="text-sm text-gray-500">
          Nous sommes désolés de vous voir partir.<br />
          Redirection en cours...
        </p>
      </div>
  );
};
export default AccountDeleted;