export interface LevelStyle {
  /** 단색 레벨의 메인 색상 */
  color: string;
  /** 배지 배경 (그라디언트 포함) */
  background: string;
  /** 프로그레스 바 배경 */
  progressBar: string;
  /** 텍스트 색상 (배지 위) */
  textColor: string;
  /** 발광 효과 (고레벨) */
  glow?: string;
}

export function getLevelStyle(level: number): LevelStyle {
  if (level >= 100) {
    // 전설 — 골드 그라디언트
    return {
      color: '#F59E0B',
      background: 'linear-gradient(135deg, #F59E0B, #FBBF24, #FDE68A)',
      progressBar: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
      textColor: '#1a1200',
      glow: '0 0 12px rgba(245,158,11,0.6)',
    };
  }
  if (level >= 91) {
    // 그랜드마스터 — 주황-빨강 그라디언트
    return {
      color: '#F97316',
      background: 'linear-gradient(135deg, #F97316, #EF4444)',
      progressBar: 'linear-gradient(90deg, #F97316, #EF4444)',
      textColor: '#fff',
      glow: '0 0 10px rgba(249,115,22,0.5)',
    };
  }
  if (level >= 61) {
    // 마스터 — 바이올렛
    return {
      color: '#A78BFA',
      background: 'rgba(167,139,250,0.15)',
      progressBar: 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
      textColor: '#A78BFA',
      glow: '0 0 8px rgba(167,139,250,0.4)',
    };
  }
  if (level >= 31) {
    // 숙련자 — 스카이블루
    return {
      color: '#38BDF8',
      background: 'rgba(56,189,248,0.12)',
      progressBar: 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
      textColor: '#38BDF8',
    };
  }
  if (level >= 11) {
    // 도전자 — 에메랄드 그린
    return {
      color: '#34D399',
      background: 'rgba(52,211,153,0.12)',
      progressBar: 'linear-gradient(90deg, #10B981, #34D399)',
      textColor: '#34D399',
    };
  }
  // 견습생 — 슬레이트
  return {
    color: '#94A3B8',
    background: 'rgba(148,163,184,0.12)',
    progressBar: '#94A3B8',
    textColor: '#94A3B8',
  };
}
