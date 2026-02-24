import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(10)};
  overflow-y: auto;
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

export const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const BojId = styled.span`
  font-size: 0.8rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TierBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

// Tags
export const TagSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const SectionLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Tag = styled.span`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
`;

// Memo
export const MemoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.bgTertiary};
`;

export const MemoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const MemoEditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MemoText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MemoEmpty = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
`;

export const MemoTextarea = styled.textarea`
  width: 100%;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding: ${({ theme }) => theme.spacing(3)};
  resize: vertical;
  line-height: 1.6;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MemoEditActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const MemoSaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 16px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MemoCancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 0.8rem;
  padding: 6px 16px;
  cursor: pointer;
`;

// Recommendation
export const RecommendBox = styled.div<{ $color: string }>`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => `${$color}15`};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const RecommendIconBox = styled.div<{ $color: string }>`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $color }) => `${$color}25`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const RecommendTitle = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 0.95rem;
`;

export const RecommendDescription = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 4px 0 0 0;
`;

// Stats
export const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  flex: 1;
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.bgTertiary};
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const StatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatValue = styled.span<{ $color: string }>`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  border-radius: 4px;
  background: ${({ $color }) => $color};
  transition: width 0.5s ease;
`;

export const StatSubtext = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing(2)} 0 0 0;
`;

// Solve time grid
export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const TimeItem = styled.div<{ $hasBorder?: boolean }>`
  text-align: center;
  ${({ $hasBorder, theme }) =>
    $hasBorder && `border-right: 1px solid ${theme.colors.border};`}
`;

export const TimeLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 4px 0;
`;

export const TimeValue = styled.p<{ $color?: string }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.colors.text};
  margin: 0;
`;

// Empty state
export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.bgTertiary};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const EmptyTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
`;

export const EmptySubtext = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

// Distribution chart
export const DistributionSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

// BOJ link
export const BojLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
