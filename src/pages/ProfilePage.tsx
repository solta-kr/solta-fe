import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SolvedList } from "../components/SolvedList/SolvedList";
import { SolveTrendsChart } from "../components/SolveTrendsChart/SolveTrendsChart";
import { RetryListCard } from "../components/RetryListCard/RetryListCard";
import { TierStatsChart } from "../components/TierStatsChart/TierStatsChart";
import { ProblemDetailPanel } from "../components/ProblemDetailPanel/ProblemDetailPanel";
import { BojLinkModal } from "../components/BojLinkModal/BojLinkModal";
import { Trophy, Clock, Target, X, Link as LinkIcon } from "lucide-react";
import { solvedQueryOptions } from "../api/queries/solved";
import { problemApi } from "../api/api";
import formatSeconds from "../utils/formatSeconds";
import { trackEvent } from "../utils/gtag";
import { useAuth } from "../context/AuthContext";
import * as Styled from "./ProfilePage.styled";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"recent" | "stats" | "retry">("recent");
  const [selectedBojId, setSelectedBojId] = useState<number | null>(null);
  const [selectedSolveTimeSeconds, setSelectedSolveTimeSeconds] = useState<number | null>(null);
  const [showBojModal, setShowBojModal] = useState(false);

  const isMyProfile = user?.name === username;
  const needsBojLink = isMyProfile && !user?.bojId;

  const { data: profile, isLoading: isLoadingProfile, isError: isErrorProfile } = useQuery(
    solvedQueryOptions.profile(username || "")
  );

  const { data: solveds = [], isLoading: isLoadingSolveds } = useQuery(
    solvedQueryOptions.recentSolveds(username || "")
  );

  const { data: detail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["problemDetail", selectedBojId],
    queryFn: () => problemApi.getProblemDetail(selectedBojId!),
    enabled: selectedBojId !== null,
  });

  const loading = isLoadingProfile || isLoadingSolveds;
  const error = isErrorProfile ? "데이터를 불러오는데 실패했습니다." : null;

  const totalSolved = profile?.solvedCount || 0;
  const totalTimeSeconds = profile?.totalSolvedTime || 0;
  const averageTimeSeconds = profile?.totalSolvedAverageTime || 0;

  const handleProblemClick = (bojProblemId: number, solveTimeSeconds: number | null) => {
    trackEvent('view_problem_detail', { problem_id: bojProblemId, source: 'profile' });
    setSelectedBojId(bojProblemId);
    setSelectedSolveTimeSeconds(solveTimeSeconds);
  };

  const handleCloseDrawer = () => {
    setSelectedBojId(null);
    setSelectedSolveTimeSeconds(null);
  };

  if (loading) {
    return (
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
      </Styled.ProfileContainer>
    );
  }

  if (error) {
    return (
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>
      </Styled.ProfileContainer>
    );
  }

  if (!username) {
    return (
      <Styled.ProfileContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>사용자 이름이 필요합니다.</div>
      </Styled.ProfileContainer>
    );
  }

  const drawerOpen = selectedBojId !== null;

  return (
    <>
      <Styled.ProfileContainer>
        <Styled.UserSection>
          <Styled.UserInfo>
            <Styled.UserIcon src={profile?.avatarUrl} />
            <Styled.UserDetails>
              <Styled.UserHeader>
                <Styled.UserId>{username}</Styled.UserId>
              </Styled.UserHeader>
              {profile?.bojId && (
                <Styled.UserStats>
                  <Styled.BojIdRow>
                    <span>백준 ID: <Styled.BojProfileLink href={`https://www.acmicpc.net/user/${profile.bojId}`} target="_blank" rel="noopener noreferrer">{profile.bojId}</Styled.BojProfileLink></span>
                    <Styled.SolvedAcLink
                      href={`https://solved.ac/profile/${profile.bojId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Styled.SolvedAcIcon viewBox="0 0 100 60" width={20} height={12}>
                        <rect x="0" y="0" width="100" height="60" rx="12" fill="#17ce3a" />
                        <text x="50" y="43" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="800" fontFamily="Arial, sans-serif">AC</text>
                      </Styled.SolvedAcIcon>
                      solved.ac
                    </Styled.SolvedAcLink>
                  </Styled.BojIdRow>
                </Styled.UserStats>
              )}
              {needsBojLink && (
                <Styled.BojLinkButton onClick={() => setShowBojModal(true)}>
                  <LinkIcon size={14} />
                  백준 ID 연결하기
                </Styled.BojLinkButton>
              )}
            </Styled.UserDetails>
          </Styled.UserInfo>
        </Styled.UserSection>

        <Styled.StatsCards>
          <Styled.StatCard>
            <Styled.StatCardIcon>
              <Trophy size={20} />
            </Styled.StatCardIcon>
            <Styled.StatCardTitle>시간기록한 문제 수</Styled.StatCardTitle>
            <Styled.StatCardValue>{totalSolved}개</Styled.StatCardValue>
          </Styled.StatCard>
          <Styled.StatCard>
            <Styled.StatCardIcon>
              <Clock size={20} />
            </Styled.StatCardIcon>
            <Styled.StatCardTitle>총 풀이 시간</Styled.StatCardTitle>
            <Styled.StatCardValue>
              {formatSeconds(totalTimeSeconds)}
            </Styled.StatCardValue>
          </Styled.StatCard>
          <Styled.StatCard>
            <Styled.StatCardIcon>
              <Target size={20} />
            </Styled.StatCardIcon>
            <Styled.StatCardTitle>전체 문제 평균 시간</Styled.StatCardTitle>
            <Styled.StatCardValue>
              {formatSeconds(averageTimeSeconds)}
            </Styled.StatCardValue>
          </Styled.StatCard>
        </Styled.StatsCards>

        <Styled.TabSection>
          <Styled.TabHeader>
            <Styled.TabButton
              active={activeTab === "recent"}
              onClick={() => { trackEvent('profile_tab_switch', { tab: 'recent' }); setActiveTab("recent"); }}
            >
              최근 풀이
            </Styled.TabButton>
            <Styled.TabButton
              active={activeTab === "stats"}
              onClick={() => { trackEvent('profile_tab_switch', { tab: 'stats' }); setActiveTab("stats"); }}
            >
              통계
            </Styled.TabButton>
            <Styled.TabButton
              active={activeTab === "retry"}
              onClick={() => { trackEvent('profile_tab_switch', { tab: 'retry' }); setActiveTab("retry"); }}
            >
              다시 도전하기
            </Styled.TabButton>
          </Styled.TabHeader>

          <Styled.TabContent>
            {activeTab === "recent" && (
              <Styled.FullWidthSection>
                <SolvedList solveds={solveds} onProblemClick={handleProblemClick} />
              </Styled.FullWidthSection>
            )}
            {activeTab === "stats" && (
              <>
                {username && (
                  <Styled.FullWidthSection>
                    <TierStatsChart memberName={username} />
                  </Styled.FullWidthSection>
                )}
                {username && <SolveTrendsChart memberName={username} />}
              </>
            )}
            {activeTab === "retry" && username && (
              <RetryListCard memberName={username} onProblemClick={handleProblemClick} />
            )}
          </Styled.TabContent>
        </Styled.TabSection>
      </Styled.ProfileContainer>

      {/* Problem Detail Drawer */}
      <Styled.DrawerOverlay $open={drawerOpen} onClick={handleCloseDrawer} />
      <Styled.DrawerPanel $open={drawerOpen}>
        <Styled.DrawerHeader>
          <Styled.DrawerTitle>문제 상세</Styled.DrawerTitle>
          <Styled.DrawerClose onClick={handleCloseDrawer}>
            <X size={20} />
          </Styled.DrawerClose>
        </Styled.DrawerHeader>
        <Styled.DrawerBody>
          {isDetailLoading ? (
            <Styled.DrawerLoading>불러오는 중...</Styled.DrawerLoading>
          ) : detail ? (
            <ProblemDetailPanel detail={detail} solveTimeSeconds={selectedSolveTimeSeconds} avatarUrl={profile?.avatarUrl} />
          ) : null}
        </Styled.DrawerBody>
      </Styled.DrawerPanel>

      {showBojModal && <BojLinkModal onClose={() => setShowBojModal(false)} />}
    </>
  );
}

export default ProfilePage;
