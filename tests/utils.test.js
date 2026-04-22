// tests/utils.test.js

import { describe, it, expect } from 'vitest';
import { capitalize, escapeHtml, formatMessage } from '../src/utils.js';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('escapeHtml', () => {
  it('should escape HTML characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(escapeHtml('& < > " \'')).toBe('&amp; &lt; &gt; &quot; &#x27;');
  });

  it('should handle normal text', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world');
  });
});

describe('formatMessage', () => {
  it('should escape HTML and replace newlines with <br>', () => {
    expect(formatMessage('Hello\nWorld<script>')).toBe('Hello<br>World&lt;script&gt;');
  });

  it('should handle text without newlines', () => {
    expect(formatMessage('Hello & world')).toBe('Hello &amp; world');
  });
});