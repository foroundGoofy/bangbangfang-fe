// 辅助函数：将中文转换为英文
export function convertToEnglish(chinese) {
  switch (chinese) {
    case "综合评估":
      return "comprehensiveEval";
    case "房屋竞争力":
      return "housingComp";
    case "房屋优势":
      return "housingAdv";
    case "房屋劣势":
      return "housingDisadv";
    case "改进建议":
      return "improveSuggest";
    case "分项评分":
      return "itemizedScores";
    case "交通便利性",'交通便利':
      return "trafficConv";
    case "性价比":
      return "costPerf";
    case "环境优质":
      return "envQuality";
    case "居住舒适":
      return "livingComf";
    case "生活配套":
      return "livingFacil";
    case "市场预测":
      return "marketPred";
    case "出租成功率预测":
      return "rentalSuccessPred";
    case "3天出租成功率":
      return "threeDayRentalRate";
    case "市场分析":
      return "marketAnalysis";
    case "行动建议":
      return "actionSuggest";
    default:
      return chinese;
  }
}
// ... existing code ...
export const markdownToJSON = (markdown) => {
  const sections = markdown
    .split(/###\s+/)
    .filter((section) => section.trim() !== "");
  const result = {};

  sections.forEach((section) => {
    const lines = section.split("\n").filter((line) => line.trim() !== "");
    const title = lines.shift().trim();
    const content = {};
    let currentKey = null;

    lines.forEach((line) => {
      if (line.startsWith("- ")) {
        const [key, value] = line.slice(2).split("：");
        if (value) {
          const scoreMatch = value.match(/^(\d+)分。/);
          if (scoreMatch) {
            content[convertToEnglish(key.trim())] = {
              score: parseInt(scoreMatch[1], 10),
              reason: value.replace(scoreMatch[0], "").trim(),
            };
          } else {
            content[convertToEnglish(key.trim())] = value.trim();
          }
          currentKey = convertToEnglish(key.trim());
        } else {
          if (!content[convertToEnglish(key.trim())]) {
            content[convertToEnglish(key.trim())] = [];
          }
          content[convertToEnglish(key.trim())].push(key.trim());
          currentKey = convertToEnglish(key.trim());
        }
      } else if (line.startsWith("    - ")) {
        const subValue = line.slice(6).trim();
        if (currentKey && Array.isArray(content[currentKey])) {
          content[currentKey].push(subValue);
        }
      }else if (line.startsWith("  - ")) {
        const subValue = line.slice(4).trim();
        console.log("subValue",currentKey,subValue)
        if (currentKey && Array.isArray(content[currentKey])) {
            if(subValue.includes("：")){
              const [key, value] = subValue.split("：");
              content[currentKey].push({key,value});
            }else{
              content[currentKey].push(subValue);
            }
        }
      }
    });

    result[convertToEnglish(title)] = content;
  });

  return result;
};
