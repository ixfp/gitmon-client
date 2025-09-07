import { apiClient, createAuthenticatedClient, ApiResponse } from './ApiClient';
import { Post, PostMeta } from '@lib/types';
import { fetchPost } from '@lib/github';
import { replaceId } from '@lib/utils';

// Member 관련 타입 정의
export interface Member {
  id: string;
  githubUsername: string;
  repoName: string;
  email?: string;
  avatar?: string;
}

// Repository 설정 타입
export interface RepositoryConfig {
  name: string;
}

// Posting 관련 타입 정의
export interface PostingData {
  id: number;
  title: string;
  githubDownloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostingData {
  title: string;
  content: Blob;
}

export interface UpdatePostingData extends CreatePostingData {
  id: string;
}

// GitHub 관련 타입 정의
export interface GitHubPost extends Post {
  id: string;
  error?: boolean;
}

// Member API 서비스
export class MemberService {
  // 사용자 정보 조회
  static async getMember(token: string): Promise<ApiResponse<Member>> {
    const client = createAuthenticatedClient(token);
    return client.get<Member>('/api/v1/member');
  }

  // 레포지토리 설정
  static async setRepository(token: string, repoName: string): Promise<ApiResponse<any>> {
    const client = createAuthenticatedClient(token);
    return client.post<any>('/api/v1/member/repo', { name: repoName });
  }
}

// Posting API 서비스
export class PostingService {
  // 사용자의 모든 게시글 조회
  static async getUserPosts(token: string, userId: string): Promise<ApiResponse<PostingData[]>> {
    const client = createAuthenticatedClient(token);
    return client.get<PostingData[]>(`/api/v1/posting/${userId}`);
  }

  // GitHub 사용자의 게시글 조회
  static async getGitHubUserPosts(token: string, githubId: string): Promise<ApiResponse<PostingData[]>> {
    const client = createAuthenticatedClient(token);
    return client.get<PostingData[]>(`/api/v1/posting/github/${replaceId(githubId)}`);
  }

  // 특정 게시글 조회
  static async getGitHubPost(token: string, githubId: string, slug: string): Promise<ApiResponse<PostingData>> {
    const client = createAuthenticatedClient(token);
    return client.get<PostingData>(`/api/v1/posting/github/${replaceId(githubId)}/${slug}`);
  }

  // 게시글 생성
  static async createPost(token: string, title: string, content: Blob): Promise<ApiResponse<any>> {
    const client = createAuthenticatedClient(token);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content, title);

    return client.post<any>('/api/v1/posting', formData);
  }

  // 게시글 수정
  static async updatePost(token: string, postId: string, title: string, content: Blob): Promise<ApiResponse<any>> {
    const client = createAuthenticatedClient(token);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content, title);
    formData.append('id', postId);

    return client.put<any>('/api/v1/posting', formData);
  }

  // 게시글 삭제
  static async deletePost(token: string, postId: string): Promise<ApiResponse<void>> {
    const client = createAuthenticatedClient(token);
    return client.delete<void>(`/api/v1/posting/${postId}`);
  }
}

// GitHub API 서비스
export class GitHubService {
  // GitHub에서 마크다운 파일 가져오기
  static async fetchPostFromGitHub(downloadUrl: string): Promise<Omit<Post, 'id'>> {
    return fetchPost(downloadUrl);
  }

  // 여러 게시글을 GitHub에서 가져오기
  static async fetchPostsFromGitHub(posts: PostingData[]): Promise<GitHubPost[]> {
    const postPromises = posts.map(async (post) => {
      try {
        const githubPost = await fetchPost(post.githubDownloadUrl);
        return { ...githubPost, id: post.id.toString() };
      } catch (error) {
        console.error(`Failed to fetch post ${post.id}:`, error);
        // 에러 시 기본 Post 구조로 반환
        return {
          id: post.id.toString(),
          title: post.title,
          content: '',
          author: '',
          repo: '',
          slug: '',
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          excerpt: '',
          coverImage: '',
          error: true,
        };
      }
    });

    return Promise.all(postPromises);
  }
}

// Auth API 서비스
export class AuthService {
  // 로그인
  static async login(code: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>('/api/login', { code });
  }

  // 로그아웃
  static async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/api/logout');
  }
}

// 통합 서비스 (복잡한 비즈니스 로직)
export class BlogService {
  // 사용자의 블로그 게시글들을 가져오기 (GitHub 포함)
  static async getUserBlogPosts(token: string, userId: string): Promise<GitHubPost[]> {
    try {
      // 1. 서버에서 게시글 목록 가져오기
      const response = await PostingService.getUserPosts(token, userId);

      if (response.status === "ERROR" || !response.data || response.data.length === 0) {
        return [];
      }

      // 2. GitHub에서 실제 마크다운 내용 가져오기
      return await GitHubService.fetchPostsFromGitHub(response.data);
    } catch (error) {
      console.error('Failed to fetch user blog posts:', error);
      throw error;
    }
  }

  // GitHub 사용자의 블로그 게시글들을 가져오기
  static async getGitHubUserBlogPosts(token: string, githubId: string): Promise<GitHubPost[]> {
    try {
      // 1. 서버에서 게시글 목록 가져오기
      const response = await PostingService.getGitHubUserPosts(token, githubId);
      if (response.status === "ERROR" || !response.data || response.data.length === 0) {
        return [];
      }

      // 2. GitHub에서 실제 마크다운 내용 가져오기
      return await GitHubService.fetchPostsFromGitHub(response.data);
    } catch (error) {
      console.error('Failed to fetch GitHub user blog posts:', error);
      throw error;
    }
  }

  // 특정 게시글 상세 정보 가져오기
  static async getBlogPost(token: string, githubId: string, slug: string): Promise<GitHubPost | null> {
    try {
      // 1. 서버에서 게시글 메타데이터 가져오기
      const response = await PostingService.getGitHubPost(token, githubId, slug);
      if (response.status === "ERROR" || !response.data?.githubDownloadUrl) {
        return null;
      }

      // 2. GitHub에서 실제 마크다운 내용 가져오기
      const githubPost = await GitHubService.fetchPostFromGitHub(response.data.githubDownloadUrl);
      
      return {
        ...githubPost,
        id: response.data.id.toString(),
      };
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      throw error;
    }
  }

  // 게시글 생성 (메타데이터 포함)
  static async createBlogPost(
    token: string, 
    title: string, 
    content: string, 
    metadata: PostMeta
  ): Promise<ApiResponse<any>> {
    try {
      // 1. 사용자 정보 가져오기
      const memberResponse = await MemberService.getMember(token);
      
      if (memberResponse.status === "ERROR" || !memberResponse.data) {
        throw new Error('사용자 정보를 가져올 수 없습니다.');
      }

      const { githubUsername, repoName } = memberResponse.data;

      if (!githubUsername || !repoName) {
        throw new Error('레포지토리 정보가 없습니다. 먼저 레포지토리를 설정해주세요.');
      }

      // 2. 마크다운 파일 생성
      const matter = await import('gray-matter');
      const markdown = matter.default.stringify(content, metadata);
      const blob = new Blob([markdown], { type: 'text/markdown' });

      // 3. 게시글 생성
      return await PostingService.createPost(token, title, blob);
    } catch (error) {
      console.error('Failed to create blog post:', error);
      throw error;
    }
  }

  // 게시글 수정
  static async updateBlogPost(
    token: string,
    postId: string,
    title: string,
    content: string,
    metadata: PostMeta
  ): Promise<ApiResponse<any>> {
    try {
      // 1. 사용자 정보 가져오기
      const memberResponse = await MemberService.getMember(token);
      
      if (memberResponse.status === "ERROR" || !memberResponse.data) {
        throw new Error('사용자 정보를 가져올 수 없습니다.');
      }

      const { githubUsername, repoName } = memberResponse.data;

      if (!githubUsername || !repoName) {
        throw new Error('레포지토리 정보가 없습니다. 먼저 레포지토리를 설정해주세요.');
      }

      // 2. 마크다운 파일 생성
      const matter = await import('gray-matter');
      const markdown = matter.default.stringify(content, metadata);
      const blob = new Blob([markdown], { type: 'text/markdown' });

      // 3. 게시글 수정
      return await PostingService.updatePost(token, postId, title, blob);
    } catch (error) {
      console.error('Failed to update blog post:', error);
      throw error;
    }
  }
}
