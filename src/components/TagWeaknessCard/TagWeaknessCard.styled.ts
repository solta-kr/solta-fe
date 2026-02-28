import styled from "styled-components";
import type { WeaknessLevel } from "../../types/api";

const LEVEL_COLORS: Record<WeaknessLevel, string> = {
  HIGH: "#EF4444",
  MEDIUM: "#F59E0B",
  LOW: "#10B981",
};

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoTooltip = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #262626;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 12px 14px;
  z-index: 200;
  white-space: nowrap;
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  min-width: 280px;
`;

export const InfoButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: default;

  &:hover ${InfoTooltip} {
    display: block;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Rank = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export const RowMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  min-width: 0;
`;

export const RowTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const TagName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagMeta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const BarWrapper = styled.div`
  height: 5px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: 3px;
  overflow: hidden;
`;

export const Bar = styled.div<{ width: number; level: WeaknessLevel }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ level }) => LEVEL_COLORS[level]};
  border-radius: 3px;
  transition: width 0.4s ease;
`;

export const RowRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
`;

export const ScoreNumber = styled.span<{ level: WeaknessLevel }>`
  font-size: 1.125rem;
  font-weight: 800;
  line-height: 1;
  color: ${({ level }) => LEVEL_COLORS[level]};
`;

export const LevelBadge = styled.span<{ level: WeaknessLevel }>`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ level }) => LEVEL_COLORS[level]};
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;
