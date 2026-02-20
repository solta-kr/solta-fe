import { useId } from 'react';
import styled from 'styled-components';

interface TierBarData {
	label: string;
	avgMinutes: number;
	color: string;
}

interface SoltaBadgeProps {
	username?: string;
	totalMinutes?: number;
	avgMinutes?: number;
	selfSolveRate?: number;
	tierData?: TierBarData[];
}

const MOCK_TIER_DATA: TierBarData[] = [
	{ label: 'B', avgMinutes: 12, color: 'hsl(30, 70%, 45%)' },
	{ label: 'S', avgMinutes: 28, color: 'hsl(210, 15%, 60%)' },
	{ label: 'G', avgMinutes: 43, color: 'hsl(45, 100%, 50%)' },
	{ label: 'P', avgMinutes: 71, color: 'hsl(175, 60%, 55%)' },
	{ label: 'D', avgMinutes: 95, color: 'hsl(200, 100%, 65%)' },
	{ label: 'R', avgMinutes: 0,  color: 'hsl(350, 85%, 55%)' },
];

const Wrapper = styled.div`
	display: inline-block;
	line-height: 0;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
`;

export function SoltaBadge({
	username = 'abc5259',
	totalMinutes = 11022,
	avgMinutes = 43,
	selfSolveRate = 71,
	tierData = MOCK_TIER_DATA,
}: SoltaBadgeProps) {
	const totalH = Math.floor(totalMinutes / 60);
	const totalM = totalMinutes % 60;
	const totalTimeStr = totalH > 0
		? `${totalH}시간 ${totalM}분`
		: `${totalM}분`;
	const rawId = useId();
	const uid = rawId.replace(/:/g, '');

	// ── colours ───────────────────────────────────────────────────────────────
	const BG_START  = '#0D1117';
	const BG_MID    = '#142035';
	const BG_END    = '#1c3554';
	const TEXT      = '#E4E6EB';
	const TEXT_SUB  = '#8B949E';
	const DIVIDER   = 'rgba(255,255,255,0.09)';
	const LOGO_A    = '#FF9A76';
	const LOGO_B    = '#FF7C5C';

	// ── layout ────────────────────────────────────────────────────────────────
	const W         = 400;
	const H         = 165;
	const PAD       = 14;
	const HEADER_H  = 38;
	const DIV_X     = 188;
	const CHART_X   = DIV_X + 16;

	const C_BOTTOM  = H - 20;   // bar bottoms
	const C_TOP     = HEADER_H + 36; // max bar top (leaves room for value labels)
	const MAX_BAR_H = C_BOTTOM - C_TOP;

	// ── tier bars ─────────────────────────────────────────────────────────────
	const active      = tierData.filter((d) => d.avgMinutes > 0);
	// floor 60: 아주 작은 값이 꽉 차 보이지 않도록 / ceiling 300: 한 티어 극단값이 나머지를 납작하게 만들지 않도록
	const rawMax      = active.length > 0 ? Math.max(...active.map((d) => d.avgMinutes)) : 60;
	const scalingMax  = Math.min(Math.max(rawMax, 60), 300);
	const BAR_W       = 14;
	const CHART_GAP   = 13;
	const CHART_R     = W - PAD;
	const CHART_W     = CHART_R - CHART_X;
	const GROUP_W     = active.length * BAR_W + (active.length + 1) * CHART_GAP;
	const CHART_OFF_X = CHART_X + (CHART_W - GROUP_W) / 2;

	// ── unique ids ────────────────────────────────────────────────────────────
	const bgId      = `bg-${uid}`;
	const glossId   = `gloss-${uid}`;
	const shimId    = `shim-${uid}`;
	const shimKf    = `shimKf-${uid}`;
	const clipId    = `clip-${uid}`;
	const logoGradId = `logo-${uid}`;
	const wordmarkGradId = `wm-${uid}`;

	// Logo bar dimensions (bottom-aligned inside header)
	const BAR_BOTTOM = HEADER_H - 10;         // y baseline
	const BAR_SIZES  = [7, 11, 15] as const;
	const BAR_W_LOGO = 5;
	const BAR_GAP    = 3;
	const logoEndX   = PAD + BAR_SIZES.length * BAR_W_LOGO + (BAR_SIZES.length - 1) * BAR_GAP;

	return (
		<Wrapper>
			<svg
				width={W}
				height={H}
				viewBox={`0 0 ${W} ${H}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* ── shimmer animation ──────────────────────────────────────── */}
				{/*
				  Natural shimmer = gradient rect (edges fade transparent)
				  Quick sweep (0→32%) then long pause (32→100%) → feels like
				  a glossy reflection occasionally catching the light.
				*/}
				<style>{`
					@keyframes ${shimKf} {
						0%   { transform: translateX(-280px) skewX(-18deg); opacity: 0; }
						6%   { transform: translateX(-120px) skewX(-18deg); opacity: 1; }
						28%  { transform: translateX(${W - 40}px) skewX(-18deg); opacity: 1; }
						36%  { transform: translateX(${W + 120}px) skewX(-18deg); opacity: 0; }
						100% { transform: translateX(${W + 120}px) skewX(-18deg); opacity: 0; }
					}
					.${shimId} {
						animation: ${shimKf} 5s linear infinite;
					}
				`}</style>

				<defs>
					{/* Background diagonal gradient */}
					<linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%"   stopColor={BG_START} />
						<stop offset="50%"  stopColor={BG_MID}   />
						<stop offset="100%" stopColor={BG_END}   />
					</linearGradient>

					{/* Gloss: subtle top highlight */}
					<linearGradient id={glossId} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%"   stopColor="rgba(255,255,255,0.06)" />
						<stop offset="60%"  stopColor="rgba(255,255,255,0.01)" />
						<stop offset="100%" stopColor="rgba(255,255,255,0)" />
					</linearGradient>

					{/* Shimmer rect gradient — edges fade out naturally */}
					<linearGradient id={`${shimId}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%"   stopColor="rgba(255,255,255,0)" />
						<stop offset="30%"  stopColor="rgba(255,255,255,0.015)" />
						<stop offset="50%"  stopColor="rgba(255,255,255,0.025)" />
						<stop offset="70%"  stopColor="rgba(255,255,255,0.015)" />
						<stop offset="100%" stopColor="rgba(255,255,255,0)" />
					</linearGradient>

					{/* Logo bar gradient (matches CSS linear-gradient(135deg, …)) */}
					<linearGradient
						id={logoGradId}
						gradientUnits="userSpaceOnUse"
						x1={PAD} y1={BAR_BOTTOM - 22}
						x2={PAD + logoEndX - PAD} y2={BAR_BOTTOM}
					>
						<stop offset="0%"   stopColor={LOGO_A} />
						<stop offset="100%" stopColor={LOGO_B} />
					</linearGradient>

					{/* Wordmark gradient */}
					<linearGradient
						id={wordmarkGradId}
						gradientUnits="userSpaceOnUse"
						x1="39" y1="0" x2="79" y2="0"
					>
						<stop offset="0%"   stopColor={LOGO_A} />
						<stop offset="100%" stopColor={LOGO_B} />
					</linearGradient>

					{/* Clip to rounded rect */}
					<clipPath id={clipId}>
						<rect x="0" y="0" width={W} height={H} rx="12" ry="12" />
					</clipPath>
				</defs>

				{/* ── Background ─────────────────────────────────────────────── */}
				<rect x="0" y="0" width={W} height={H} rx="12" ry="12" fill={`url(#${bgId})`} />

				<g clipPath={`url(#${clipId})`}>
					{/* Gloss */}
					<rect x="0" y="0" width={W} height={H} fill={`url(#${glossId})`} />
					{/* Shimmer */}
					<rect
						className={shimId}
						x="-220" y="0"
						width="220" height={H}
						fill={`url(#${shimId}-grad)`}
					/>
				</g>

				{/* ── HEADER: Logo ───────────────────────────────────────────── */}
				{/* 3 ascending bars */}
				{BAR_SIZES.map((h, i) => (
					<rect
						key={i}
						x={PAD + i * (BAR_W_LOGO + BAR_GAP)}
						y={BAR_BOTTOM - h}
						width={BAR_W_LOGO}
						height={h}
						rx="1.5"
						fill={`url(#${logoGradId})`}
					/>
				))}

				{/* "Solta" wordmark */}
				<text
					x={PAD + BAR_SIZES.length * (BAR_W_LOGO + BAR_GAP) + 1}
					y={BAR_BOTTOM - 2}
					fontFamily="Outfit, 'Noto Sans KR', system-ui, sans-serif"
					fontSize="14" fontWeight="700"
					fill={`url(#${wordmarkGradId})`}
					letterSpacing="0.5"
				>
					Solta
				</text>

				{/* Username */}
				<text
					x={W - PAD} y={BAR_BOTTOM - 2}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="11" fontWeight="400"
					fill={TEXT_SUB}
					textAnchor="end"
				>
					@{username}
				</text>

				{/* Horizontal rule */}
				<line
					x1={PAD} y1={HEADER_H}
					x2={W - PAD} y2={HEADER_H}
					stroke={DIVIDER} strokeWidth="1"
				/>

				{/* ── LEFT PANEL ─────────────────────────────────────────────── */}

				{/* ── ROW 1: 총 풀이 시간 (hero) ──────────────────────── */}
				<text
					x={PAD} y={HEADER_H + 34}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="9" fontWeight="400"
					fill={TEXT_SUB}
				>
					총 풀이 시간
				</text>
				<text
					x={PAD} y={HEADER_H + 54}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="17" fontWeight="700"
					fill={TEXT}
				>
					{totalTimeStr}
				</text>

				{/* ── ROW 2: 평균 · 자력 (supporting, 2-col) ──────────── */}
				<text
					x={PAD} y={HEADER_H + 84}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="9" fontWeight="400"
					fill={TEXT_SUB}
				>
					평균 풀이 시간
				</text>
				<text
					x={PAD} y={HEADER_H + 99}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="14" fontWeight="700"
					fill={TEXT}
				>
					{avgMinutes}분
				</text>

				<text
					x={PAD + 84} y={HEADER_H + 84}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="9" fontWeight="400"
					fill={TEXT_SUB}
				>
					자력 해결률
				</text>
				<text
					x={PAD + 84} y={HEADER_H + 99}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="14" fontWeight="700"
					fill={TEXT}
				>
					{selfSolveRate}%
				</text>

				{/* Vertical divider */}
				<line
					x1={DIV_X} y1={HEADER_H + 10}
					x2={DIV_X} y2={H - 10}
					stroke={DIVIDER} strokeWidth="1"
				/>

				{/* ── RIGHT PANEL: tier bar chart ────────────────────────────── */}
				<text
					x={CHART_X + 4} y={HEADER_H + 15}
					fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
					fontSize="9" fontWeight="400"
					fill={TEXT_SUB}
				>
					티어별 평균 풀이 시간
				</text>

				{active.map((d, i) => {
					const barH   = Math.min((d.avgMinutes / scalingMax) * MAX_BAR_H, MAX_BAR_H);
					const bX     = CHART_OFF_X + CHART_GAP + i * (BAR_W + CHART_GAP);
					const bY     = C_BOTTOM - barH;
					const labelY = bY - 4; // above bar top
					const mins   = `${d.avgMinutes}분`;

					return (
						<g key={d.label}>
							{/* Bar */}
							<rect
								x={bX} y={bY}
								width={BAR_W} height={barH}
								rx="3"
								fill={d.color}
								opacity="0.9"
							/>
							{/* Value label above bar */}
							<text
								x={bX + BAR_W / 2} y={labelY}
								fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
								fontSize="8" fontWeight="600"
								fill={d.color}
								textAnchor="middle"
								opacity="0.95"
							>
								{mins}
							</text>
							{/* Tier label below bar */}
							<text
								x={bX + BAR_W / 2} y={C_BOTTOM + 12}
								fontFamily="'Noto Sans KR', Outfit, system-ui, sans-serif"
								fontSize="8" fontWeight="500"
								fill={TEXT_SUB}
								textAnchor="middle"
							>
								{d.label}
							</text>
						</g>
					);
				})}
			</svg>
		</Wrapper>
	);
}

export default SoltaBadge;
