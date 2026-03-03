import { useState } from "react";
import { RotateCcw, ChevronDown, Clock, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { solvedQueryOptions } from "../../api/queries/solved";
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import type { RecentSolvedResponse } from "../../types/api";
import * as Styled from "./RetryListCard.styled";

type SortOption = "LATEST" | "TIER" | "SOLVE_TIME";

interface RetryListCardProps {
  memberName: string;
  onProblemClick?: (bojProblemId: number, solveTimeSeconds: number | null) => void;
}

interface RetryItemProps {
  solved: RecentSolvedResponse;
  isExpanded: boolean;
  onToggle: () => void;
  onProblemClick?: (bojProblemId: number, solveTimeSeconds: number | null) => void;
}

function RetryItem({ solved, isExpanded, onToggle, onProblemClick }: RetryItemProps) {
  const tierGroup = getTierGroupFromTier(solved.problem.tier);
  const tierColor = hslToRgb(TIER_GROUP_COLORS[tierGroup]);

  const handleMainClick = () => {
    if (onProblemClick) {
      onProblemClick(solved.problem.bojProblemId, solved.solveTimeSeconds);
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <Styled.ItemWrapper>
      <Styled.ItemMain onClick={handleMainClick}>
        <Styled.TierBar color={tierColor} />

        <Styled.ProblemInfo>
          <Styled.ProblemHeader>
            <Styled.ProblemNumber>#{solved.problem.bojProblemId}</Styled.ProblemNumber>
            <Styled.ProblemTitle>{solved.problem.title}</Styled.ProblemTitle>
          </Styled.ProblemHeader>

          <Styled.ProblemMeta>
            <Styled.TierText color={tierColor}>{solved.problem.tier}</Styled.TierText>
            {solved.solveTimeSeconds != null && (
              <Styled.MetaItem>
                <Clock size={12} />
                {formatSeconds(solved.solveTimeSeconds)}
              </Styled.MetaItem>
            )}
            {solved.problem.tags.length > 0 && !isExpanded && (
              <Styled.MetaItem>
                <Tag size={12} />
                {solved.problem.tags[0]}
                {solved.problem.tags.length > 1 && ` +${solved.problem.tags.length - 1}`}
              </Styled.MetaItem>
            )}
            <Styled.SolveTypeBadge>참고함</Styled.SolveTypeBadge>
          </Styled.ProblemMeta>
        </Styled.ProblemInfo>

        <Styled.ExpandButton
          $expanded={isExpanded}
          onClick={handleExpandClick}
          title={isExpanded ? "접기" : "펼치기"}
        >
          <ChevronDown size={16} />
        </Styled.ExpandButton>
      </Styled.ItemMain>

      {isExpanded && (
        <Styled.ItemDetails>
          {solved.problem.tags.length > 0 && (
            <Styled.TagList>
              {solved.problem.tags.map((tag) => (
                <Styled.TagBadge key={tag}>{tag}</Styled.TagBadge>
              ))}
            </Styled.TagList>
          )}
          <Styled.DetailActions>
            <Styled.BojDetailLink
              href={`https://acmicpc.net/problem/${solved.problem.bojProblemId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              BOJ에서 풀기 ↗
            </Styled.BojDetailLink>
          </Styled.DetailActions>
        </Styled.ItemDetails>
      )}
    </Styled.ItemWrapper>
  );
}

export function RetryListCard({ memberName, onProblemClick }: RetryListCardProps) {
  const [sortBy, setSortBy] = useState<SortOption>("LATEST");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: retryProblems = [], isLoading, refetch } = useQuery(
    solvedQueryOptions.retryProblems(memberName, sortBy)
  );

  const handleRefresh = () => {
    refetch();
  };

  const handleToggle = (solvedId: number) => {
    setExpandedId(expandedId === solvedId ? null : solvedId);
  };

  if (isLoading) {
    return (
      <Styled.Container>
        <Styled.Header>
          <div>
            <Styled.Title>다시 도전하기</Styled.Title>
            <Styled.Subtitle>불러오는 중...</Styled.Subtitle>
          </div>
          <Styled.IconWrapper onClick={handleRefresh}>
            <RotateCcw size={20} />
          </Styled.IconWrapper>
        </Styled.Header>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <div>
          <Styled.Title>다시 도전하기</Styled.Title>
          <Styled.Subtitle>
            풀이를 참고했던 {retryProblems.length}문제 · SELF로 바꿔보세요
          </Styled.Subtitle>
        </div>
        <Styled.IconWrapper onClick={handleRefresh}>
          <RotateCcw size={20} />
        </Styled.IconWrapper>
      </Styled.Header>

      <Styled.SortContainer>
        <Styled.SortButton
          type="button"
          active={sortBy === "LATEST"}
          onClick={() => setSortBy("LATEST")}
        >
          최신순
        </Styled.SortButton>
        <Styled.SortButton
          type="button"
          active={sortBy === "TIER"}
          onClick={() => setSortBy("TIER")}
        >
          난이도순
        </Styled.SortButton>
        <Styled.SortButton
          type="button"
          active={sortBy === "SOLVE_TIME"}
          onClick={() => setSortBy("SOLVE_TIME")}
        >
          풀이시간순
        </Styled.SortButton>
      </Styled.SortContainer>

      <Styled.ProblemList>
        {retryProblems.length > 0 ? (
          retryProblems.map((solved) => (
            <RetryItem
              key={solved.solvedId}
              solved={solved}
              isExpanded={expandedId === solved.solvedId}
              onToggle={() => handleToggle(solved.solvedId)}
              onProblemClick={onProblemClick}
            />
          ))
        ) : (
          <Styled.EmptyState>
            <RotateCcw size={32} />
            <p>모든 문제를 스스로 풀었어요!</p>
          </Styled.EmptyState>
        )}
      </Styled.ProblemList>

      {retryProblems.length > 0 && (
        <Styled.Motivation>
          <RotateCcw size={20} color="#5B9FED" />
          <Styled.MotivationText>
            <Styled.MotivationTitle>다시 도전해보세요!</Styled.MotivationTitle>
            <Styled.MotivationSub>참고했던 문제를 직접 풀면 SELF로 변경돼요</Styled.MotivationSub>
          </Styled.MotivationText>
        </Styled.Motivation>
      )}
    </Styled.Container>
  );
}
