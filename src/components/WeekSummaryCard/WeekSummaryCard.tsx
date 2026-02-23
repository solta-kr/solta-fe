import { useQuery } from '@tanstack/react-query';
import { BarChart2, Info } from 'lucide-react';
import { activityQueryOptions } from '../../api/queries/activity';
import type { ActivityData } from '../../types/api';
import * as Styled from './WeekSummaryCard.styled';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function getWeekRanges() {
  const today = new Date();
  const daysFromMonday = (today.getDay() + 6) % 7;

  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - daysFromMonday);

  const thisSunday = new Date(thisMonday);
  thisSunday.setDate(thisMonday.getDate() + 6);

  const lastMonday = new Date(thisMonday);
  lastMonday.setDate(thisMonday.getDate() - 7);

  const lastSunday = new Date(thisMonday);
  lastSunday.setDate(thisMonday.getDate() - 1);

  return {
    thisWeek: { startDate: formatDate(thisMonday), endDate: formatDate(today) },
    lastWeek: { startDate: formatDate(lastMonday), endDate: formatDate(lastSunday) },
    thisMonday,
    thisSunday,
  };
}

function formatWeekLabel(monday: Date, sunday: Date): string {
  const fmt = (d: Date) =>
    `${d.getMonth() + 1}월 ${d.getDate()}일(${DAY_NAMES[d.getDay()]})`;
  return `${fmt(monday)} ~ ${fmt(sunday)}`;
}

function calcStats(activities: ActivityData[]) {
  const totalCount = activities.reduce((s, a) => s + a.count, 0);
  const totalSeconds = activities.reduce((s, a) => s + a.totalSeconds, 0);
  const totalIndependent = activities.reduce((s, a) => s + (a.independentCount ?? 0), 0);
  const independentRate = totalCount > 0 ? Math.round((totalIndependent / totalCount) * 100) : 0;
  const bestDay = activities.reduce<ActivityData | null>(
    (best, a) => (a.count > (best?.count ?? 0) ? a : best),
    null
  );
  return { totalCount, totalSeconds, independentRate, bestDay };
}

type Dir = 'up' | 'down' | 'same';

function getDiff(current: number, prev: number): { value: number; dir: Dir } {
  const diff = current - prev;
  return { value: Math.abs(diff), dir: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same' };
}

function dirSymbol(dir: Dir): string {
  return dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→';
}

function getDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return DAY_NAMES[d.getDay()] + '요일';
}

type Props = { username: string };

export function WeekSummaryCard({ username }: Props) {
  const { thisWeek, lastWeek, thisMonday, thisSunday } = getWeekRanges();

  const { data: thisData } = useQuery(
    activityQueryOptions.heatmap(username, thisWeek.startDate, thisWeek.endDate)
  );
  const { data: lastData } = useQuery(
    activityQueryOptions.heatmap(username, lastWeek.startDate, lastWeek.endDate)
  );

  const thisStats = calcStats(thisData?.activities ?? []);
  const lastStats = calcStats(lastData?.activities ?? []);
  const hasLastWeek = (lastData?.activities.length ?? 0) > 0;

  const countDiff = getDiff(thisStats.totalCount, lastStats.totalCount);
  const minDiff = getDiff(
    Math.round(thisStats.totalSeconds / 60),
    Math.round(lastStats.totalSeconds / 60)
  );
  const rateDiff = getDiff(thisStats.independentRate, lastStats.independentRate);

  return (
    <Styled.Card>
      <Styled.Header>
        <Styled.Title>
          <BarChart2 size={16} />
          이번 주 요약
        </Styled.Title>
        <Styled.DateRange>{formatWeekLabel(thisMonday, thisSunday)}</Styled.DateRange>
      </Styled.Header>

      <Styled.StatsGrid>
        <Styled.StatCell>
          <Styled.StatValue>문제 {thisStats.totalCount}개</Styled.StatValue>
          {hasLastWeek ? (
            <Styled.StatChange $dir={countDiff.dir}>
              {dirSymbol(countDiff.dir)}{' '}
              {countDiff.dir === 'same'
                ? '지난주와 동일'
                : `지난주보다 ${countDiff.value}개 ${countDiff.dir === 'up' ? '더' : '줄었어요'}`}
            </Styled.StatChange>
          ) : (
            <Styled.StatChangePlaceholder>—</Styled.StatChangePlaceholder>
          )}
        </Styled.StatCell>

        <Styled.StatCell>
          <Styled.StatValue>총 {Math.round(thisStats.totalSeconds / 60)}분</Styled.StatValue>
          {hasLastWeek ? (
            <Styled.StatChange $dir={minDiff.dir}>
              {dirSymbol(minDiff.dir)}{' '}
              {minDiff.dir === 'same'
                ? '지난주와 동일'
                : `${minDiff.value}분 ${minDiff.dir === 'up' ? '더' : '줄었어요'}`}
            </Styled.StatChange>
          ) : (
            <Styled.StatChangePlaceholder>—</Styled.StatChangePlaceholder>
          )}
        </Styled.StatCell>

        <Styled.StatCell>
          <Styled.StatValue>독립 풀이 {thisStats.independentRate}%</Styled.StatValue>
          {hasLastWeek ? (
            <Styled.StatChange $dir={rateDiff.dir}>
              {dirSymbol(rateDiff.dir)}{' '}
              {rateDiff.dir === 'same'
                ? '지난주와 동일'
                : `${rateDiff.value}%p ${rateDiff.dir === 'up' ? '향상' : '감소'}`}
            </Styled.StatChange>
          ) : (
            <Styled.StatChangePlaceholder>—</Styled.StatChangePlaceholder>
          )}
        </Styled.StatCell>
      </Styled.StatsGrid>

      <Styled.BottomRow>
        {thisStats.bestDay ? (
          <Styled.BestDay>
            베스트 요일: <strong>{getDayName(thisStats.bestDay.date)}</strong>
            {' '}({thisStats.bestDay.count}문제)
          </Styled.BestDay>
        ) : (
          <Styled.BestDay>이번 주 아직 풀이 기록이 없어요</Styled.BestDay>
        )}
        {!hasLastWeek && (
          <Styled.NoComparison>
            <Info size={13} />
            아직 비교할 지난 주 기록이 없어요
          </Styled.NoComparison>
        )}
      </Styled.BottomRow>
    </Styled.Card>
  );
}
