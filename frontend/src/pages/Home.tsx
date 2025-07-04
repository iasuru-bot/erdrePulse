import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-white">
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md text-center">
          <div className="animate-slideUp">
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate("/register")}
              >
                S'inscrire
              </Button>

              <Button
                variant="outlined"
                size="lg"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
