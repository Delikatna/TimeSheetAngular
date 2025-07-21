export interface TimeSheetGiornalieroDto {
  id: number;
  data: string;
  entrataMattina: string | null;
  uscitaMattina: string | null;
  entrataPomeriggio: string | null;
  uscitaPomeriggio: string | null;
  entrataStraordinario: string | null;
  uscitaStraordinario: string | null;
  motivo: string | null;
}