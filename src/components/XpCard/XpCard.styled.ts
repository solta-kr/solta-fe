import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: ${({ $color }) => $color};
    opacity: 0.9;
  }
`;

export const TotalXp = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number; $progressBar: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ $progressBar }) => $progressBar};
  border-radius: 999px;
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
