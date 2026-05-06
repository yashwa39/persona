"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { stat: "ACADEMICS", value: 92 },
  { stat: "CHARM", value: 86 },
  { stat: "COURAGE", value: 90 },
  { stat: "FOCUS", value: 78 },
  { stat: "IMPACT", value: 84 },
];

export function SocialStatsRadar() {
  return (
    <section className="mt-8 w-full max-w-3xl bg-p3-blue/70 p-4 pl-8 -skew-x-12" style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0% 100%)" }}>
      <div className="skew-x-12">
        <h3 className="font-display text-3xl uppercase tracking-[0.14em] text-p3-cyan">SOCIAL STATS</h3>
        <p className="mb-3 text-sm tracking-[0.06em] text-p3-white/80">Hover any axis to see rank-up values.</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(255,43,43,0.4)" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: "#f5f5f5", fontSize: 12, letterSpacing: "0.08em" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`Rank Up +${Number(value ?? 0)}`, "Persona Stat"]}
                contentStyle={{
                  background: "rgba(5,5,5,0.95)",
                  border: "1px solid #FF2B2B",
                  color: "#F5F5F5",
                  letterSpacing: "0.06em",
                }}
              />
              <Radar dataKey="value" stroke="#FF2B2B" fill="#FF2B2B" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
