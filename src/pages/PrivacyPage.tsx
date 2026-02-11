import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  background: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(6)};
`;

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const UpdatedAt = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing(10)} 0;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
`;

const Paragraph = styled.p`
  font-size: 0.925rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
`;

const List = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
`;

const ListItem = styled.li`
  font-size: 0.925rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-size: 0.875rem;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export function PrivacyPage() {
  return (
    <Container>
      <Inner>
        <Title>개인정보처리방침</Title>
        <UpdatedAt>시행일: 2025년 2월 11일</UpdatedAt>

        <Section>
          <SectionTitle>1. 개인정보의 수집 및 이용 목적</SectionTitle>
          <Paragraph>
            Solta(이하 "서비스")는 백준(BOJ) 문제 풀이 시간 측정 및 기록 관리를 위해
            최소한의 개인정보만을 수집하며, 다음의 목적으로 이용합니다.
          </Paragraph>
          <List>
            <ListItem>회원 식별 및 인증 (GitHub OAuth 로그인)</ListItem>
            <ListItem>풀이 기록 저장 및 통계 제공</ListItem>
            <ListItem>서비스 이용 환경 유지 (로그인 상태 유지)</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. 수집하는 개인정보 항목</SectionTitle>
          <Table>
            <thead>
              <tr>
                <Th>수집 항목</Th>
                <Th>수집 방법</Th>
                <Th>이용 목적</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>GitHub 사용자 이름, 프로필 이미지</Td>
                <Td>GitHub OAuth 인증 시 자동 수집</Td>
                <Td>회원 식별 및 프로필 표시</Td>
              </tr>
              <tr>
                <Td>인증 토큰 (Access Token)</Td>
                <Td>로그인 시 서버에서 발급</Td>
                <Td>로그인 상태 유지 및 API 인증</Td>
              </tr>
              <tr>
                <Td>백준 문제 번호, 제출 결과</Td>
                <Td>백준 웹사이트 페이지에서 읽기</Td>
                <Td>풀이 기록 저장 및 정답 여부 감지</Td>
              </tr>
              <tr>
                <Td>풀이 시간, 풀이 방식</Td>
                <Td>사용자가 직접 입력/선택</Td>
                <Td>풀이 기록 저장 및 통계 분석</Td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section>
          <SectionTitle>3. 개인정보의 보유 및 이용 기간</SectionTitle>
          <Paragraph>
            수집된 개인정보는 서비스 이용 기간 동안 보유하며,
            회원 탈퇴 시 지체 없이 파기합니다.
            브라우저에 저장되는 데이터(인증 토큰, 타이머 상태)는
            로그아웃 시 또는 확장 프로그램 삭제 시 자동으로 삭제됩니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
          <Paragraph>
            서비스는 수집한 개인정보를 제3자에게 제공하지 않습니다.
            다만, 서비스 운영을 위해 다음 외부 서비스와 통신합니다.
          </Paragraph>
          <List>
            <ListItem>
              <strong>GitHub</strong> — OAuth 인증을 위해 GitHub 계정 정보를 연동합니다.
            </ListItem>
            <ListItem>
              <strong>Solved.ac</strong> — 문제의 난이도(티어) 및 알고리즘 태그 정보를 조회합니다.
              개인정보는 전송되지 않습니다.
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. 개인정보의 파기 절차 및 방법</SectionTitle>
          <List>
            <ListItem>
              <strong>서버 데이터:</strong> 회원 탈퇴 요청 시 관련 데이터를 지체 없이 파기합니다.
            </ListItem>
            <ListItem>
              <strong>브라우저 로컬 데이터:</strong> 로그아웃 또는 확장 프로그램 삭제 시 자동 삭제됩니다.
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. 이용자의 권리</SectionTitle>
          <Paragraph>
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있으며,
            로그아웃 및 회원 탈퇴를 통해 서비스 이용을 중단할 수 있습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. 크롬 확장 프로그램의 데이터 처리</SectionTitle>
          <Paragraph>
            Solta 크롬 확장 프로그램은 다음과 같이 데이터를 처리합니다.
          </Paragraph>
          <List>
            <ListItem>
              <strong>chrome.storage.local:</strong> 인증 토큰, 사용자 정보, 타이머 상태를
              브라우저 로컬 저장소에 저장합니다. 이 데이터는 사용자의 기기에만 존재합니다.
            </ListItem>
            <ListItem>
              <strong>chrome.identity:</strong> GitHub OAuth 로그인 흐름을 처리하기 위해 사용합니다.
            </ListItem>
            <ListItem>
              <strong>콘텐츠 스크립트:</strong> acmicpc.net 문제 페이지와 채점 현황 페이지에서만
              동작하며, 문제 번호와 제출 결과만 읽습니다. 그 외 웹사이트에서는 동작하지 않습니다.
            </ListItem>
          </List>
          <Paragraph>
            확장 프로그램은 원격 코드를 실행하지 않으며, 모든 코드는 확장 프로그램 패키지 내에
            포함되어 있습니다.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. 개인정보 보호책임자</SectionTitle>
          <Paragraph>
            개인정보 처리에 관한 문의는 아래 연락처로 문의해 주시기 바랍니다.
          </Paragraph>
          <List>
            <ListItem>이메일: solta3413@gmail.com</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>9. 개인정보처리방침의 변경</SectionTitle>
          <Paragraph>
            본 개인정보처리방침은 법률이나 서비스 변경에 따라 수정될 수 있으며,
            변경 시 서비스 내 공지를 통해 안내합니다.
          </Paragraph>
        </Section>
      </Inner>
    </Container>
  );
}

export default PrivacyPage;
