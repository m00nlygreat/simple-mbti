export type Question = {
  text: string;
  yes: string;
  no: string;
};

export const QUESTIONS: Question[] = [
  {
    text: "고등학교 때 유명했나요?",
    yes: "E",
    no: "I",
  },
  {
    text: "운동(스포츠)하는 걸 좋아하나요?",
    yes: "S",
    no: "N",
  },
  {
    text: "수학을 잘하나요?",
    yes: "T",
    no: "F",
  },
  {
    text: "지금 방이 깨끗한가요?",
    yes: "J",
    no: "P",
  },
];
