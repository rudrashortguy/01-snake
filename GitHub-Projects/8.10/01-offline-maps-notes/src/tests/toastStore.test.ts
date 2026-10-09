import { describe, it, expect } from 'vitest';
import { useToastStore } from '../store/toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('adds a toast with default type info', () => {
    const { addToast, getState } = useToastStore();
    addToast('Hello');
    const state = getState();
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].type).toBe('info');
    expect(state.toasts[0].message).toBe('Hello');
  });

  it('adds a success toast', () => {
    const { addToast, getState } = useToastStore();
    addToast('Done', 'success');
    const state = getState();
    expect(state.toasts[0].type).toBe('success');
  });

  it('adds an error toast', () => {
    const { addToast, getState } = useToastStore();
    addToast('Failed', 'error');
    const state = getState();
    expect(state.toasts[0].type).toBe('error');
  });

  it('removes a toast by id', () => {
    const { addToast, getState, removeToast } = useToastStore();
    addToast('Test');
    const state = getState();
    const id = state.toasts[0].id;
    removeToast(id);
    const stateAfter = getState();
    expect(stateAfter.toasts).toHaveLength(0);
  });

  it('does not remove unrelated toasts', () => {
    const { addToast, getState, removeToast } = useToastStore();
    addToast('First');
    addToast('Second');
    const state = getState();
    const id = state.toasts[0].id;
    removeToast(id);
    const stateAfter = getState();
    expect(stateAfter.toasts).toHaveLength(1);
    expect(stateAfter.toasts[0].message).toBe('Second');
  });
});