'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Swagger UI는 클라이언트 사이드에서만 동작
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  const [spec, setSpec] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // OpenAPI 스펙 로드
    fetch('/api/docs/spec')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load API spec: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSpec(data))
      .catch((err) => {
        console.error('Failed to load API spec:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface)]">
        <div className="text-center">
          <p className="text-[var(--text-strong)] text-lg mb-2">API 문서를 불러올 수 없습니다</p>
          <p className="text-[var(--text-muted)]">{error}</p>
        </div>
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface)]">
        <p className="text-[var(--text-muted)]">API 문서를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI 
        spec={spec}
        deepLinking={true}
        displayOperationId={false}
        defaultModelsExpandDepth={1}
        defaultModelExpandDepth={1}
      />
    </div>
  );
}

