import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

export const SearchHeader = styled.header`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  max-width: 780px;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow: hidden;
  }
`;

// Left: Search + List
export const ListSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing(3)};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(10)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ResultCount = styled.div`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 780px;
  margin: 0 auto;
  width: 100%;
`;

export const ProblemList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const ProblemListInner = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const LoadMoreTrigger = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

// Right: Detail panel
export const DetailSection = styled.div<{ $hasSelection?: boolean }>`
  width: 420px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSecondary};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    display: ${({ $hasSelection }) => ($hasSelection ? 'flex' : 'none')};
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const MobileDetailHeader = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.bgSecondary};
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

export const MobileBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DetailPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(8)};
`;

export const DetailPlaceholderIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const DetailLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;
