import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import bilanService from "../services/bilanService";

interface Activity {
  name: string;
  frequency: number;
  isOptional?: boolean;
}

// Fonction utilitaire pour générer une couleur bleue plus foncée selon la fréquence
function getBlueShade(frequency: number, max: number) {
  // Plus la fréquence est élevée, plus la couleur est foncée
  // Bleu de base : #0a2c61 (foncé), #1e3a8a (moyen), #60a5fa (clair)
  // On interpole entre #60a5fa (clair) et #0a2c61 (foncé)
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  const ratio = clamp(frequency / max, 0, 1);
  // Interpolation manuelle entre clair et foncé
  const from = { r: 96, g: 165, b: 250 }; // #60a5fa
  const to = { r: 10, g: 44, b: 97 };    // #0a2c61
  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);
  return `rgb(${r},${g},${b})`;
}

// Fonction utilitaire pour couper le texte en plusieurs lignes si trop long
function splitLabel(label: string, maxLen = 8) {
  if (label.length <= maxLen) return [label];
  const words = label.split('_');
  let lines: string[] = [];
  let current = '';
  for (let w of words) {
    if ((current + (current ? '_' : '') + w).length > maxLen) {
      if (current) lines.push(current);
      current = w;
    } else {
      current += (current ? '_' : '') + w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function UserActivitiesChart() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    bilanService.getUserActivities()
      .then((data: any) => {
        setActivities(data.activities);
        setUser(data.user);
        setError("");
      })
      .catch(() => {
        setError("Aucune donnée d'activité à afficher. Veuillez compléter voir avec le coach pour réaliser un bilan.");
        setActivities([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Trouver la fréquence max pour l'échelle de couleur
  const maxFrequency = activities.length > 0 ? Math.max(...activities.map(a => a.frequency)) : 1;

  // Custom XAxis tick renderer pour afficher le label sur plusieurs lignes
  const renderCustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const isMobile = window.innerWidth < 640;
    const lines = splitLabel(payload.value, isMobile ? 7 : 10);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={10}
          dy={isMobile ? 22 : 40}
          textAnchor="middle"
          fontWeight="bold"
          fill="#0a2c61"
          fontSize={isMobile ? 15 : 18}
        >
          {lines.map((line: string, i: number) => (
            <tspan key={i} x={0} dy={i === 0 ? 0 : isMobile ? 16 : 20}>{line}</tspan>
          ))}
        </text>
      </g>
    );
  };

  // Custom Bar shape pour afficher une colonne vide avec contour si optionnel
  const CustomBar = (props: any) => {
    const { x, y, width, height, fill, isOptional } = props;
    if (isOptional) {
      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="transparent"
          stroke={fill}
          strokeWidth={4}
          rx={8}
          aria-label="Colonne optionnelle"
        />
      );
    }
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={8}
        aria-label="Colonne activité obligatoire"
      />
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-2 sm:px-4" aria-label="Graphique des activités hebdomadaires">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2 text-center">Bienvenue {user + "!" || "!"}</h1>
      <p className="text-gray-500 mb-6 text-center">Votre programme d'entraînement par semaine</p>
      {loading ? (
        <div className="text-center text-blue-900 font-semibold">Chargement...</div>
      ) : error ? (
        <div className="text-center text-gray-400 font-semibold py-12">{error}</div>
      ) : activities.length === 0 ? (
        <div className="text-center text-gray-400 font-semibold py-12">Aucune activité à afficher pour le moment.</div>
      ) : (
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 260 : 320}>
          <BarChart
            data={activities}
            barCategoryGap={window.innerWidth < 640 ? 10 : 30}
            margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
            role="img"
            aria-label="Histogramme des fréquences d'activités"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={renderCustomXAxisTick} interval={0} />
            <YAxis allowDecimals={false} domain={[0, 'dataMax + 1']} />
            <Tooltip
              contentStyle={{ fontSize: 14 }}
              formatter={(value: any, name: string, props: any) => {
                const isOptional = props.payload?.isOptional;
                const activityName = props.payload?.name;
                return [
                  <div key="tooltip-content">
                    <div className="font-bold mb-1">{activityName}</div>
                    <div>{ name + " : " + value} séance{value > 1 ? 's' : ''} par semaine</div>
                    {isOptional && <div className="text-gray-500 text-sm">(Optionnel)</div>}
                  </div>,
                  null
                ];
              }}
            />
            <Legend formatter={() => <span className="font-bold text-blue-900 ">Fréquence</span>} />
            <Bar
              dataKey="frequency"
              name="Fréquence"
              barSize={window.innerWidth < 640 ? 36 : 70}
              shape={(barProps: any) => (
                <CustomBar
                  {...barProps}
                  isOptional={barProps.payload?.isOptional}
                  fill={getBlueShade(barProps.payload?.frequency || 0, maxFrequency)}
                />
              )}
              radius={[8, 8, 0, 0]}
              aria-label="Barres des fréquences"
            >
              {activities.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBlueShade(entry.frequency, maxFrequency)}
                  aria-label={entry.isOptional ? 'Optionnel' : 'Obligatoire'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
} 