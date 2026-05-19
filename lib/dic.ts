import sentences from "@/data/sentences.json";
import words from "@/data/words.json";

export const dic = (text: string): string => {
  // WORDS
  const filteredWords = words
    .filter((word) => word.khmer.length > 0 && word.chinese.includes(text))
    .slice(0, 5) // Limit to 5 results
    .map(
      (word) =>
        `${word.chinese}\n${word.pinyin}\n${word.khmer}\n<u>${word.english}</u>\n`,
    )
    .join("\n");

  const responseText =
    filteredWords.length > 0
      ? `ពាក្យដែលទាក់ទងនឹង <b>${text}</b>:\n\n${filteredWords}`
      : "មិនមានពាក្យដែលត្រូវគ្នា។";

  // SENTENCES
  const filteredSentences = sentences
    .filter(
      (sentence) =>
        sentence.segment.filter((seg) => seg.chinese.includes(text)).length > 0,
    )
    .slice(0, 5) // Limit to 5 results
    .map((sentence) => {
      const chinese = sentence.segment.map((seg) => seg.chinese).join("");
      const pinyin = sentence.segment.map((seg) => seg.pinyin).join(" ");
      const khmer = sentence.khmer;
      return `${chinese}\n<i>${pinyin}</i>\n${khmer}\n`;
    })
    .join("\n");

  const responseSentence =
    filteredSentences.length > 0
      ? `ឃ្លាប្រយោគដែលទាក់ទងនឹង <b>${text}</b>:\n\n${filteredSentences}`
      : "មិនមានឃ្លាប្រយោគដែលត្រូវគ្នា។";

  return `${responseText}\n\n${responseSentence}`;
};
