import { describe, it, expect } from 'vitest';

describe('Shared Package', () => {
  it('should be a valid test', () => {
    // Simple test to ensure the package works
    expect(true).toBe(true);
  });

  it('should have basic functionality', () => {
    // Test basic JavaScript functionality
    const result = 2 + 2;
    expect(result).toBe(4);
  });
});
