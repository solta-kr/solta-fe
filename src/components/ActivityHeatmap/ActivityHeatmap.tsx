import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Info } from 'lucide-react';
import { activityQueryOptions } from '../../api/queries/activity';
import * as Styled from './ActivityHeatmap.styled';

// 풀이 시간 많을수록 진해지는 파란색 계열 (밝은 → 어두운)
const HEATMAP_COLORS = ['#2a2a2a', '#7bbcf7', '#4a96e8', '#2a6acf', '#1a4fa8'] as const;
const MONTH_ABBRS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS: [string, number][] = [['Mon', 0], ['Wed', 2], ['Fri', 4]];
const CURRENT_YEAR = new Date().getFullYear();
const CELL = 11;
const GAP = 2;
const STRIDE = CELL + GAP;
const LEFT_MARGIN = 28;
const TOP_MARGIN = 15;
const TEXT_COLOR = '#8A8D91';

type Period = 'recent' | number;

type TooltipState = {
  x: number;
  y: number;
  date: string;
  count: number;
  totalSeconds: number;
  independentCount: number;
} | null;

function formatDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function getDateRange(period: Period): { startDate: string; endDate: string } {
  const today = new Date();
  if (period === 'recent') {
    const start = new Date(today);
    start.setDate(today.getDate() - 364);
    return { startDate: formatDate(start), endDate: formatDate(today) };
  }
  return { startDate: `${period}-01-01`, endDate: `${period}-12-31` };
}

function generateWeeks(startStr: string, endStr: string): (string | null)[][] {
  const start = new Date(startStr + 'T00:00:00');
  const end = new Date(endStr + 'T00:00:00');
  const rowOf = (jsDay: number) => (jsDay + 6) % 7;

  const cur = new Date(start);
  cur.setDate(start.getDate() - rowOf(start.getDay()));

  const weeks: (string | null)[][] = [];
  while (cur <= end) {
    const week: (string | null)[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(cur >= start && cur <= end ? formatDate(cur) : null);
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabel(week: (string | null)[]): string {
  for (const dateStr of week) {
    if (dateStr && dateStr.slice(8) === '01') {
      return MONTH_ABBRS[parseInt(dateStr.slice(5, 7)) - 1];
    }
  }
  return '';
}

function getLevel(totalSeconds: number): number {
  if (totalSeconds === 0) return 0;
  if (totalSeconds <= 1800) return 1;
  if (totalSeconds <= 3600) return 2;
  if (totalSeconds <= 7200) return 3;
  return 4;
}

function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'recent', label: '최근 1년' },
  ...Array.from({ length: 3 }, (_, i) => ({
    value: CURRENT_YEAR - i as Period,
    label: `${CURRENT_YEAR - i}년`,
  })),
];

type Props = { username: string };

export function ActivityHeatmap({ username }: Props) {
  const [period, setPeriod] = useState<Period>('recent');
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const { startDate, endDate } = getDateRange(period);
  const { data } = useQuery(activityQueryOptions.heatmap(username, startDate, endDate));

  const activityMap = new Map(
    (data?.activities ?? []).map(a => [a.date, a])
  );

  const weeks = generateWeeks(startDate, endDate);
  const svgWidth = LEFT_MARGIN + weeks.length * STRIDE - GAP;
  const svgHeight = TOP_MARGIN + 7 * STRIDE - GAP;

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderLeft>
          <Styled.Title>풀이 활동</Styled.Title>
        </Styled.HeaderLeft>
        <Styled.HeaderRight>
          <Styled.InfoButton>
            <Info size={15} />
            <Styled.InfoTooltip>
              <Styled.InfoTitle>풀이 시간이 많을수록 색상이 진해져요</Styled.InfoTitle>
              <Styled.InfoRows>
                <Styled.InfoRow>
                  <Styled.InfoCell $color={HEATMAP_COLORS[1]} />
                  <span>1 ~ 30분</span>
                </Styled.InfoRow>
                <Styled.InfoRow>
                  <Styled.InfoCell $color={HEATMAP_COLORS[2]} />
                  <span>31 ~ 60분</span>
                </Styled.InfoRow>
                <Styled.InfoRow>
                  <Styled.InfoCell $color={HEATMAP_COLORS[3]} />
                  <span>61 ~ 120분</span>
                </Styled.InfoRow>
                <Styled.InfoRow>
                  <Styled.InfoCell $color={HEATMAP_COLORS[4]} />
                  <span>120분 초과</span>
                </Styled.InfoRow>
              </Styled.InfoRows>
            </Styled.InfoTooltip>
          </Styled.InfoButton>
          <Styled.IconWrapper>
            <Activity size={18} />
          </Styled.IconWrapper>
        </Styled.HeaderRight>
      </Styled.Header>

      <Styled.PeriodSelector>
        {PERIOD_OPTIONS.map(opt => (
          <Styled.PeriodButton
            key={String(opt.value)}
            $active={period === opt.value}
            onClick={() => setPeriod(opt.value)}
          >
            {opt.label}
          </Styled.PeriodButton>
        ))}
      </Styled.PeriodSelector>

      <Styled.SvgWrapper>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          {/* Month labels */}
          {weeks.map((week, i) => {
            const label = getMonthLabel(week);
            if (!label) return null;
            return (
              <text key={i} x={LEFT_MARGIN + i * STRIDE} y={10} fontSize={9} fill={TEXT_COLOR}>
                {label}
              </text>
            );
          })}

          {/* Day labels */}
          {DAY_LABELS.map(([label, rowIdx]) => (
            <text
              key={label}
              x={LEFT_MARGIN - 4}
              y={TOP_MARGIN + rowIdx * STRIDE + CELL / 2 + 1}
              fontSize={9}
              fill={TEXT_COLOR}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {label}
            </text>
          ))}

          {/* Cells */}
          {weeks.map((week, colIdx) =>
            week.map((dateStr, rowIdx) => {
              if (!dateStr) return null;
              const activity = activityMap.get(dateStr);
              const level = activity ? getLevel(activity.totalSeconds) : 0;
              return (
                <rect
                  key={`${colIdx}-${rowIdx}`}
                  x={LEFT_MARGIN + colIdx * STRIDE}
                  y={TOP_MARGIN + rowIdx * STRIDE}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={HEATMAP_COLORS[level]}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e =>
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      date: dateStr,
                      count: activity?.count ?? 0,
                      totalSeconds: activity?.totalSeconds ?? 0,
                      independentCount: activity?.independentCount ?? 0,
                    })
                  }
                  onMouseMove={e =>
                    setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
                  }
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>

        {tooltip && (
          <Styled.Tooltip style={{ left: tooltip.x + 14, top: tooltip.y - 52 }}>
            <Styled.TooltipDate>{formatDateLabel(tooltip.date)}</Styled.TooltipDate>
            {tooltip.count > 0 ? (
              <Styled.TooltipStats>
                문제 {tooltip.count}개 · {Math.round(tooltip.totalSeconds / 60)}분
                {' · '}독립 {Math.round((tooltip.independentCount / tooltip.count) * 100)}%
              </Styled.TooltipStats>
            ) : (
              <Styled.TooltipEmpty>풀이 없음</Styled.TooltipEmpty>
            )}
          </Styled.Tooltip>
        )}
      </Styled.SvgWrapper>

      <Styled.Footer>
        <Styled.StreakText>
          {data && data.currentStreak > 0
            ? `현재 ${data.currentStreak}일 연속 풀이 중 🔥`
            : ''}
        </Styled.StreakText>
        <Styled.Legend>
          <Styled.LegendLabel>적음</Styled.LegendLabel>
          {HEATMAP_COLORS.map((color, i) => (
            <Styled.LegendCell key={i} $color={color} />
          ))}
          <Styled.LegendLabel>많음</Styled.LegendLabel>
        </Styled.Legend>
      </Styled.Footer>
    </Styled.Container>
  );
}
