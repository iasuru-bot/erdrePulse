import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { authService } from "../../services/api";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/common/FormInput";
import FormSelect from "../../components/common/FormSelect";
import FormCheckbox from "../../components/common/FormCheckbox";
import Button from "../../components/common/Button";

const schema = yup.object().shape({
  civility: yup.string().required("Veuillez sélectionner votre civilité."),
  lastName: yup
    .string()
    .matches(/^[A-Za-zÀ-ÿ-]+$/, "Veuillez entrer un nom valide.")
    .min(2, "Veuillez entrer un nom valide.")
    .required("Veuillez entrer un nom."),
  firstName: yup
    .string()
    .matches(/^[A-Za-zÀ-ÿ-]+$/, "Veuillez entrer un prénom valide.")
    .min(2, "Veuillez entrer un prénom valide.")
    .required("Veuillez entrer un prénom."),
  email: yup
    .string()
    .email("Veuillez entrer une adresse email valide.")
    .required("Veuillez entrer une adresse email."),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], "Les emails ne correspondent pas.")
    .required("Veuillez confirmer votre email."),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
    .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre.")
    .required("Veuillez entrer un mot de passe."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas.")
    .required("Veuillez confirmer votre mot de passe."),
  terms: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales d'utilisation."),
});

type FormValues = yup.InferType<typeof schema>;

const civilityOptions = [
  { value: "Monsieur", label: "Monsieur" },
  { value: "Madame", label: "Madame" },
  { value: "Autre", label: "Autre" }
];

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await authService.register({
        email: data.email,
        password: data.password,
        civility: data.civility,
        firstName: data.firstName,
        lastName: data.lastName
      });
      setIsSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className=" flex flex-col md:flex-row bg-white">
      

      {/* Section droite - Formulaire */}
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slideUp">
              <h2 className="text-3xl font-bold text-center text-primary mb-2">Inscription</h2>
              <p className="text-center text-text-secondary mb-8">
                Rejoignez notre communauté dynamique pour atteindre vos objectifs de forme.
              </p>

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
                  {errorMessage}
                </div>
              )}

              <div className="mb-4">
                <FormSelect
                  label="Civilité"
                  options={civilityOptions}
                  error={errors.civility}
                  required
                  {...register("civility")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Prénom"
                  type="text"
                  error={errors.firstName}
                  required
                  {...register("firstName")}
                />

                <FormInput
                  label="Nom"
                  type="text"
                  error={errors.lastName}
                  required
                  {...register("lastName")}
                />
              </div>

              {/* Informations de connexion - 1 colonne */}
              <div className="space-y-4 mt-6">
                <FormInput
                  label="Email"
                  type="email"
                  error={errors.email}
                  required
                  {...register("email")}
                />

                <FormInput
                  label="Confirmer l'email"
                  type="email"
                  error={errors.confirmEmail}
                  required
                  {...register("confirmEmail")}
                />

                <FormInput
                  label="Mot de passe"
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
              </div>

              <FormCheckbox
                label={
                  <span>
                    J'accepte les{" "}
                    <Link to="/cgu" className="text-primary hover:underline transition-colors duration-200">
                      conditions générales d'utilisation
                    </Link>
                  </span>
                }
                error={errors.terms}
                {...register("terms")}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Déjà inscrit ?{" "}
                <Link to="/login" className="text-primary hover:underline transition-colors duration-200">
                  Se connecter
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center bg-green-50 p-8 rounded-lg shadow-md animate-slideDown">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Votre compte a été créé avec succès !</h2>
              <p className="text-green-700 mb-4">
                Veuillez vérifier votre boîte mail pour activer votre compte.
              </p>
              <p className="text-green-600 mb-6">
                Si vous ne recevez pas l'email dans quelques minutes, vérifiez votre dossier spam ou contactez-nous.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
              >
                Retour à la connexion
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
