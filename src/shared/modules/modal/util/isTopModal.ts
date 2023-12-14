export const isTopModal = (stack: string[], modalId: string) => {
  return stack[stack.length - 1] === modalId;
};