// @ts-nocheck

import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const plain = defineStyle({
  border: "none", // change the appearance of the border
});

export const Textarea = defineStyleConfig({
  variants: { plain },
});
