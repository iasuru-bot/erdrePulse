import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../../services/api";
import FormInput from "../../components/common/FormInput";
import Button from "../../components/common/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est obligatoire"),
});

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await authService.forgotPassword(data.email);
      setSuccessMessage("Un email de réinitialisation a été envoyé à votre adresse.");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue lors de l'envoi de l'email"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex flex-col md:flex-row bg-white">
     
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slideUp">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Mot de passe oublié</h2>
            <p className="text-center text-text-secondary mb-8">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
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
              label="Email"
              type="email"
              error={errors.email}
              required
              {...register("email")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 