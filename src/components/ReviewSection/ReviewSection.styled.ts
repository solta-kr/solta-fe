import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
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

export const HeaderActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const GuideButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2.5)};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }
`;

export const IntervalToggle = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2.5)};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SettingsPanel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const SettingsLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const IntervalOptions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

export const IntervalButton = styled.button<{ $active: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.primaryLight : "transparent"};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  background: ${({ active, theme }) => active ? theme.colors.bgSecondary : "transparent"};
  color: ${({ active, theme }) => active ? theme.colors.text : theme.colors.textSecondary};
  box-shadow: ${({ active, theme }) => active ? theme.shadows.sm : "none"};

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

export const ReviewItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    border-color: ${({ theme }) => theme.colors.borderLight};
    transform: translateY(-1px);
  }
`;

type Urgency = "overdue" | "today" | "scheduled";

const STATUS_COLORS: Record<Urgency, string> = {
  overdue: "#EF5350",
  today: "#FFA726",
  scheduled: "#5B9FED",
};

const STATUS_GLOWS: Record<Urgency, string> = {
  overdue: "0 0 8px rgba(239, 83, 80, 0.35)",
  today: "0 0 8px rgba(255, 167, 38, 0.35)",
  scheduled: "none",
};

const BADGE_BG: Record<Urgency, string> = {
  overdue: "rgba(239, 83, 80, 0.15)",
  today: "rgba(255, 167, 38, 0.15)",
  scheduled: "rgba(91, 159, 237, 0.15)",
};

export const StatusBar = styled.div<{ $urgency: Urgency; $color?: string }>`
  width: 4px;
  height: 40px;
  border-radius: 2px;
  background: ${({ $urgency, $color }) => $color ?? STATUS_COLORS[$urgency]};
  flex-shrink: 0;
  box-shadow: ${({ $urgency, $color }) => $color ? "none" : STATUS_GLOWS[$urgency]};
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

export const MetaItem = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RoundBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.bgTertiary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const ScheduleBadge = styled.span<{ $urgency: Urgency }>`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $urgency }) => BADGE_BG[$urgency]};
  color: ${({ $urgency }) => STATUS_COLORS[$urgency]};
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-shrink: 0;
`;

export const PrimaryButton = styled.a`
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

  &:active {
    transform: scale(0.98);
  }
`;

export const SkipButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CompletedBar = styled.div`
  width: 4px;
  height: 40px;
  border-radius: 2px;
  background: #4CAF50;
  flex-shrink: 0;
`;

export const CompletedBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.12);
  padding: 2px 7px;
  border-radius: 4px;
`;

export const FeatureCaption = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing(1)} 0 0 0;
  line-height: 1.5;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const EmptyStateIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const EmptyStateTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
  max-width: 280px;
`;
