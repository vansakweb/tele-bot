import sentences from "@/data/sentences.json";
import words from "@/data/words.json";

type Word = {
  chinese: string;
  pinyin: string[];
  khmer: string[];
  english: string[];
};

export const dic = (text: string): string => {
  // WORDS
  const filteredWords = words
    .filter((word) => word.khmer.length > 0 && word.chinese.includes(text))
    .slice(0, 5) // Limit to 5 results
    .map((word) => ({
      chinese: word.chinese,
      pinyin: word.pinyin,
      khmer: word.khmer,
      english: word.english,
    }));

  const responseText = filteredWords
    .map((word) => wordAndSentences(word))
    .join("\n---------- ---------- ---------- ---------- ----------\n\n\n");

  return responseText;
};

export const wordAndSentences = (word: Word): string => {
  // WORD
  const wordString = `*${word.chinese}\n*<i>${word.pinyin.join(", ")}</i>\n*${word.khmer.join(", ")}\n*${word.english.join(", ")}`;

  // SENTENCES
  const sentencesString = sentences
    .filter(
      (sentence) =>
        sentence.segment.filter((seg) => seg.chinese.includes(word.chinese))
          .length > 0,
    )
    .slice(0, 3) // Limit to 3 results
    .map((sentence) => {
      const chinese = sentence.segment.map((seg) => seg.chinese).join("");
      const pinyin = sentence.segment.map((seg) => seg.pinyin).join(" ");
      const khmer = sentence.khmer;
      return `-${chinese}\n-<i>${pinyin}</i>\n-${khmer}`;
    })
    .join("\n\n");

  return `${wordString}\n\n${sentencesString}`;
};

console.clear();
console.log(dic("不"));
