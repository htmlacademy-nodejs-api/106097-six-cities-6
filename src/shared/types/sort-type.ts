export const SortType = {
  Down: -1,
  Up: 1,
} as const;

export type SortType = keyof typeof SortType;
