import {site} from '../../data/site';
import {Accordion} from '../ui/Accordion';
import {Eyebrow} from '../ui/Eyebrow';
import {Section} from '../ui/Section';

export function Faq() {
  return (
    <Section id="faq" surface="charcoal">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-3 lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
            Good to know before you visit
          </h2>
          <p className="text-sm md:text-base text-muted">
            Have a specific bridal or skin ritual question? Message us anytime on WhatsApp for quick answers.
          </p>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={site.faqs} />
        </div>
      </div>
    </Section>
  );
}
