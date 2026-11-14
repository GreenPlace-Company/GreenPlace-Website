"use client";

import { useCart } from "@/components/cart-provider";
import { useEffect } from "react";

export function ClearCart({ sessionId }: { sessionId?: string }) {
  const { clear } = useCart();

  useEffect(() => {
    if (!sessionId) return;
    clear();
  }, [clear, sessionId]);

  return null;
}
