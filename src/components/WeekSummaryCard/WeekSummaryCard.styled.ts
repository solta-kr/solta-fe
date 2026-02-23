import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled.div`
  font-size: 0.938rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DateRange = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCell = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const StatValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const StatChange = styled.div<{ $dir: 'up' | 'down' | 'same' }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $dir }) =>
    $dir === 'up' ? '#4CAF50' :
    $dir === 'down' ? '#EF5350' :
    '#8A8D91'};
`;

export const StatChangePlaceholder = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const BestDay = styled.div`
  font-size: 0.813rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export const NoComparison = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
  }
`;
