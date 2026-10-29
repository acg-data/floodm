export const isSpanish = () => document.documentElement.lang.startsWith('es');
export const tr = (english: string, spanish: string) => isSpanish() ? spanish : english;
