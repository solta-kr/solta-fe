import { X } from "lucide-react";
import { getLevelStyle } from "../../constants/levelColors";
import * as S from "./XpGuideModal.styled";

interface XpGuideModalProps {
  onClose: () => void;
}

const LEVEL_TIERS = [
  { label: "코딩 새싹", range: "Lv 1 ~ 10", level: 5 },
  { label: "알고리즘 탐험가", range: "Lv 11 ~ 30", level: 20 },
  { label: "문제 해결사", range: "Lv 31 ~ 60", level: 45 },
  { label: "알고리즘 장인", range: "Lv 61 ~ 90", level: 75 },
  { label: "전설", range: "Lv 91 ~ 100", level: 95 },
  { label: "전설 ★", range: "Lv 100", level: 100 },
];

export function XpGuideModal({ onClose }: XpGuideModalProps) {
  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>경험치 & 레벨 안내</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <X size={16} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.Intro>
            문제를 풀면 경험치(XP)가 쌓여요. 오래 고민할수록, 어려운 문제일수록,
            스스로 풀수록 더 많은 XP를 받아요.
          </S.Intro>

          <S.StepList>
            <S.StepItem>
              <S.StepIcon>🧠</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>스스로 풀기</S.StepTitle>
                <S.StepDesc>
                  풀이 시간 × 티어 가중치 × 1.5 XP를 획득해요.
                  오래 고민한 만큼 더 많이 받아요 (최대 240분까지 적용).
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>

            <S.StepItem>
              <S.StepIcon>📖</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>답지 참고</S.StepTitle>
                <S.StepDesc>
                  티어 가중치 × 15 XP를 고정으로 획득해요.
                  풀이 시간과 무관하게 일정한 XP가 지급돼요.
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>

            <S.StepItem>
              <S.StepIcon>🔁</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>복습 풀이</S.StepTitle>
                <S.StepDesc>
                  복습 스케줄에 등록된 문제를 다시 풀면 보너스가 붙어요.<br />
                  스스로 풀었다면: 풀이 시간 × 티어 가중치 × 2.0 XP<br />
                  답지를 참고했다면: 티어 가중치 × 18 XP
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>
          </S.StepList>

          <S.Divider />

          <S.SectionTitle>스트릭 보너스</S.SectionTitle>
          <S.Table>
            <S.TableRow>
              <S.TableLabel>7일 연속</S.TableLabel>
              <S.TableValue>× 1.10</S.TableValue>
            </S.TableRow>
            <S.TableRow>
              <S.TableLabel>14일 연속</S.TableLabel>
              <S.TableValue>× 1.20</S.TableValue>
            </S.TableRow>
            <S.TableRow>
              <S.TableLabel>30일 연속</S.TableLabel>
              <S.TableValue>× 1.30 (최대)</S.TableValue>
            </S.TableRow>
          </S.Table>

          <S.Divider />

          <S.SectionTitle>레벨 & 칭호</S.SectionTitle>
          <S.LevelList>
            {LEVEL_TIERS.map(({ label, range, level }) => {
              const style = getLevelStyle(level);
              return (
                <S.LevelRow key={label} $background={style.background} $textColor={style.textColor}>
                  <S.LevelBadge
                    $background={style.background}
                    $textColor={style.textColor}
                    $glow={style.glow}
                  >
                    {label}
                  </S.LevelBadge>
                  <S.LevelRange>{range}</S.LevelRange>
                </S.LevelRow>
              );
            })}
          </S.LevelList>

          <S.TipBox>
            <S.TipIcon>💡</S.TipIcon>
            <S.TipText>
              <strong>Unrated</strong> 문제는 XP가 지급되지 않아요.
              어려운 문제에 오래 도전하는 습관이 빠른 성장으로 이어져요!
            </S.TipText>
          </S.TipBox>

          <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
        </S.ModalBody>
      </S.Modal>
    </S.Backdrop>
  );
}
