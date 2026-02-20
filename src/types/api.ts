import type { SolveType, Tier, TierGroup, SolvedPeriod } from "./types";

// Re-export for backward compatibility
export type { SolveType, Tier, TierGroup, SolvedPeriod };

export interface ProblemDetail {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
}

export interface RecentSolvedResponse {
  solvedId: number;
  solveType: SolveType;
  solveTimeSeconds: number | null;
  memo: string | null;
  problem: ProblemDetail;
  createdAt: string;
}

export interface TierGroupAverage {
  tierGroup: TierGroup;
  averageSolvedSeconds: number | null;
  solvedCount: number;
  independentSolvedCount: number;
}

export interface TierAverage {
  tier: Tier;
  averageSolvedSeconds: number | null;
  solvedCount: number;
  independentCount: number;
}

export type TierAverageMap = Record<TierGroup, TierAverage[]>;

export interface MemberProfileResponse {
  memberId: number;
  name: string;
  bojId: string;
  avatarUrl: string;
  solvedCount: number;
  totalSolvedTime: number;
  totalSolvedAverageTime: number;
}

export interface TrendPoint {
  date: string;
  averageSeconds: number;
  solvedCount: number;
}

export interface SolveTimeTrendsResponse {
  period: string;
  tierGroup: string;
  totalSolvedCount: number;
  trends: TrendPoint[];
}

export interface IndependentRatioPoint {
  date: string;
  independentCount: number;
  totalCount: number;
}

export interface IndependentSolveTrendsResponse {
  period: string;
  tierGroup: string;
  totalIndependentCount: number;
  totalTotalCount: number;
  trends: IndependentRatioPoint[];
}

// 문제 검색 관련 타입
export interface ProblemSearchItem {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
}

export interface ProblemSearchResponse {
  problems: ProblemSearchItem[];
  nextLastBojProblemId: number | null;
  hasNext: boolean;
}

export interface ProblemDetailResponse {
  problemId: number;
  bojProblemId: number;
  title: string;
  tier: Tier;
  tags: string[];
  totalSolvedCount: number;
  independentSolvedCount: number;
  averageSolveTimeSeconds: number | null;
  shortestSolveTimeSeconds: number | null;
}

// 사용자 검색 관련 타입
export interface MemberSearchItem {
  memberId: number;
  name: string;
  avatarUrl: string;
}

export interface MemberSearchResponse {
  members: MemberSearchItem[];
  nextLastMemberId: number | null;
  hasNext: boolean;
}

// Auth 관련 타입
export interface OAuthLoginResponse {
  url: string;
}

export interface AuthMeResponse {
  id: number;
  name: string;
  githubId: string;
  bojId: string | null;
  avatarUrl: string;
}

// BOJ 인증 관련 타입
export interface AuthCodeResponse {
  code: string;
}

export interface BojVerifyRequest {
  shareUrl: string;
}

// 뱃지 관련 타입
export interface BadgeTierDataItem {
  label: string;
  avgMinutes: number;
  color: string;
}

export interface BadgeStatsResponse {
  username: string;
  totalMinutes: number;
  avgMinutes: number;
  selfSolveRate: number;
  tierData: BadgeTierDataItem[];
}

// 풀이 시간 분포 관련 타입
export interface DistributionBucket {
  rangeStart: number;
  rangeEnd: number;
  count: number;
}

export interface MyPosition {
  solveTimeSeconds: number;
  topPercent: number;
}

export interface SolveTimeDistributionResponse {
  bojProblemId: number;
  title: string;
  tier: Tier;
  totalSolverCount: number;
  bucketSize: number;
  distribution: DistributionBucket[];
  myPosition: MyPosition;
}
