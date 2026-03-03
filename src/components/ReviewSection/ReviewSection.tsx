import { useState } from "react";
import { RotateCcw, HelpCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewQueryOptions, reviewQueryKeys } from "../../api/queries/review";
import { reviewApi } from "../../api/api";
import { authQueryOptions } from "../../api/queries/auth";
import { getTierGroupFromTier, TIER_GROUP_COLORS, hslToRgb } from "../../constants/tierColors";
import type { ReviewItem, ReviewHistoryItem } from "../../types/api";
import { ReviewGuideModal } from "../ReviewGuideModal/ReviewGuideModal";
import * as S from "./ReviewSection.styled";

type Urgency = "overdue" | "today" | "scheduled";
type TabType = "overdue" | "today" | "scheduled";

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getUrgency(item: ReviewItem, todayStr: string): Urgency {
  if (item.isOverdue) return "overdue";
  if (item.scheduledDate === todayStr) return "today";
  return "scheduled";
}

function formatScheduleBadge(item: ReviewItem, urgency: Urgency): string {
  if (urgency === "today") return "오늘";
  if (urgency === "overdue") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(item.scheduledDate);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays}일 밀림` : "오늘";
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(item.scheduledDate);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return "내일";
  return `${diffDays}일 후`;
}

function formatCompletedAt(completedAt: string): string {
  const date = new Date(completedAt);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} 완료`;
}

interface ReviewItemRowProps {
  item: ReviewItem;
  urgency: Urgency;
  onSkip?: (id: number) => void;
  skipping?: boolean;
}

function ReviewItemRow({ item, urgency, onSkip, skipping }: ReviewItemRowProps) {
  const tags = item.problem.tags.slice(0, 2);
  const showActions = urgency === "overdue" || urgency === "today";
  const tierColor = urgency === "today"
    ? hslToRgb(TIER_GROUP_COLORS[getTierGroupFromTier(item.problem.tier)])
    : undefined;

  return (
    <S.ReviewItemRow>
      <S.StatusBar $urgency={urgency} $color={tierColor} />
      <S.ProblemInfo>
        <S.ProblemHeader>
          <S.ProblemNumber>#{item.problem.bojProblemId}</S.ProblemNumber>
          <S.ProblemTitle>{item.problem.title}</S.ProblemTitle>
        </S.ProblemHeader>
        <S.ProblemMeta>
          <S.MetaItem>{item.problem.tier}</S.MetaItem>
          {tags.length > 0 && <S.MetaItem>{tags.join(" · ")}</S.MetaItem>}
          <S.RoundBadge><RotateCcw size={10} />{item.round}회차</S.RoundBadge>
          <S.ScheduleBadge $urgency={urgency}>
            {formatScheduleBadge(item, urgency)}
          </S.ScheduleBadge>
        </S.ProblemMeta>
      </S.ProblemInfo>
      {showActions && onSkip && (
        <S.ActionGroup>
          <S.PrimaryButton
            href={`https://acmicpc.net/problem/${item.problem.bojProblemId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            복습하기 ↗
          </S.PrimaryButton>
          <S.SkipButton onClick={() => onSkip(item.id)} disabled={skipping}>
            미루기
          </S.SkipButton>
        </S.ActionGroup>
      )}
    </S.ReviewItemRow>
  );
}

function CompletedItemRow({ item }: { item: ReviewHistoryItem }) {
  const tags = item.problem.tags.slice(0, 2);
  return (
    <S.ReviewItemRow>
      <S.CompletedBar />
      <S.ProblemInfo>
        <S.ProblemHeader>
          <S.ProblemNumber>#{item.problem.bojProblemId}</S.ProblemNumber>
          <S.ProblemTitle>{item.problem.title}</S.ProblemTitle>
        </S.ProblemHeader>
        <S.ProblemMeta>
          <S.MetaItem>{item.problem.tier}</S.MetaItem>
          {tags.length > 0 && <S.MetaItem>{tags.join(" · ")}</S.MetaItem>}
          <S.RoundBadge><RotateCcw size={10} />{item.round}회차</S.RoundBadge>
          <S.CompletedBadge>{formatCompletedAt(item.completedAt)}</S.CompletedBadge>
        </S.ProblemMeta>
      </S.ProblemInfo>
    </S.ReviewItemRow>
  );
}

const INTERVAL_OPTIONS = [1, 3, 7] as const;

const TABS: { key: TabType; label: string }[] = [
  { key: "overdue", label: "밀린 복습" },
  { key: "today", label: "오늘" },
  { key: "scheduled", label: "예정된 복습" },
];

interface ReviewSectionProps {
  username: string;
  isOwner: boolean;
}

export function ReviewSection({ username, isOwner }: ReviewSectionProps) {
  const queryClient = useQueryClient();
  const { data } = useQuery(reviewQueryOptions.pending(username));
  const { data: completedData } = useQuery(reviewQueryOptions.completed(username));
  const { data: me } = useQuery(authQueryOptions.me());
  const [skippingId, setSkippingId] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const todayStr = getTodayStr();

  const overdueItems = data?.reviews.filter((r) => r.isOverdue) ?? [];
  const todayItems = data?.reviews.filter((r) => !r.isOverdue && r.scheduledDate === todayStr) ?? [];
  const scheduledItems = data?.reviews.filter((r) => !r.isOverdue && r.scheduledDate !== todayStr) ?? [];

  const defaultTab: TabType = overdueItems.length > 0 ? "overdue" : todayItems.length > 0 ? "today" : "scheduled";
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const settingMutation = useMutation({
    mutationFn: (interval: number) => reviewApi.updateReviewSetting(interval),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryOptions.me().queryKey }),
  });

  const skipMutation = useMutation({
    mutationFn: (id: number) => reviewApi.skip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.pending(username) });
    },
  });

  const handleSkip = (id: number) => {
    setSkippingId(id);
    skipMutation.mutate(id, { onSettled: () => setSkippingId(null) });
  };

  const tabCounts: Record<TabType, number> = {
    overdue: overdueItems.length,
    today: todayItems.length,
    scheduled: scheduledItems.length,
  };

  const displayItems =
    activeTab === "overdue" ? overdueItems :
    activeTab === "today" ? todayItems :
    scheduledItems;

  const hasPending = (data?.reviews.length ?? 0) > 0;
  const hasCompleted = (completedData?.histories.length ?? 0) > 0;

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title>복습 예정</S.Title>
            {hasPending
              ? <S.Subtitle>총 {data!.reviews.length}개 · 정답을 참고한 풀이는 자동으로 복습이 예약돼요</S.Subtitle>
              : <S.FeatureCaption>정답을 참고한 풀이는 자동으로 복습이 예약돼요</S.FeatureCaption>
            }
          </div>
          <S.HeaderActions>
            <S.GuideButton onClick={() => setShowGuide(true)}>
              <HelpCircle size={14} />
              이 기능은?
            </S.GuideButton>
            {isOwner && (
              <S.IntervalToggle onClick={() => setShowSettings((v) => !v)}>
                기본 간격 {me?.defaultReviewInterval ?? 3}일 후
              </S.IntervalToggle>
            )}
          </S.HeaderActions>
        </S.Header>

        {isOwner && showSettings && (
          <S.SettingsPanel>
            <S.SettingsLabel>풀면 며칠 뒤에 복습할까요?</S.SettingsLabel>
            <S.IntervalOptions>
              {INTERVAL_OPTIONS.map((days) => (
                <S.IntervalButton
                  key={days}
                  type="button"
                  $active={me?.defaultReviewInterval === days}
                  disabled={settingMutation.isPending}
                  onClick={() => settingMutation.mutate(days)}
                >
                  {days}일 후
                </S.IntervalButton>
              ))}
            </S.IntervalOptions>
          </S.SettingsPanel>
        )}

        {hasPending ? (
          <>
            <S.SortContainer>
              {TABS.map((tab) => (
                <S.SortButton
                  key={tab.key}
                  type="button"
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}{tabCounts[tab.key] > 0 ? ` ${tabCounts[tab.key]}` : ""}
                </S.SortButton>
              ))}
            </S.SortContainer>
            <S.ProblemList>
              {displayItems.length === 0 ? (
                <S.EmptyStateContainer style={{ padding: "16px" }}>
                  <S.EmptyStateTitle>해당하는 복습이 없어요</S.EmptyStateTitle>
                </S.EmptyStateContainer>
              ) : (
                displayItems.map((item) => (
                  <ReviewItemRow
                    key={item.id}
                    item={item}
                    urgency={getUrgency(item, todayStr)}
                    onSkip={handleSkip}
                    skipping={skippingId === item.id}
                  />
                ))
              )}
            </S.ProblemList>
          </>
        ) : (
          <S.EmptyStateContainer>
            <S.EmptyStateIcon>📅</S.EmptyStateIcon>
            <S.EmptyStateTitle>아직 예정된 복습이 없어요</S.EmptyStateTitle>
            <S.EmptyStateDescription>
              정답을 참고해서 풀면 자동으로 복습이 예약돼요.
              복습일이 되면 여기서 확인할 수 있어요.
            </S.EmptyStateDescription>
          </S.EmptyStateContainer>
        )}
      </S.Container>

      {hasCompleted && (
        <S.Container>
          <S.Header>
            <div>
              <S.Title>완료된 복습</S.Title>
              <S.Subtitle>최근 {completedData!.histories.length}개</S.Subtitle>
            </div>
          </S.Header>
          <S.ProblemList>
            {completedData!.histories.map((item) => (
              <CompletedItemRow key={item.id} item={item} />
            ))}
          </S.ProblemList>
        </S.Container>
      )}

      {showGuide && <ReviewGuideModal onClose={() => setShowGuide(false)} />}
    </>
  );
}
