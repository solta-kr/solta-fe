import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flame } from 'lucide-react';
import { xpQueryOptions } from '../../api/queries/xp';
import * as Styled from './XpHistoryCard.styled';

const PERIODS = [
  { label: '주간', value: 'WEEK' },
  { label: '월간', value: 'MONTH' },
  { label: '전체', value: 'ALL' },
] as const;

const SOLVE_TYPE_LABEL: Record<string, string> = {
  SELF: '스스로 풀기',
  SOLUTION: '답지 보기',
  REVIEW_SELF: '복습 스스로',
  REVIEW_SOLUTION: '복습 답지',
};

type Props = {
  username: string;
};

export function XpHistoryCard({ username }: Props) {
  const [period, setPeriod] = useState('WEEK');

  const { data } = useQuery(xpQueryOptions.history(username, period));

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>XP 획득 내역</Styled.Title>
        <Styled.PeriodTabs>
          {PERIODS.map((p) => (
            <Styled.PeriodTab
              key={p.value}
              $active={period === p.value}
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </Styled.PeriodTab>
          ))}
        </Styled.PeriodTabs>
      </Styled.Header>

      {data && (
        <Styled.PeriodSummary>
          이 기간 합계
          <Styled.PeriodXp>+{data.periodXp.toLocaleString()} XP</Styled.PeriodXp>
        </Styled.PeriodSummary>
      )}

      <Styled.List>
        {data?.history.length === 0 && (
          <Styled.Empty>획득한 XP 내역이 없습니다.</Styled.Empty>
        )}
        {data?.history.map((item) => (
          <Styled.Item key={`${item.solvedId}-${item.createdAt}`}>
            <Styled.ItemLeft>
              <Styled.SolveTypeLabel>{SOLVE_TYPE_LABEL[item.solveType] ?? item.solveType}</Styled.SolveTypeLabel>
              <Styled.TierWeight>가중치 {item.tierWeight}</Styled.TierWeight>
            </Styled.ItemLeft>
            <Styled.ItemRight>
              {item.streakBonus > 0 && (
                <Styled.StreakBadge>
                  <Flame size={11} />
                  +{Math.round(item.streakBonus * 100)}%
                </Styled.StreakBadge>
              )}
              <Styled.XpAmount>+{item.xpAmount.toLocaleString()} XP</Styled.XpAmount>
            </Styled.ItemRight>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Container>
  );
}
