import styled from "styled-components";
import type { WeaknessLevel } from "../../types/api";

const LEVEL_COLORS: Record<WeaknessLevel, string> = {
  HIGH: "#EF4444",
  MEDIUM: "#F59E0B",
  LOW: "#10B981",
};

export const Container = styled.div``;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const Item = styled.div<{ level: WeaknessLevel }>`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ level }) => LEVEL_COLORS[level]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const ItemTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const TagName = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const LevelBadge = styled.span<{ level: WeaknessLevel }>`
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
  color: ${({ level }) => LEVEL_COLORS[level]};
  background: ${({ level }) => LEVEL_COLORS[level]}22;
`;

export const ScoreBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
`;

export const ScoreNumber = styled.span<{ level: WeaknessLevel }>`
  font-size: 1.625rem;
  font-weight: 800;
  line-height: 1;
  color: ${({ level }) => LEVEL_COLORS[level]};
`;

export const ScoreLabel = styled.span`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const StatLabel = styled.span`
  width: 72px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
`;

export const BarWrapper = styled.div`
  flex: 1;
  height: 5px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: 3px;
  overflow: hidden;
`;

export const Bar = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ color }) => color};
  border-radius: 3px;
  transition: width 0.3s ease;
`;

export const StatValue = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  min-width: 90px;
  text-align: right;
`;

export const NoDataText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 90px;
  text-align: right;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FooterText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LowDataText = styled.span`
  font-size: 0.75rem;
  color: #F59E0B;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;
