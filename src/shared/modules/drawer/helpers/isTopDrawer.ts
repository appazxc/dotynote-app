export const isTopDrawer = (stack: string[], drawerId: string) => {
  return stack[stack.length - 1] === drawerId;
};