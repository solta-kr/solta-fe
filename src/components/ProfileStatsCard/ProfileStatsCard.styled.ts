import styled from 'styled-components';

export const StatsRow = styled.div`
  display: flex;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
  }
`;

export const StatItem = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 0 0 50%;
    min-width: 0;

    &:nth-child(3) {
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
    &:last-child {
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

export const StatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.7;
  }
`;

export const StatValue = styled.div`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

export const StatSubValue = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 400;
`;

export const Divider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  margin: ${({ theme }) => theme.spacing(3)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
