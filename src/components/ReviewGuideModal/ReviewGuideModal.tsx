import { X } from "lucide-react";
import * as S from "./ReviewGuideModal.styled";

interface ReviewGuideModalProps {
  onClose: () => void;
}

export function ReviewGuideModal({ onClose }: ReviewGuideModalProps) {
  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>복습 스케줄러 안내</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <X size={16} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.Intro>
            정답을 참고해서 푼 문제는 완전히 내 것이 되지 않을 수 있어요.
            복습 스케줄러가 적절한 시점에 다시 도전하도록 자동으로 알려줘요.
          </S.Intro>

          <S.StepList>
            <S.StepItem>
              <S.StepIcon>📌</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>정답을 참고해서 풀면 자동 예약</S.StepTitle>
                <S.StepDesc>
                  크롬 익스텐션에서 풀이를 저장할 때 "정답 참고"를 선택하면,
                  설정한 간격 이후 날짜로 복습이 자동 예약돼요.
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>

            <S.StepItem>
              <S.StepIcon>📅</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>복습일이 되면 이 탭에서 확인</S.StepTitle>
                <S.StepDesc>
                  복습일에 "오늘" 탭에 문제가 나타나요.
                  복습일이 지나도 풀지 않으면 "밀린 복습"으로 이동해요.
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>

            <S.StepItem>
              <S.StepIcon>🎯</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>BOJ에서 다시 풀고 결과 저장</S.StepTitle>
                <S.StepDesc>
                  "복습하기 ↗" 버튼으로 BOJ에 접속해 다시 풀어보세요.
                  풀고 나서 익스텐션으로 결과를 저장하면 자동으로 처리돼요.
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>

            <S.StepItem>
              <S.StepIcon>✅</S.StepIcon>
              <S.StepContent>
                <S.StepTitle>결과에 따라 다르게 처리</S.StepTitle>
                <S.StepDesc>
                  혼자 풀었다면 → 복습 완료로 처리돼요.{"\n"}
                  또 참고했다면 → 다음 복습 간격이 2배로 늘어나요 (최대 14일).
                </S.StepDesc>
              </S.StepContent>
            </S.StepItem>
          </S.StepList>

          <S.Divider />

          <S.IntervalTable>
            <S.IntervalSectionTitle>복습 간격 규칙</S.IntervalSectionTitle>
            <S.IntervalRow>
              <S.IntervalLabel>처음 정답 참고 풀이</S.IntervalLabel>
              <S.IntervalValue>기본 간격 후 (기본 3일)</S.IntervalValue>
            </S.IntervalRow>
            <S.IntervalRow>
              <S.IntervalLabel>복습에서 또 참고</S.IntervalLabel>
              <S.IntervalValue>이전 간격 × 2 (최대 14일)</S.IntervalValue>
            </S.IntervalRow>
            <S.IntervalRow>
              <S.IntervalLabel>미루기</S.IntervalLabel>
              <S.IntervalValue>3일 연장</S.IntervalValue>
            </S.IntervalRow>
            <S.IntervalRow>
              <S.IntervalLabel>14일 이상 방치</S.IntervalLabel>
              <S.IntervalValue>자동으로 취소됨</S.IntervalValue>
            </S.IntervalRow>
          </S.IntervalTable>

          <S.TipBox>
            <S.TipIcon>💡</S.TipIcon>
            <S.TipText>
              기본 복습 간격은 상단의 <strong>"기본 간격 N일 후"</strong> 버튼으로 언제든지 바꿀 수 있어요.
            </S.TipText>
          </S.TipBox>

          <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
        </S.ModalBody>
      </S.Modal>
    </S.Backdrop>
  );
}
