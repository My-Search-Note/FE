import { atom } from "jotai";
import { MemoPaginationData, Memo } from "@/interfaces/memo";

const initailState: MemoPaginationData = {
  memos: [],
  total_count: 0,
  page_count: 1,
};

export const currentPageDataAtom = atom<MemoPaginationData>({
  memos: [],
  total_count: 0,
  page_count: 1,
});

export const currentPageMemosAtom = atom<Memo[]>([]);

export const nextPageDataAtom = atom<MemoPaginationData>({
  ...initailState,
  page_count: 2,
});
export const nextPageMemosAtom = atom<Memo[]>([]);

export const currentPageNumberAtom = atom<number>(1);

export const searchQueryAtom = atom<string>("");

export const selectedMemoIdAtom = atom<number | null>(null);

export const memoListAtom = atom<JSX.Element[] | null>(null);

export const isAddClickedAtom = atom<boolean>(false);

export const isShirinkAtom = atom<boolean>(false);
