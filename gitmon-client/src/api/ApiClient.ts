import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: "OK" | "ERROR";
}

// 에러 응답 타입 정의
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// API 클라이언트 설정 타입
interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

// 기본 설정
const DEFAULT_CONFIG: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 인증된 클라이언트 설정
const AUTH_CONFIG: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: Partial<ApiClientConfig> = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    
    this.instance = axios.create({
      baseURL: finalConfig.baseURL,
      timeout: finalConfig.timeout,
      headers: finalConfig.headers,
    });

    this.setupInterceptors();
  }

  // 인터셉터 설정
  private setupInterceptors(): void {
    // 요청 인터셉터
    this.instance.interceptors.request.use(
      (config) => {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
        
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
        
        return response;
      },
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(this.formatError(error));
      }
    );
  }

  // 에러 처리
  private handleError(error: AxiosError): void {
    const status = error.response?.status;
    
    switch (status) {
      case 401:
        // 인증 실패 - 로그인 페이지로 리다이렉트
        this.handleUnauthorized();
        break;
      case 403:
        // 권한 없음
        console.error('접근 권한이 없습니다.');
        break;
      case 404:
        // 리소스를 찾을 수 없음
        console.error('요청한 리소스를 찾을 수 없습니다.');
        break;
      case 500:
        // 서버 에러
        console.error('서버 오류가 발생했습니다.');
        break;
      default:
        console.error('알 수 없는 오류가 발생했습니다.');
    }
  }

  // 401 에러 처리 (인증 실패)
  private handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
      // 토큰 제거
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      
      // 로그인 페이지로 리다이렉트
      window.location.href = '/auth/login';
    }
  }

  // 에러 포맷팅
  private formatError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const responseData = error.response?.data as any;
    const message = responseData?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    
    return {
      message,
      status,
      code: error.code,
    };
  }

  // GET 요청
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // POST 요청
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT 요청
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PATCH 요청
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // DELETE 요청
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 파일 업로드 (FormData)
  async upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const uploadConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
      };
      
      const response = await this.instance.post<ApiResponse<T>>(url, formData, uploadConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 기본 URL 변경
  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  // 헤더 설정
  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  // 헤더 제거
  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }
}

// 인증된 클라이언트 클래스
class AuthenticatedApiClient extends ApiClient {
  constructor(token: string) {
    super({
      ...AUTH_CONFIG,
      headers: {
        ...AUTH_CONFIG.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// 클라이언트 팩토리
class ApiClientFactory {
  private static instance: ApiClient | null = null;
  private static authenticatedInstance: AuthenticatedApiClient | null = null;

  // 기본 클라이언트 (인증 없음)
  static getClient(): ApiClient {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  // 인증된 클라이언트
  static getAuthenticatedClient(token: string): AuthenticatedApiClient {
    // 토큰이 변경되면 새로운 인스턴스 생성
    if (!this.authenticatedInstance || this.authenticatedInstance['instance'].defaults.headers.Authorization !== `Bearer ${token}`) {
      this.authenticatedInstance = new AuthenticatedApiClient(token);
    }
    return this.authenticatedInstance;
  }

  // 클라이언트 초기화
  static clearAuthenticatedClient(): void {
    this.authenticatedInstance = null;
  }
}

// 기본 클라이언트 (인증 없음)
export const apiClient = ApiClientFactory.getClient();

// 인증된 클라이언트 생성 함수
export const createAuthenticatedClient = (token: string) => ApiClientFactory.getAuthenticatedClient(token);

// 기본 export
export default apiClient;

// 타입 export
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError }; 