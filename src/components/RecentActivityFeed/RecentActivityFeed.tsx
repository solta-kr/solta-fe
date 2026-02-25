import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { feedQueryOptions } from '../../api/queries/feed';
import type { FeedItemResponse } from '../../types/api';
import * as S from './RecentActivityFeed.styled';

function formatRelativeTime(dateString: string): string {
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

function FeedRow({
  feed,
  onNavigate,
}: {
  feed: FeedItemResponse;
  onNavigate: (name: string) => void;
}) {
  return (
    <S.Row onClick={() => onNavigate(feed.memberName)}>
      <S.Avatar src={feed.memberAvatarUrl} alt={feed.memberName} />

      <S.RowBody>
        <S.RowLeft>
          <S.Username>@{feed.memberName}</S.Username>
          <S.ProblemText>
            {feed.problemBojId}번&nbsp;
            <S.ProblemName>{feed.problemTitle}</S.ProblemName>
            &nbsp;문제를 풀었어요
          </S.ProblemText>
        </S.RowLeft>

        <S.RowRight>
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
