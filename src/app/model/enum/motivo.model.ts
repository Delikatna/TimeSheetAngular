export enum Motivo {
  ASSENZA = 'ASSENZA',
  FERIE = 'FERIE',
  MALATTIA = 'MALATTIA',
  PERMESSO = 'PERMESSO',
  PART_TIME = 'PART_TIME'
}

export function getMotivoLabel(motivo: Motivo): string {
  switch(motivo) {
    case Motivo.ASSENZA: return 'Assenza';
    case Motivo.PART_TIME: return 'Part-Time';
    case Motivo.FERIE: return 'Ferie'
    case Motivo.MALATTIA: return 'Malattia'
    case Motivo.PERMESSO: return 'Permesso'
  }
}


