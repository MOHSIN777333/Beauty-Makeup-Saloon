import {useEffect, useState} from 'react';
import {site} from '../../data/site';
import {useInView} from '../../hooks/useInView';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

function CountUpValue({
  target,
  suffix,
  active,
  reducedMotion,
}: {
  target: number;
  suffix: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active || reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const duration = 650;
    const start = performance.now();
    const startValue = Math.max(1, Math.floor(target * 0.65));

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, reducedMotion]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function TrustStrip() {
  const {ref, inView} = useInView(true, '-40px');
  const reducedMotion = useReducedMotionSafe();

  return (
    <div
      ref={ref}
      aria-label="Saloon highlights"
      className="border-y border-gold-500/15 bg-charcoal/80"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 divide-y divide-gold-500/15 md:grid-cols-4 md:divide-x md:divide-y-0">
        {site.trustMetrics.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center px-4 py-6 text-center md:py-7"
          >
            <p className="font-display text-2xl md:text-3xl font-semibold text-gold-300">
              {item.animate && item.target !== undefined ? (
                <CountUpValue
                  target={item.target}
                  suffix={item.suffix ?? ''}
                  active={inView}
                  reducedMotion={reducedMotion}
                />
              ) : (
                item.text
              )}
            </p>
            <p className="mt-1 text-xs md:text-sm text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
