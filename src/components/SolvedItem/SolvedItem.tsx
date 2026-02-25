import { useNavigate } from "react-router-dom";
import { ExternalLink, Clock, Tag } from "lucide-react";
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import formatSeconds from "../../utils/formatSeconds";
import type { RecentSolvedResponse } from "../../types/api";
import * as Styled from "./SolvedItem.styled";

interface SolvedItemProps {
  solved: RecentSolvedResponse;
  showSolveType?: boolean;
  showDate?: boolean;
  onProblemClick?: (bojProblemId: number, solveTimeSeconds: number | null) => void;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return `${diffSec}초 전`;
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 365) return `${diffDay}일 전`;
  return `${diffYear}년 전`;
}

export function SolvedItem({ solved, showSolveType = false, showDate = false, onProblemClick }: SolvedItemProps) {
  const navigate = useNavigate();
  const tierGroup = getTierGroupFromTier(solved.problem.tier);
  const tierColor = hslToRgb(TIER_GROUP_COLORS[tierGroup]);

  const handleClick = () => {
    if (onProblemClick) {
      onProblemClick(solved.problem.bojProblemId, solved.solveTimeSeconds);
    } else {
      const id = solved.problem.bojProblemId;
      navigate(`/problems?q=${id}&select=${id}`);
    }
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://www.acmicpc.net/problem/${solved.problem.bojProblemId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Styled.Container onClick={handleClick}>
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
          {solved.problem.tags.length > 0 && (
            <Styled.MetaItem>
              <Tag size={12} />
              {solved.problem.tags[0]}
              {solved.problem.tags.length > 1 && ` +${solved.problem.tags.length - 1}`}
            </Styled.MetaItem>
          )}
          {showDate && solved.createdAt && (
            <Styled.DateText>{formatDate(solved.createdAt)}</Styled.DateText>
          )}
        </Styled.ProblemMeta>
      </Styled.ProblemInfo>

      {showSolveType && (
        <Styled.SolveTypeBadge solveType={solved.solveType}>
          {solved.solveType === "SELF" ? "스스로" : "참고"}
        </Styled.SolveTypeBadge>
      )}

      <Styled.ExternalLinkIcon onClick={handleExternalClick}>
        <ExternalLink size={16} />
      </Styled.ExternalLinkIcon>
    </Styled.Container>
  );
}
