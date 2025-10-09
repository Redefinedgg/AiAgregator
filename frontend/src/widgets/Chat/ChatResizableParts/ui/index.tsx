"use client";
import { FC, useRef, useEffect } from "react";
import { useChatStore } from "@/shared/stores/chat";

export const ChatResizableParts: FC = () => {
  const { widthOfFirstPart, setWidthOfFirstPart, setWidthOfSecondPart } =
    useChatStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = containerRef.current?.parentElement;
    if (!container) return;

    startXRef.current = e.clientX;
    // Сохраняем текущую ширину В ПИКСЕЛЯХ
    const currentWidthPx = (widthOfFirstPart / 100) * container.offsetWidth;
    startWidthRef.current = currentWidthPx;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const containerWidth = container.offsetWidth;
      const delta = event.clientX - startXRef.current;
      const newWidthPx = startWidthRef.current + delta;

      // Конвертируем в проценты
      const newWidthPercent = (newWidthPx / containerWidth) * 100;

      // Ограничения: минимум 25%, максимум 75%
      const clampedWidth = Math.max(25, Math.min(75, newWidthPercent));

      setWidthOfFirstPart(clampedWidth);
      setWidthOfSecondPart(100 - clampedWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="w-[40px] min-h-[calc(100vh-315px)] bg-gray-700 hover:bg-purple-500 cursor-col-resize transition-colors duration-200 flex-shrink-0 flex items-center justify-center group relative"
      onMouseDown={handleMouseDown}
      title="Перетащите для изменения размера"
    >
      <div className="absolute inset-y-0 left-0 w-[2px] bg-gray-500 group-hover:bg-purple-300"></div>
      <svg
        className="w-4 h-4 text-gray-400 group-hover:text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="12" r="1.5" fill="currentColor"></circle>
        <circle cx="15" cy="12" r="1.5" fill="currentColor"></circle>
        <circle cx="9" cy="6" r="1.5" fill="currentColor"></circle>
        <circle cx="15" cy="6" r="1.5" fill="currentColor"></circle>
        <circle cx="9" cy="18" r="1.5" fill="currentColor"></circle>
        <circle cx="15" cy="18" r="1.5" fill="currentColor"></circle>
      </svg>
      <div className="absolute inset-y-0 right-0 w-[2px] bg-gray-500 group-hover:bg-purple-300"></div>
    </div>
  );
};

export default ChatResizableParts;
