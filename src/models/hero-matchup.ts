import { Hero } from './hero';

export interface HeroMatchup {
  heroId: Hero['id'];
  disadvantage: number;
  winRate: number;
  matchesPlayed: number;
}
