
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

export const analyzeRunningImage = async (
  image: File,
  age: number,
  weeklyGoal: number
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const base64Image = await fileToBase64(image);
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: image.type,
      },
    };

    const prompt = `
      당신은 매우 친절하고 전문적인 러닝 코치입니다. 사용자가 제공한 러닝 기록 이미지와 개인 정보를 바탕으로 상세하고 유용한 분석을 한국어로 제공해주세요.

      ## 사용자 정보
      - 나이: ${age}세
      - 주간 목표 훈련 거리: ${weeklyGoal}km

      ## 분석 요청사항
      1.  **데이터 추출:** 이미지에서 러닝 관련 데이터를 최대한 정확하게 추출해주세요. (예: 총 거리, 시간, 평균 페이스, 평균 심박수, 케이던스, 상승 고도 등)
      2.  **최대 심박수 및 훈련 강도 분석:**
          *   '220 - 나이' 공식을 사용하여 사용자의 최대 심박수(MHR)를 계산해주세요.
          *   추출된 평균 심박수를 바탕으로 이 훈련이 어느 심박수 존(Zone)에 해당하는지 분석해주세요. (Zone 1: 50-60%, Zone 2: 60-70%, Zone 3: 70-80%, Zone 4: 80-90%, Zone 5: 90-100%)
          *   훈련 강도가 적절했는지 평가해주세요.
      3.  **80/20 훈련법 분석:**
          *   80/20 원칙(전체 훈련의 80%는 저강도, 20%는 고강도)에 대해 간단히 설명해주세요.
          *   오늘 진행한 훈련이 저강도(Zone 1-2)에 해당하는지, 고강도(Zone 4-5)에 해당하는지 판단하고, 사용자의 훈련 계획에 어떻게 부합하는지 조언해주세요.
      4.  **10% 룰 분석:**
          *   10% 룰(부상 방지를 위해 주간 훈련량을 10% 이상 늘리지 않는 것)에 대해 간단히 설명해주세요.
          *   사용자의 주간 목표 거리를 고려하여, 다음 주 훈련 계획에 대해 조언해주세요. 이번 러닝이 주간 총 거리에 어떻게 기여하는지 언급해주세요.
      5.  **종합 피드백 및 조언:**
          *   위 분석 내용을 종합하여 긍정적인 점을 칭찬하고, 개선할 수 있는 점에 대해 구체적이고 실행 가능한 조언을 제공해주세요.
          *   결과는 반드시 마크다운 형식을 사용하여 명확하고 읽기 쉽게 구성해주세요. 각 섹션 제목은 '##'을 사용하고, 목록은 '*'를 사용해주세요.

      결과는 친절하고 동기부여가 되는 어조로 작성해주세요.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, { text: prompt }] },
    });
    
    const text = response.text;
    if (text === undefined) {
      throw new Error("API로부터 유효한 텍스트 응답을 받지 못했습니다.");
    }
    
    return text;
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw new Error("Gemini API 호출에 실패했습니다.");
  }
};
