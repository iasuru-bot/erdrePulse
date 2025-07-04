import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../services/api";
import FormInput from "../../components/common/FormInput";
import Button from "../../components/common/Button";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est obligatoire"),
});

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      setSuccessMessage("");
      const token = searchParams.get("token");
      if (!token) {
        throw new Error("Token manquant");
      }
      await authService.resetPassword(token, data.password);
      setSuccessMessage("Votre mot de passe a été réinitialisé avec succès.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue lors de la réinitialisation"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white">
     
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slideUp">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Réinitialisation du mot de passe</h2>
            <p className="text-center text-text-secondary mb-8">
              Entrez votre nouveau mot de passe.
            </p>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            <FormInput
              label="Nouveau mot de passe"
              type="password"
              error={errors.password}
              required
              {...register("password")}
            />

            <FormInput
              label="Confirmer le mot de passe"
              type="password"
              error={errors.confirmPassword}
              required
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              <Link to="/login" className="text-primary hover:underline transition-colors duration-200">
                Retour à la connexion
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 