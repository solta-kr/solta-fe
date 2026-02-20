import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { SoltaBadge } from '../components/SoltaBadge/SoltaBadge';
import { useAuth } from '../context/AuthContext';
import { badgeApi } from '../api/api';

// ── Styled Components ─────────────────────────────────────────────────────────

const Page = styled.div`
	min-height: 100vh;
	background: ${({ theme }) => theme.colors.bg};
	color: ${({ theme }) => theme.colors.text};
`;

const Container = styled.div`
	max-width: 780px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(6)};

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
	}
`;

const Hero = styled.section`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing(14)};
`;

const HeroEyebrow = styled.p`
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.primary};
	margin: 0 0 ${({ theme }) => theme.spacing(3)};
`;

const HeroTitle = styled.h1`
	font-size: 2.2rem;
	font-weight: 700;
	margin: 0 0 ${({ theme }) => theme.spacing(4)};
	line-height: 1.25;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		font-size: 1.7rem;
	}
`;

const HeroDesc = styled.p`
	font-size: 0.95rem;
	color: ${({ theme }) => theme.colors.textSecondary};
	margin: 0 auto;
	max-width: 500px;
	line-height: 1.65;
`;

// ── Badge preview card ────────────────────────────────────────────────────────

const BadgeCard = styled.div`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.lg};
	padding: ${({ theme }) => theme.spacing(6)};
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing(5)};
	margin-bottom: ${({ theme }) => theme.spacing(14)};
`;

const CardLabel = styled.span`
	font-size: 0.72rem;
	font-weight: 600;
	letter-spacing: 0.6px;
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.textMuted};
`;

const BadgeCanvas = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	background: #080c12;
	overflow-x: auto;
`;

const CodeBlock = styled.div`
	background: ${({ theme }) => theme.colors.bg};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
	font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
	font-size: 0.78rem;
	color: ${({ theme }) => theme.colors.textSecondary};
	overflow-x: auto;
	white-space: nowrap;
	line-height: 1.5;

	em {
		font-style: normal;
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const CopyButton = styled.button<{ $copied: boolean }>`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(2)};
	width: 100%;
	justify-content: center;
	padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	border: 1px solid
		${({ $copied, theme }) => ($copied ? theme.colors.success : theme.colors.border)};
	background: ${({ $copied, theme }) =>
		$copied ? 'rgba(76,175,80,0.1)' : theme.colors.bgTertiary};
	color: ${({ $copied, theme }) => ($copied ? theme.colors.success : theme.colors.text)};
	font-size: 0.85rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${({ $copied, theme }) =>
			$copied ? 'rgba(76,175,80,0.15)' : theme.colors.border};
	}
`;


// ─────────────────────────────────────────────────────────────────────────────

export function BadgePreviewPage() {
	const { user } = useAuth();
	const name = user?.name ?? 'username';
	const [copied, setCopied] = useState(false);

	const { data: badgeStats } = useQuery({
		queryKey: ['badgeStats', name],
		queryFn: () => badgeApi.getBadgeStats(name),
		enabled: !!user?.name,
	});

	const markdown = `[![Solta Stats](https://solta.kr/api/badges/${name})](https://solta.kr/profile/${name})`;

	const handleCopy = () => {
		navigator.clipboard.writeText(markdown).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<Page>
			<Container>
				{/* Hero */}
				<Hero>
					<HeroEyebrow>GitHub README Badge</HeroEyebrow>
					<HeroTitle>
						내 풀이 통계를<br />README에 붙여보세요
					</HeroTitle>
					<HeroDesc>
						코드 한 줄로 풀이 수, 총 풀이 시간, 평균 시간, 자력 해결률을
						GitHub 프로필에 실시간으로 공유할 수 있습니다.
					</HeroDesc>
				</Hero>

				{/* Badge preview */}
				<BadgeCard>
					<CardLabel>미리보기</CardLabel>

					<BadgeCanvas>
						<SoltaBadge
							username={name}
							totalMinutes={badgeStats?.totalMinutes}
							avgMinutes={badgeStats?.avgMinutes}
							selfSolveRate={badgeStats?.selfSolveRate}
							tierData={badgeStats?.tierData}
						/>
					</BadgeCanvas>

					<div>
						<CardLabel>마크다운 코드</CardLabel>
					</div>
					<CodeBlock>
						<em>{'[![Solta Stats]'}</em>
						{`(https://solta.kr/api/badges/${name})`}
						<em>{'](https://solta.kr/profile/'}</em>
						{name}
						<em>{')'}</em>
					</CodeBlock>

					<CopyButton $copied={copied} onClick={handleCopy}>
						{copied ? <Check size={14} /> : <Copy size={14} />}
						{copied ? '복사됨!' : '마크다운 복사'}
					</CopyButton>
				</BadgeCard>

				</Container>
		</Page>
	);
}

export default BadgePreviewPage;
