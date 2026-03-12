export type Phase = 
  | 'intro' 
  | 'registration'
  | 'menu' 
  | 'guide' 
  | 'dialogue' 
  | 'map' 
  | 'formula' 
  | 'taxMatch'
  | 'clinic' 
  | 'boss' 
  | 'victory';

export interface DialogueStep {
  speaker: string;
  text: string;
  choices: { text: string; nextId: number }[];
}

export interface POIDialogue {
  speaker: string;
  emoji: string;
  text: string;
}

export interface POICase {
  id: string;
  title: string;
  caseId: string;
  suspectName: string;
  suspectRole: string;
  offense: string;
  offenseDetail: string;
  evidenceIcon: string;
  evidenceText: string;
  evidenceImage: string;
  suspectImage: string;
  dialogues: POIDialogue[];
}

export interface ClinicCase {
  id: string;
  header: string;
  desc: string;
  suspect: {
    name: string;
    role: string;
    warning: string;
    formLabel: string;
    avatar: string;
  };
  records: {
    income?: { label: string; value: number; sub?: string }[];
    exemptions?: { label: string; value: number; sub?: string }[];
    reliefs?: { label: string; value: number; icon: string }[];
  };
  verify: (inputs: any) => boolean;
}
