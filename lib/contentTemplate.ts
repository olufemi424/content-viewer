import { Metadata } from '@/types';

export function buildTalkingHeadTemplate(meta: Metadata): string {
  const title = meta.title || 'Untitled Post';
  const ctaKeyword = meta.cta_keyword || 'COMMENT';

  return `# ${title}

## Post Details
- Platform: ${meta.platform || 'facebook'}
- Content Type: ${meta.content_type || 'talking_head'}
- Pillar: ${meta.pillar || 'authority'}
- Goal: ${meta.goal || 'engagement'}
- Stage: ${meta.stage || 'idea'}
- Publish Date: ${meta.publish_date || ''}
- CTA Keyword: ${ctaKeyword}

## Hook
One bold sentence that stops the scroll.

## 3 Key Points
1. Point one
2. Point two
3. Point three

## CTA
Ask the audience to comment: "${ctaKeyword}".

## Caption
Write the final caption here.

## Recording Notes
- Camera framing:
- Delivery cue:
- B-roll (optional):

## Post-Publish Review
- Actual comments:
- Actual saves:
- Actual profile visits:
- Lesson learned:
`;
}
