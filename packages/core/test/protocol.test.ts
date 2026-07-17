/**
 * Behavior-surface pin for the public, role-neutral Protocol entry point.
 */
import { describe, expect, test } from 'vitest';
import * as z from 'zod/v4';

import type { BaseContext, JSONRPCMessage } from '../src/protocol';
import { InMemoryTransport, Protocol } from '../src/protocol';

class TestProtocol extends Protocol<BaseContext> {
    protected buildContext(ctx: BaseContext): BaseContext {
        return ctx;
    }

    protected assertCapabilityForMethod(): void {}
    protected assertNotificationCapability(): void {}
    protected assertRequestHandlerCapability(): void {}
}

describe('@modelcontextprotocol/core/protocol', () => {
    test('a Protocol subclass exchanges custom methods with no initialize on the wire', async () => {
        const [transportA, transportB] = InMemoryTransport.createLinkedPair();
        const sentByA: string[] = [];
        const sentByB: string[] = [];

        const captureSends = (transport: InMemoryTransport, into: string[]) => {
            const originalSend = transport.send.bind(transport);
            transport.send = async (message: JSONRPCMessage, options) => {
                if ('method' in message) into.push(message.method);
                return originalSend(message, options);
            };
        };

        captureSends(transportA, sentByA);
        captureSends(transportB, sentByB);

        const a = new TestProtocol();
        const b = new TestProtocol();
        b.setRequestHandler('acme/echo', { params: z.object({ value: z.string() }) }, params => ({
            echoed: params.value
        }));

        await b.connect(transportB);
        await a.connect(transportA);

        await expect(a.request({ method: 'acme/echo', params: { value: 'hi' } }, z.object({ echoed: z.string() }))).resolves.toEqual({
            echoed: 'hi'
        });
        expect(sentByA).toEqual(['acme/echo']);
        expect(sentByB).toEqual([]);
    });
});
