import { AnagraficaUtente } from "../model/anagrafica_utente.model";
import { Utente } from "../model/utente.model";

export interface RegistrazioneDto {
  utente: Utente;
  anagraficaUtente: AnagraficaUtente;
}