import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Maintain response format consistency by wrapping all outgoing responses
 * in a consistent structure: { data: ... }
 */
export default class ResponseInterceptorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Call next middleware or request handler
     */
    await next();

    const { response } = ctx;

    // Get the response body
    const responseBody = response.getBody();

    response.json({ data: responseBody });
  }
}
