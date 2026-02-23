import { Trophy, Clock, Target, Flame } from 'lucide-react';
import formatSeconds from '../../utils/formatSeconds';
import * as Styled from './ProfileStatsCard.styled';

type Props = {
  totalSolved: number;
  totalTimeSeconds: number;
  averageTimeSeconds: number;
  currentStreak: number;
  longestStreak: number;
};

export function ProfileStatsCard({
  totalSolved,
  totalTimeSeconds,
  averageTimeSeconds,
  currentStreak,
  longestStreak,
}: Props) {
  return (
    <Styled.StatsRow>
        <Styled.StatItem>
          <Styled.StatLabel>
            <Trophy size={13} />
            시간기록한 문제 수
          </Styled.StatLabel>
          <Styled.StatValue>{totalSolved}개</Styled.StatValue>
        </Styled.StatItem>

        <Styled.Divider />

        <Styled.StatItem>
          <Styled.StatLabel>
            <Clock size={13} />
            총 풀이 시간
          </Styled.StatLabel>
          <Styled.StatValue>{formatSeconds(totalTimeSeconds)}</Styled.StatValue>
        </Styled.StatItem>

        <Styled.Divider />

        <Styled.StatItem>
          <Styled.StatLabel>
            <Target size={13} />
            전체 문제 평균 시간
          </Styled.StatLabel>
          <Styled.StatValue>{formatSeconds(averageTimeSeconds)}</Styled.StatValue>
        </Styled.StatItem>

        <Styled.Divider />

        <Styled.StatItem>
          <Styled.StatLabel>
            <Flame size={13} />
            현재 스트릭
          </Styled.StatLabel>
          <Styled.StatValue>{currentStreak}일 연속</Styled.StatValue>
          <Styled.StatSubValue>최장 {longestStreak}일</Styled.StatSubValue>
        </Styled.StatItem>
    </Styled.StatsRow>
  );
}
