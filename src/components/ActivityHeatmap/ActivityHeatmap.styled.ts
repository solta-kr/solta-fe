import styled from 'styled-components';

const CELL_SIZE = 11;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;


export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
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

export const InfoTitle = styled.p`
  margin: 0 0 10px 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: #E4E6EB;
`;

export const InfoRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #B0B3B8;
`;

export const InfoCell = styled.div<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const PeriodSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const PeriodButton = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.bgTertiary};
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({ $active }) => $active ? 600 : 400};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active }) => $active ? '#fff' : '#5B9FED'};
  }
`;

export const SvgWrapper = styled.div`
  position: relative;
`;

export const Tooltip = styled.div`
  position: fixed;
  background: #262626;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 10px 14px;
  pointer-events: none;
  z-index: 200;
  white-space: nowrap;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
`;

export const TooltipDate = styled.p`
  margin: 0 0 4px 0;
  font-size: 0.813rem;
  font-weight: 600;
  color: #E4E6EB;
`;

export const TooltipStats = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #5B9FED;
  font-weight: 500;
`;

export const TooltipEmpty = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #8A8D91;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-top: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StreakText = styled.div`
  font-size: 0.813rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const LegendLabel = styled.span`
  font-size: 0.688rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0 4px;
`;

export const LegendCell = styled.div<{ $color: string }>`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;
