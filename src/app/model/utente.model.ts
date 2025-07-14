export interface Utente 
{
  id?: number;
  username: string;
  password: string;
  ruolo: string; // enum Ruolo: esempio "USER" o "ADMIN"
}