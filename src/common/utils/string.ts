import numeral from 'numeral';

export function string2money(value: string | number): string {
  return numeral(`${value}`).format('0,0.[00]');
}

export function string2number(value: string | number): string {
  return numeral(`${value}`).format('0,0');
}

export function money2number(value: string): number {
  return numeral(value).value();
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}
