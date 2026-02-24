import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { feedQueryOptions } from '../../api/queries/feed';
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from '../../constants/tierColors';
import formatSeconds from '../../utils/formatSeconds';
import type { Tier } from '../../types/types';
import type { FeedItemResponse } from '../../types/api';
import * as S from './RecentActivityFeed.styled';

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return '방금';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffDay === 0) {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  if (diffDay === 1) return '어제';
  if (diffDay < 7) return `${diffDay}일 전`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}주 전`;
  return `${Math.floor(diffDay / 30)}개월 전`;
}

function FeedRow({
  feed,
  onNavigate,
}: {
  feed: FeedItemResponse;
  onNavigate: (name: string) => void;
}) {
  const tierGroup = feed.problemTier
    ? getTierGroupFromTier(feed.problemTier as Tier)
    : 'NONE';
  const tierColor = hslToRgb(TIER_GROUP_COLORS[tierGroup]);

  return (
    <S.Row onClick={() => onNavigate(feed.memberName)}>
      <S.Avatar src={feed.memberAvatarUrl} alt={feed.memberName} />

      <S.RowBody>
        <S.RowLeft>
          <S.Username>@{feed.memberName}</S.Username>
          <S.TierDot color={tierColor} />
          <S.ProblemText>
            {feed.problemBojId}번&nbsp;
            <S.ProblemName>{feed.problemTitle}</S.ProblemName>
          </S.ProblemText>
        </S.RowLeft>

        <S.RowRight>
          {feed.solveType === 'SOLUTION' ? (
            <S.SolutionBadge>답지 참고</S.SolutionBadge>
          ) : (
            feed.solveTimeSeconds != null && (
              <S.SolveTime>{formatSeconds(feed.solveTimeSeconds)}</S.SolveTime>
            )
          )}
          <S.When>{formatRelativeTime(feed.solvedAt)}</S.When>
        </S.RowRight>
      </S.RowBody>
    </S.Row>
  );
}

export function RecentActivityFeed() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(feedQueryOptions.recent());

  if (isLoading) {
    return (
      <S.Section>
        <S.LoadingPlaceholder />
      </S.Section>
    );
  }

  if (!data || (data.recentFeeds.length === 0 && data.stats.totalSolveCount === 0)) {
    return null;
  }

  const { stats, recentFeeds } = data;

  const goToProfile = (name: string) => {
    window.scrollTo(0, 0);
    navigate(`/profile/${name}`);
  };

  return (
    <S.Section>
      <S.Inner>
        <S.Header>
          <S.HeaderLeft>
            <S.SectionTitle>지금 Solta에서는</S.SectionTitle>
          </S.HeaderLeft>
          <S.StatSummary>
            {stats.periodLabel}&nbsp;
            <S.StatNum>{stats.activeUserCount}명</S.StatNum>
            &nbsp;·&nbsp;
            <S.StatNum>{stats.totalSolveCount}문제</S.StatNum>
            &nbsp;풀이 완료
          </S.StatSummary>
        </S.Header>

        <S.Divider />

        <S.FeedList>
          {recentFeeds.map((feed, idx) => (
            <FeedRow key={idx} feed={feed} onNavigate={goToProfile} />
          ))}
        </S.FeedList>
      </S.Inner>
    </S.Section>
  );
}
