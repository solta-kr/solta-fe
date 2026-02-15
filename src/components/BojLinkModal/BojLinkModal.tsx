import { useState } from "react";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { bojApi } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { authQueryKeys } from "../../api/queries/auth";
import bojExampleImg from "../../assets/boj_example.png";
import * as Styled from "./BojLinkModal.styled";

interface BojLinkModalProps {
  onClose: () => void;
}

type Step = "guide" | "verify";

export function BojLinkModal({ onClose }: BojLinkModalProps) {
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("guide");
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerateCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bojApi.createAuthCode();
      setAuthCode(response.code);
      setStep("verify");
    } catch {
      setError("인증코드 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!authCode) return;
    await navigator.clipboard.writeText(authCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!shareUrl.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      await bojApi.verify(shareUrl.trim());
      setSuccess(true);
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch {
      setError("인증에 실패했습니다. 소스 공유 URL과 인증코드를 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Styled.Overlay onClick={handleOverlayClick}>
      <Styled.Modal>
        <Styled.ModalHeader>
          <Styled.ModalTitle>백준 ID 연결</Styled.ModalTitle>
          <Styled.CloseButton onClick={onClose}>
            <X size={20} />
          </Styled.CloseButton>
        </Styled.ModalHeader>

        <Styled.ModalBody>
          {step === "guide" && (
            <>
              <Styled.StepList>
                <Styled.StepItem>
                  <Styled.StepNumber>1</Styled.StepNumber>
                  <Styled.StepContent>
                    <Styled.StepTitle>인증코드 발급</Styled.StepTitle>
                    <Styled.StepDescription>
                      아래 버튼을 누르면 6자리 인증코드가 생성됩니다.
                    </Styled.StepDescription>
                  </Styled.StepContent>
                </Styled.StepItem>
                <Styled.StepItem>
                  <Styled.StepNumber>2</Styled.StepNumber>
                  <Styled.StepContent>
                    <Styled.StepTitle>백준에 인증코드 제출</Styled.StepTitle>
                    <Styled.StepDescription>
                      아래 문제에서 인증코드를 소스코드로 제출하세요.
                    </Styled.StepDescription>
                    <Styled.ProblemLink
                      href="https://www.acmicpc.net/submit/15802"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={13} />
                      15802번 - 타노스 제출하기
                    </Styled.ProblemLink>
                  </Styled.StepContent>
                </Styled.StepItem>
                <Styled.StepItem>
                  <Styled.StepNumber>3</Styled.StepNumber>
                  <Styled.StepContent>
                    <Styled.StepTitle>소스 공유 URL 입력</Styled.StepTitle>
                    <Styled.StepDescription>
                      제출 후 해당 제출의 소스 코드 페이지에서 &lsquo;공유&rsquo; 버튼을 눌러 나온 URL을 복사하여 붙여넣으면 인증이 완료됩니다.
                    </Styled.StepDescription>
                  </Styled.StepContent>
                </Styled.StepItem>
              </Styled.StepList>

              {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}

              <Styled.SubmitButton onClick={handleGenerateCode} disabled={isLoading} $loading={isLoading}>
                {isLoading ? "생성 중..." : "인증코드 발급받기"}
              </Styled.SubmitButton>
            </>
          )}

          {step === "verify" && (
            <>
              <Styled.InputSection>
                <Styled.InputLabel>인증코드</Styled.InputLabel>
                <Styled.CodeBox>
                  <Styled.CodeValue>{authCode}</Styled.CodeValue>
                  <Styled.CopyButton onClick={handleCopy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "복사됨" : "복사"}
                  </Styled.CopyButton>
                </Styled.CodeBox>
                <Styled.InputDescription>
                  이 코드를{" "}
                  <Styled.InlineLink href="https://www.acmicpc.net/submit/15802" target="_blank" rel="noopener noreferrer">
                    15802번 문제
                  </Styled.InlineLink>
                  에 소스코드로 제출하세요.
                </Styled.InputDescription>
              </Styled.InputSection>

              <Styled.Divider />

              <Styled.InputSection>
                <Styled.InputLabel>소스 공유 URL</Styled.InputLabel>
                <Styled.Input
                  type="text"
                  placeholder="소스 공유 URL을 붙여넣으세요"
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                />
                <Styled.InputDescription>
                  제출 후 &lsquo;공유&rsquo; 버튼을 눌러 나온 URL을 입력하세요.
                </Styled.InputDescription>
                <Styled.UrlExamples>
                  <li>https://www.acmicpc.net/source/share/abc123...</li>
                  <li>http://boj.kr/abc123...</li>
                </Styled.UrlExamples>
                <Styled.ExampleImage src={bojExampleImg} alt="공유 버튼 예시" />
              </Styled.InputSection>

              {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
              {success && (
                <Styled.SuccessMessage>
                  백준 ID가 성공적으로 연결되었습니다!
                </Styled.SuccessMessage>
              )}

              <Styled.SubmitButton
                onClick={handleVerify}
                disabled={isLoading || !shareUrl.trim() || success}
                $loading={isLoading}
              >
                {isLoading ? "인증 중..." : "인증하기"}
              </Styled.SubmitButton>
            </>
          )}
        </Styled.ModalBody>
      </Styled.Modal>
    </Styled.Overlay>
  );
}
