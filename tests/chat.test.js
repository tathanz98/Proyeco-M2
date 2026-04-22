// tests/chat.test.js

import { describe, it, expect, vi } from 'vitest';
import { getMessages, clearMessages } from '../src/chat.js';

// Mock fetch
global.fetch = vi.fn();

describe('chat functions', () => {
  it('should initialize messages as empty array', () => {
    clearMessages();
    expect(getMessages()).toEqual([]);
  });

  it('should clear messages', () => {
    // Assuming init adds some messages, but since it's DOM dependent, mock
    clearMessages();
    expect(getMessages().length).toBe(0);
  });
});

// Note: More comprehensive tests would require mocking DOM elements,
// but for this demo, we keep it simple.