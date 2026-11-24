import {site} from '../../data/site';
import {Eyebrow} from '../ui/Eyebrow';
import {ImageWithBlur} from '../ui/ImageWithBlur';
import {Section} from '../ui/Section';

export function Team() {
  // Per client brief: hide Team section entirely until real staff photos are confirmed
  if (site.team.length === 0) {
    return null;
  }

  return (
    <Section id="team" surface="charcoal">
      <div className="mb-10 space-y-3">
        <Eyebrow>Our Artists</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
          Meet the Team
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.team.map((member) => (
          <article
            key={member.id}
            className="overflow-hidden rounded-2xl border border-gold-500/20 bg-surface"
          >
            <div className="aspect-[3/4]">
              <ImageWithBlur src={member.photo} alt={member.name} className="h-full w-full" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl font-medium text-ivory">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.specialty}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
