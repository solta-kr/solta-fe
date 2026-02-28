import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { solvedQueryOptions } from "../../api/queries/solved";
import type { TagWeaknessItem, WeaknessLevel } from "../../types/api";
import * as Styled from "./TagWeaknessCard.styled";

const LEVEL_LABEL: Record<WeaknessLevel, string> = {
  HIGH: "약함",
  MEDIUM: "보통",
  LOW: "강함",
};

type Props = {
  memberName: string;
};

function WeaknessItem({ item }: { item: TagWeaknessItem }) {
  const isLowData = item.confidence < 0.5;

  return (
    <Styled.Item level={item.weaknessLevel}>
      <Styled.ItemTop>
        <Styled.ItemLeft>
          <Styled.TagName>{item.korName}</Styled.TagName>
          <Styled.LevelBadge level={item.weaknessLevel}>
            {LEVEL_LABEL[item.weaknessLevel]}
          </Styled.LevelBadge>
        </Styled.ItemLeft>
        <Styled.ScoreBlock>
          <Styled.ScoreLabel>약점 점수</Styled.ScoreLabel>
          <Styled.ScoreNumber level={item.weaknessLevel}>
            {Math.round(item.finalScore * 100)}
          </Styled.ScoreNumber>
        </Styled.ScoreBlock>
      </Styled.ItemTop>

      <Styled.Stats>
        <Styled.StatRow>
          <Styled.StatLabel>자력 풀이율</Styled.StatLabel>
          <Styled.BarWrapper>
            <Styled.Bar width={item.selfSolveRate} color="#5B9FED" />
          </Styled.BarWrapper>
          <Styled.StatValue>{item.selfSolveRate}%</Styled.StatValue>
        </Styled.StatRow>

        <Styled.StatRow>
          <Styled.StatLabel>상대 시간</Styled.StatLabel>
          {item.timeRatio !== null ? (
            <>
              <Styled.BarWrapper>
                <Styled.Bar
                  width={Math.min(item.timeRatio * 50, 100)}
                  color={item.timeRatio > 1.2 ? "#EF4444" : "#10B981"}
                />
              </Styled.BarWrapper>
              <Styled.StatValue>내 평균의 {item.timeRatio.toFixed(1)}배</Styled.StatValue>
            </>
          ) : (
            <>
              <Styled.BarWrapper>
                <Styled.Bar width={0} color="#5B9FED" />
              </Styled.BarWrapper>
              <Styled.NoDataText>자력 풀이 없음</Styled.NoDataText>
            </>
          )}
        </Styled.StatRow>
      </Styled.Stats>

      <Styled.Footer>
        <Styled.FooterText>{item.totalCount}문제</Styled.FooterText>
        <Styled.FooterText>신뢰도 {Math.round(item.confidence * 100)}%</Styled.FooterText>
        {isLowData && (
          <Styled.LowDataText>
            <AlertTriangle size={11} /> 데이터 부족
          </Styled.LowDataText>
        )}
      </Styled.Footer>
    </Styled.Item>
  );
}

export function TagWeaknessCard({ memberName }: Props) {
  const { data: weaknesses = [] } = useQuery(
    solvedQueryOptions.tagWeakness(memberName)
  );

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>태그별 약점 분석</Styled.Title>
        <Styled.Subtitle>
          스스로 못 푼 비율 + 내 평균보다 오래 걸리는 정도를 기준으로 계산해요. 풀이 수가 많을수록 정확해요.
        </Styled.Subtitle>
      </Styled.Header>

      {weaknesses.length === 0 ? (
        <Styled.EmptyState>분석할 풀이 기록이 없습니다</Styled.EmptyState>
      ) : (
        <Styled.List>
          {weaknesses.map((item) => (
            <WeaknessItem key={item.key} item={item} />
          ))}
        </Styled.List>
      )}
    </Styled.Container>
  );
}
