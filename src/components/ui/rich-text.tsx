"use client";

import type { PortableTextBlock, PortableTextSpan } from "@/types/sanity";

type RichTextProps = {
  blocks?: PortableTextBlock[];
  fallback?: string;
  className?: string;
};

function renderSpan(span: PortableTextSpan, index: number) {
  const text = span.text ?? "";
  const textParts = text.split(/\r?\n/);
  const content = textParts.flatMap((part, partIndex) =>
    partIndex === 0 ? part : [<br key={`${index}-br-${partIndex}`} />, part]
  );

  if (span.marks?.includes("strong")) {
    return <strong key={index}>{content}</strong>;
  }
  if (span.marks?.includes("em")) {
    return <em key={index}>{content}</em>;
  }
  return <span key={index}>{content}</span>;
}

function renderInline(children?: PortableTextSpan[]) {
  if (!children) return null;
  return children.map((span, i) => renderSpan(span, i));
}

function textFromBlock(block: PortableTextBlock) {
  return (block.children || []).map((child) => child.text || "").join("");
}

function bulletTextFromBlock(block: PortableTextBlock) {
  const text = textFromBlock(block).trim();
  const match = text.match(/^[•\-*]\s*([\s\S]+)$/);
  return match?.[1]?.replace(/\s*\n\s*/g, " ").trim() || null;
}

function renderBulletSeparatedBlock(block: PortableTextBlock, blockIndex: number) {
  const text = textFromBlock(block);
  if (!text.includes("•")) return null;

  const [introPart, ...itemParts] = text.split("•");
  const intro = introPart.trim();
  const items = itemParts.map((part) => part.trim()).filter(Boolean);

  if (items.length === 0) return null;

  return [
    intro ? <p key={`${block._key ?? blockIndex}-intro`}>{intro}</p> : null,
    <ul key={`${block._key ?? blockIndex}-bullets`}>
      {items.map((item, itemIndex) => (
        <li key={`${block._key ?? blockIndex}-bullet-${itemIndex}`}>{item}</li>
      ))}
    </ul>,
  ].filter(Boolean);
}

export function RichText({ blocks, fallback, className }: RichTextProps) {
  if (!blocks || blocks.length === 0) {
    if (!fallback) return null;
    return (
      <div className={className}>
        <p>{fallback}</p>
      </div>
    );
  }

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.listItem === "bullet" || block.listItem === "number") {
      const listType = block.listItem;
      const items: React.ReactNode[] = [];

      while (i < blocks.length && blocks[i].listItem === listType) {
        items.push(
          <li key={blocks[i]._key ?? i}>{renderInline(blocks[i].children)}</li>
        );
        i++;
      }

      if (listType === "bullet") {
        elements.push(<ul key={`list-${i}`}>{items}</ul>);
      } else {
        elements.push(<ol key={`list-${i}`}>{items}</ol>);
      }
    } else if (bulletTextFromBlock(block)) {
      const items: React.ReactNode[] = [];

      while (i < blocks.length) {
        const bulletText = bulletTextFromBlock(blocks[i]);
        if (!bulletText) break;

        items.push(<li key={blocks[i]._key ?? i}>{bulletText}</li>);
        i++;
      }

      elements.push(<ul key={`bullet-prefix-list-${i}`}>{items}</ul>);
    } else {
      const hasContent = block.children?.some((s) => s.text);
      if (hasContent) {
        const bulletSeparatedBlock = renderBulletSeparatedBlock(block, i);
        if (bulletSeparatedBlock) {
          elements.push(...bulletSeparatedBlock);
        } else {
          elements.push(
            <p key={block._key ?? i}>{renderInline(block.children)}</p>
          );
        }
      }
      i++;
    }
  }

  if (elements.length === 0) return null;

  return <div className={className}>{elements}</div>;
}
