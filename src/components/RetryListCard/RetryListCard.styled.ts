import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(91, 159, 237, 0.25);
    transform: rotate(180deg);
  }

  &:active {
    transform: rotate(180deg) scale(0.95);
  }
`;

export const SortContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SortButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active, theme }) =>
    active ? theme.colors.bgSecondary : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.text : theme.colors.textSecondary};
  box-shadow: ${({ active, theme }) =>
    active ? theme.shadows.sm : "none"};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-height: 500px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing(1)};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.borderLight};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    opacity: 0.5;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    font-size: 0.875rem;
    margin: 0;
  }
`;

/* ── 개별 아이템 ── */

export const ItemWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
  }
`;

export const ItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
  }
`;

export const TierBar = styled.div<{ color: string }>`
  width: 6px;
  height: 36px;
  border-radius: 3px;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

export const ProblemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const ProblemNumber = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
`;

export const ProblemTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

export const TierText = styled.span<{ color: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ color }) => color};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SolveTypeBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(249, 115, 22, 0.12);
  color: rgb(249, 115, 22);
  border: 1px solid rgba(249, 115, 22, 0.25);
`;

export const ExpandButton = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;
  transform: ${({ $expanded }) => $expanded ? "rotate(180deg)" : "rotate(0deg)"};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const ItemDetails = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)} calc(${({ theme }) => theme.spacing(3)} + 6px + ${({ theme }) => theme.spacing(3)});
  background: ${({ theme }) => theme.colors.bgTertiary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const TagBadge = styled.span`
  font-size: 0.7rem;
  padding: 3px 10px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DetailActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const BojDetailLink = styled.a`
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

/* ── 동기부여 섹션 ── */

export const Motivation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
  background: linear-gradient(
    135deg,
    rgba(91, 159, 237, 0.08) 0%,
    rgba(91, 159, 237, 0.03) 100%
  );
  border: 1px solid rgba(91, 159, 237, 0.15);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const MotivationText = styled.div``;

export const MotivationTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(0.5)} 0;
`;

export const MotivationSub = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;
