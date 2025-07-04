import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormInput from "../../components/common/FormInput";
import Button from "../../components/common/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white">
      {/* Section droite - Formulaire */}
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slideUp">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Connexion</h2>
            <p className="text-center text-text-secondary mb-8">
              COACHEZ votre santé globale au fil de l'eau ! 
            </p>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
                {errorMessage}
              </div>
            )}

            <FormInput
              label="Email"
              type="email"
              error={errors.email}
              required
              {...register("email")}
            />

            <FormInput
              label="Mot de passe"
              type="password"
              error={errors.password}
              required
              {...register("password")}
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline transition-colors duration-200"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Pas encore inscrit ?{" "}
              <Link to="/register" className="text-primary hover:underline transition-colors duration-200">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
