export const NUMBER = '923095001971';

export const waLink = (msg: string): string =>
  `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg.trim())}`;

export const waGeneralMessage = (): string =>
  "Assalam o Alaikum, I want to book an appointment at Maheen's Beauty & Makeup Saloon.";

export const waServiceMessage = (serviceName: string): string =>
  `Assalam o Alaikum, I want to book ${serviceName} at Maheen's Beauty & Makeup Saloon.`;

export const waBridalMessage = (packageName: string, eventDate?: string): string => {
  const cleanDate = eventDate?.trim();
  if (cleanDate) {
    return `Assalam o Alaikum, I want to check bridal availability for ${packageName} on ${cleanDate} at Maheen's Beauty & Makeup Saloon.`;
  }
  return `Assalam o Alaikum, I want to check bridal availability for ${packageName} at Maheen's Beauty & Makeup Saloon.`;
};

export const waDealMessage = (dealTitle: string): string =>
  `Assalam o Alaikum, I want to claim ${dealTitle} at Maheen's Beauty & Makeup Saloon.`;
