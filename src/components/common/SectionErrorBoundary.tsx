"use client";

import React, { Component, ReactNode } from "react";
import { ErrorState } from "./ErrorState";

export interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * 섹션별 에러 바운더리
 * 특정 섹션의 에러가 전체 페이지를 망가뜨리지 않도록 보호
 */
export class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 로깅
    console.error(`SectionErrorBoundary (${this.props.sectionName || "Unknown"}) caught an error:`, error, errorInfo);
    
    // 커스텀 에러 핸들러 호출
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <ErrorState
            title={this.props.sectionName ? `${this.props.sectionName} 섹션 오류` : "섹션 오류"}
            message={this.state.error?.message || "이 섹션에서 오류가 발생했습니다"}
            onRetry={this.handleReset}
            retryLabel="다시 시도"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

