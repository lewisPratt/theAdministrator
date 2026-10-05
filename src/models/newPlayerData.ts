import type { playerDataShape } from "../interfaces/interfaces";

export const newPlayerData : playerDataShape = {
  player_name: null,
  player_tutorialComplete: false,
  player_credits: 0,
  player_unlocks: [],
  player_stats: {
    cases_complete: 0,
    total_credits_earned: 0,
    total_credits_lost: 0,
    cases_correct: 0,
    cases_failed: 0,
  },
};