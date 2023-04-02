import { atom } from "jotai";
import { MemoMode } from "@/interfaces/memo";

export const currentPageNumberAtom = atom<number>(1); //현재 페이지 기준으로 다음 페이지 불러옴

export const memoSearchQueryAtom = atom<string>(""); //검색어

export const selectedMemoIdAtom = atom<number | null>(null); //편집시 사용

export const toggleMemoIdAtom = atom<number | null>(null); //토글 버튼 사용시

export const memoModeAtom = atom<MemoMode>("add"); //메모 모드

export const isMemoFormVisibleAtom = atom<boolean>(false); //addMemo 보였다 안보였다 -> 이름 변경

export const isCollapsedAtom = atom<boolean>(false); //메모 열었다 닫았다 할 때
