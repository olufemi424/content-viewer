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
Lead with the viewer and the use-case.
Formula: "If you want to <result>, this <tool/update> is worth watching."

## Why this matters
State the practical workflow or outcome this unlocks in 2-4 sentences.

## How it works
Briefly explain the mechanism in plain English.
Keep this tight and creator-friendly.

## Proof or use-case
Show one concrete example workflow the viewer could actually try.
If needed, add one caution or limitation.

## CTA
Ask for the comment using "${ctaKeyword}", but tie it to a useful next step.
Example: "Comment \`${ctaKeyword}\` and I'll send the exact workflow."

## Final record-ready script
Write the full talking-head script here in a natural spoken voice.

## Caption
Write the final caption here.
Open with the practical payoff, then reinforce the use-case.

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
