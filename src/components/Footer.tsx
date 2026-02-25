import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(8)};
`;

const FooterInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: ${({ theme }) => theme.spacing(16)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, auto);
    gap: ${({ theme }) => theme.spacing(10)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(8)};
  }
`;

const ColumnTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(4)} 0;
`;

const ColumnList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

const ColumnLink = styled(Link)`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ExternalLink = styled.a`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const BottomSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
  }
`;

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const BrandText = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CopyrightText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        <TopSection>
          <div>
            <ColumnTitle>서비스</ColumnTitle>
            <ColumnList>
              <li><ColumnLink to="/problems">문제 검색</ColumnLink></li>
            </ColumnList>
          </div>
          <div>
            <ColumnTitle>정보</ColumnTitle>
            <ColumnList>
              <li><ColumnLink to="/privacy">개인정보처리방침</ColumnLink></li>
              <li>
                <ExternalLink href="mailto:solta3413@gmail.com">문의하기</ExternalLink>
              </li>
            </ColumnList>
          </div>
          <div>
            <ColumnTitle>도구</ColumnTitle>
            <ColumnList>
              <li>
                <ExternalLink href="https://chromewebstore.google.com/detail/solta/ncfnchkjdgkjflhpolopadiapophnhfp" target="_blank" rel="noopener noreferrer">
                  크롬 익스텐션
                </ExternalLink>
              </li>
            </ColumnList>
          </div>
        </TopSection>

        <Divider />

        <BottomSection>
          <BottomLeft>
            <BrandText>Solta</BrandText>
            <CopyrightText>&copy; 2025 Solta. All rights reserved.</CopyrightText>
          </BottomLeft>

          <SocialLinks>
            <SocialLink href="mailto:solta3413@gmail.com" aria-label="Email">
              <Mail size={20} />
            </SocialLink>
          </SocialLinks>
        </BottomSection>
      </FooterInner>
    </FooterContainer>
  );
}

export default Footer;
