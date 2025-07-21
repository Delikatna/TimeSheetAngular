import { TimeSheetGiornalieroDto } from "./TimeSheetGiornalieroDto.model";

export interface TimeSheetMensileDto {
  id: number;
  userId: number;
  nome: string;
  cognome: string;
  sede: string;
  anno: number;
  mese: number;
  giorni: TimeSheetGiornalieroDto[];
  }