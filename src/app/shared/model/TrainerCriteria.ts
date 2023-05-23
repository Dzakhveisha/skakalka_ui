export interface TrainerCriteria{

  specialization: string | null;

  trainerExperienceFrom: number | null;
  trainerGender: string | null;
  trainerAgeFrom: string | null;
  trainerAgeTo: string | null;
  education: string[] | null;
  rank: string[] | null;

  organisation: number | null;
  defaultGym: number | null;
  gymRegion: number | null;

  defaultClientsCountFrom: number | null;
  defaultClientsCountTo: number | null;

  order: string | null;
}
