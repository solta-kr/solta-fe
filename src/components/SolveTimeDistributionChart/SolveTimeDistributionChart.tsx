import { useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";
import type { SolveTimeDistributionResponse } from "../../types/api";
import formatSeconds from "../../utils/formatSeconds";
import * as Styled from "./SolveTimeDistributionChart.styled";

interface SolveTimeDistributionChartProps {
  data: SolveTimeDistributionResponse;
  avatarUrl?: string;
}

function formatShortTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
  return `${m}분`;
}

const AVATAR_SIZE = 22;
const MUTED_COLOR = "#3D3D3D";
const PRIMARY_COLOR = "#5B9FED";

export function SolveTimeDistributionChart({
  data,
  avatarUrl,
}: SolveTimeDistributionChartProps) {
  const { distribution, myPosition, totalSolverCount } = data;

  const chartData = useMemo(
    () =>
      distribution.map((bucket) => ({
        label: formatShortTime(bucket.rangeEnd),
        count: bucket.count,
        rangeStart: bucket.rangeStart,
        rangeEnd: bucket.rangeEnd,
      })),
    [distribution]
  );

  const myBucketIndex = useMemo(() => {
    return distribution.findIndex(
      (b) =>
        myPosition.solveTimeSeconds >= b.rangeStart &&
        myPosition.solveTimeSeconds <= b.rangeEnd
    );
  }, [distribution, myPosition]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBar = useCallback((props: any) => {
    const { x, y, width, height, index } = props;
    const isMine = index === myBucketIndex;
    const fill = isMine ? PRIMARY_COLOR : MUTED_COLOR;
    const r = 2;

    return (
      <g>
        <path
          d={`M${x},${y + r} Q${x},${y} ${x + r},${y}
              L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r}
              L${x + width},${y + height} L${x},${y + height} Z`}
          fill={fill}
        />
        {isMine && avatarUrl && (
          <>
            <defs>
              <clipPath id="dist-avatar-clip">
                <circle
                  cx={x + width / 2}
                  cy={y - AVATAR_SIZE / 2 - 4}
                  r={AVATAR_SIZE / 2}
                />
              </clipPath>
            </defs>
            <circle
              cx={x + width / 2}
              cy={y - AVATAR_SIZE / 2 - 4}
              r={AVATAR_SIZE / 2 + 1.5}
              fill={PRIMARY_COLOR}
            />
            <image
              href={avatarUrl}
              x={x + width / 2 - AVATAR_SIZE / 2}
              y={y - AVATAR_SIZE - 4}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              clipPath="url(#dist-avatar-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
          </>
        )}
      </g>
    );
  }, [myBucketIndex, avatarUrl]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.TitleRow>
          <BarChart3 size={16} />
          풀이 시간 분포
        </Styled.TitleRow>
        <Styled.PercentBadge>상위 {myPosition.topPercent.toFixed(1)}%</Styled.PercentBadge>
      </Styled.Header>

      <Styled.SubInfo>
        총 {totalSolverCount.toLocaleString()}명 중 내 풀이 시간:{" "}
        {formatSeconds(myPosition.solveTimeSeconds)}
      </Styled.SubInfo>

      <Styled.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: AVATAR_SIZE + 8, right: 4, left: -20, bottom: 0 }}
            barCategoryGap="40%"
          >
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "#8A8D91" }}
              tickLine={false}
              axisLine={false}
              interval={chartData.length > 12 ? 2 : chartData.length > 7 ? 1 : 0}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#8A8D91" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload as (typeof chartData)[number];
                return (
                  <div style={{
                    background: "#262626",
                    border: "1px solid #333333",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "0.8rem",
                  }}>
                    <div style={{ color: "#B0B3B8", marginBottom: 4 }}>
                      {formatShortTime(d.rangeStart)}~{formatShortTime(d.rangeEnd)}
                    </div>
                    <div style={{ color: "#E4E6EB" }}>
                      풀이자: {d.count}명
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="count"
              maxBarSize={14}
              shape={renderBar}
            />
          </BarChart>
        </ResponsiveContainer>
      </Styled.ChartWrapper>
    </Styled.Container>
  );
}
