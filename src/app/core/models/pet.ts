export type Species = 'dog' | 'cat' | 'other';

export interface Pet {
  id: number;
  name: string;
  species?: Species;
  breed?: string;
  birth_date?: string;  
  owner_id: number;     
  address: string;
  curp_pet: number;
  
}
