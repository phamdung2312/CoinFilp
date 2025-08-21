export type FlipResult = "heads" | "tails";

export interface HistoryItem {
  result: FlipResult;
  time: Date;
}

export interface FlipStats {
  heads: number;
  tails: number;
}
