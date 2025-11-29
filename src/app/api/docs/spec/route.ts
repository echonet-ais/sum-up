import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger/config';

/**
 * @swagger
 * /api/docs/spec:
 *   get:
 *     summary: OpenAPI 스펙 조회
 *     description: Swagger UI에서 사용할 OpenAPI 3.0 스펙을 반환합니다.
 *     tags:
 *       - Documentation
 *     security: []
 *     responses:
 *       200:
 *         description: OpenAPI 스펙
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  return NextResponse.json(swaggerSpec);
}

