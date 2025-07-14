export interface AnagraficaUtente 
{
  id?: number;
  nome: string;
  cognome: string;
  sede: string;
  numTelefono: string;
  dob: Date;
  mansione: string; // enum Mansione: esempio "SVILUPPATORE", "PM", ecc.
}