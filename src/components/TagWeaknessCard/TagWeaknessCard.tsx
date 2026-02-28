import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
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

function WeaknessRow({ item, rank }: { item: TagWeaknessItem; rank: number }) {
  const barWidth = item.weaknessScore * 100;
  const displayLevel = item.weaknessLevel;
  const timeLabel = item.timeRatio === null
    ? null
    : item.timeRatio > 1.0
      ? `내 평균보다 ${item.timeRatio.toFixed(1)}배 느림`
      : `내 평균보다 ${(1 / item.timeRatio).toFixed(1)}배 빠름`;

  const meta = [
    `자력 ${item.selfSolveRate}%`,
    timeLabel,
    `${item.totalCount}문제`,
    `신뢰도 ${Math.round(item.confidence * 100)}%`,
  ].filter(Boolean).join(" · ");

  return (
    <Styled.Row>
      <Styled.Rank>{rank}</Styled.Rank>
      <Styled.RowMain>
        <Styled.RowTop>
          <Styled.TagName>{item.korName}</Styled.TagName>
          <Styled.TagMeta>{meta}</Styled.TagMeta>
        </Styled.RowTop>
        <Styled.BarWrapper>
          <Styled.Bar width={barWidth} level={displayLevel} />
        </Styled.BarWrapper>
      </Styled.RowMain>
      <Styled.RowRight>
        <Styled.ScoreNumber level={displayLevel}>
          {Math.round(item.weaknessScore * 100)}
        </Styled.ScoreNumber>
        <Styled.LevelBadge level={displayLevel}>
          {LEVEL_LABEL[displayLevel]}
        </Styled.LevelBadge>
      </Styled.RowRight>
    </Styled.Row>
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
        <Styled.InfoButton>
          <Info size={15} />
          <Styled.InfoTooltip>
            <div>약점 점수 = (1 − 자력풀이율) × 60% + 시간 점수 × 40%</div>
            <div>시간 점수 = 내 전체 평균 대비 해당 태그 풀이 시간 (오래 걸릴수록 높음)</div>
            <div>신뢰도 = 풀이 수가 많을수록 높음</div>
          </Styled.InfoTooltip>
        </Styled.InfoButton>
      </Styled.Header>

      {weaknesses.length === 0 ? (
        <Styled.EmptyState>분석할 풀이 기록이 없습니다</Styled.EmptyState>
      ) : (
        <Styled.List>
          {weaknesses.map((item, idx) => (
            <WeaknessRow key={item.key} item={item} rank={idx + 1} />
          ))}
        </Styled.List>
      )}
    </Styled.Container>
  );
}
