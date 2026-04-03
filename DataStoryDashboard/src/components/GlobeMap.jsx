import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Globe from "react-globe.gl";
import { getGlobePoints } from "../utils/api.js";

const MotionSection = motion.section;

function GlobeMap({ dataset }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadGlobeData() {
      try {
        const nextPoints = await getGlobePoints(dataset);
        if (isMounted) {
          setPoints(nextPoints);
        }
      } catch {
        if (isMounted) {
          setPoints([]);
        }
      }
    }

    loadGlobeData();

    return () => {
      isMounted = false;
    };
  }, [dataset]);

  const maxValue = useMemo(
    () =>
      points.reduce((largest, point) => Math.max(largest, point.value || 0), 1),
    [points],
  );

  return (
    <MotionSection
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
    >
      <h3 className="font-heading text-xl font-semibold text-textMain dark:text-white">
        Live Global Activity Globe
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Interactive 3D view of live data hotspots based on your selected
        dataset.
      </p>

      <div className="mt-4 h-[420px] overflow-hidden rounded-2xl bg-slate-900/90">
        <Globe
          width={980}
          height={420}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={points}
          pointAltitude={(point) => 0.1 + (point.value || 0) / maxValue / 2.2}
          pointColor={() => "#FACC15"}
          pointRadius={0.45}
          pointLabel={(point) =>
            `${point.name}: ${point.value?.toLocaleString() || 0}`
          }
          atmosphereColor="#6366F1"
          atmosphereAltitude={0.18}
        />
      </div>
    </MotionSection>
  );
}

export default GlobeMap;
