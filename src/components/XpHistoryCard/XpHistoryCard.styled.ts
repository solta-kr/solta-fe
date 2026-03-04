import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const PeriodTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const PeriodTab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.colors.textMuted};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
    color: ${({ theme, $active }) =>
      $active ? '#fff' : theme.colors.text};
  }
`;

export const PeriodSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PeriodXp = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const SolveTypeLabel = styled.span`
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const TierWeight = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StreakBadge = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  font-size: 0.7rem;
  font-weight: 600;
  color: #f97316;
  background: #f9731615;
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: 999px;

  svg {
    color: #f97316;
  }
`;

export const XpAmount = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 64px;
  text-align: right;
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing(8)};
  text-align: center;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
