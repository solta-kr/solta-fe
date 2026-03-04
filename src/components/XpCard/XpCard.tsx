import { Zap } from 'lucide-react';
import type { XpSummaryResponse } from '../../types/api';
import { getLevelStyle } from '../../constants/levelColors';
import * as Styled from './XpCard.styled';

type Props = {
  xp: XpSummaryResponse;
};

export function XpCard({ xp }: Props) {
  const remaining = xp.nextLevelRequiredXp - xp.currentLevelXp;
  const style = getLevelStyle(xp.level);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title $color={style.color}>
          <Zap size={12} />
          {xp.title}
        </Styled.Title>
        <Styled.TotalXp>{xp.totalXp.toLocaleString()} XP</Styled.TotalXp>
      </Styled.Header>

      {xp.level < 100 && (
        <>
          <Styled.ProgressBarTrack>
            <Styled.ProgressBarFill $percent={xp.progressPercent} $progressBar={style.progressBar} />
          </Styled.ProgressBarTrack>
          <Styled.ProgressLabel>
            <span>{xp.currentLevelXp.toLocaleString()} / {xp.nextLevelRequiredXp.toLocaleString()} XP</span>
            <span>다음 레벨까지 {remaining.toLocaleString()} XP</span>
          </Styled.ProgressLabel>
        </>
      )}
    </Styled.Container>
  );
}
