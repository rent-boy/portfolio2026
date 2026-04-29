# Content Blocks Guide - Simplified

## Overview
Your project pages use a **simple 3-block system** that lets you arrange content in any order. Blocks flow **left to right, top to bottom** in a 2-column layout!

## Available Content Blocks

### 1. 🖼️ Image Block
**Use for:** Single images with optional captions

**Fields:**
- Image (upload image file) - **Required**
- Alt text (for accessibility)
- Caption (optional)
- Width:
  - **Full Width** - Image spans 2 columns, forces new row
  - **Single Width** - Image takes 1 column

**Aspect Ratio:** 1:1 (square)

---

### 2. 🎥 Video Block
**Use for:** Video content (autoplay + loop enabled by default)

**Fields:**
- Video File (MP4, MOV, etc.) - **Required**
- Caption (optional)
- Width:
  - **Full Width** - Video spans 2 columns, forces new row
  - **Single Width** - Video takes 1 column

**Aspect Ratio:** 1:1 (square)

---

### 3. 📝 Text Block
**Use for:** Flexible text content with multiple heading levels

**Fields (ALL OPTIONAL - use any combination):**
- Title (large bold heading)
- Subtitle (medium semibold heading)
- Heading 1 (first level heading)
- Heading 2 (second level heading)
- Paragraph (main text content)

**Note:** You can use any combination of these fields. For example:
- Just a paragraph
- Title + paragraph
- Subtitle + Heading 1 + paragraph
- Any mix you need!

**Width:** Always single width (1 column)

---

## How Content Flows

### Left to Right, Top to Bottom

Content blocks fill the 2-column grid from **left to right**, then move to the next row:

```
[Title - Left]        [Empty - Right]      ← First row (fixed)
[Block 1]             [Block 2]            ← Second row
[Block 3]             [Block 4]            ← Third row
```

### Full Width Blocks Force New Rows

When you add a **Full Width** image or video, it starts a new row:

```
[Title - Left]        [Empty - Right]
[Block 1]             [Block 2]
[Full Width Image - spans both columns]     ← Starts new row
[Block 3]             [Block 4]            ← Continues after
```

---

## How to Use in Sanity CMS

### Step 1: Open a Project
1. Go to Sanity Studio: http://localhost:3333
2. Navigate to "Multi-page/Work"
3. Select an existing project or create a new one

### Step 2: Add Content Blocks
1. Scroll to **"Project Content Blocks"** section
2. Click **"Add item"**
3. Choose the block type:
   - **Image Block** 🖼️
   - **Video Block** 🎥
   - **Text Block** 📝

### Step 3: Fill in the Block

**For Image Block:**
- Upload image ✅ Required
- Add caption (optional)
- Choose width: Full Width or Single Width

**For Video Block:**
- Upload video ✅ Required
- Add caption (optional)
- Choose width: Full Width or Single Width

**For Text Block:**
- Fill in any combination of:
  - Title
  - Subtitle
  - Heading 1
  - Heading 2
  - Paragraph
- Leave empty fields blank

### Step 4: Reorder Blocks
- **Drag and drop** blocks to change their order
- Blocks will flow left to right, top to bottom
- Full width blocks will start a new row

### Step 5: Publish
- Click **"Publish"** to save
- Changes appear immediately on the website!

---

## Layout Examples

### Example 1: Basic Layout
```
[Cover Image - Full Width]

[Project Title - Left]    [Empty]

[Text Block 1]            [Image Block 1]
[Image Block 2]           [Text Block 2]
```

### Example 2: With Full Width Images
```
[Cover Image - Full Width]

[Project Title - Left]    [Empty]

[Text Block 1]            [Image Block 1]
[Full Width Image]                        ← Starts new row
[Text Block 2]            [Video Block 1]
```

### Example 3: Text Heavy
```
[Cover Image - Full Width]

[Project Title - Left]    [Empty]

[Text Block 1]            [Text Block 2]
[Text Block 3]            [Image Block 1]
[Text Block 4]            [Text Block 5]
```

---

## Best Practices

### Images & Videos
- **Thumbnail (Work page):** Use 1:1 aspect ratio (square)
- **Cover Image:** Use 2.5:1 aspect ratio (ultra-wide panoramic)
- **Content Images/Videos:** Will display as 1:1 (square)
- Use **Full Width** for important showcase images
- Use **Single Width** for supporting images

### Text Blocks
- **Title:** Use for main section headings
- **Subtitle:** Use for secondary context
- **Heading 1 & 2:** Use to organize content within a block
- **Paragraph:** Use for body text
- You don't need to fill all fields - just use what you need!

### Content Flow Strategy
1. Start with context (text blocks)
2. Show visuals (images/videos)
3. Alternate text and images for rhythm
4. Use full width images for impact moments
5. Group related content in adjacent blocks

---

## Field Removed from Schema

The following fields have been **removed** for simplicity:
- ❌ Category
- ❌ Tags
- ❌ Project Date
- ❌ Client
- ❌ Project URL
- ❌ GitHub URL

Only essential fields remain for a cleaner, faster workflow!

---

## Quick Reference

| Block Type | Width Options | Required Fields | Optional Fields |
|------------|---------------|-----------------|-----------------|
| Image Block | Full / Single | Image | Alt text, Caption |
| Video Block | Full / Single | Video | Caption |
| Text Block | Single only | None | Title, Subtitle, H1, H2, Paragraph |

---

## Troubleshooting

### "I don't see my content blocks"
- Make sure you clicked **"Publish"** in Sanity
- Refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)

### "My full width image isn't full width"
- Check the **Width** dropdown is set to "Full Width (2 columns)"
- Save and republish

### "Text block looks empty"
- Make sure at least one field has content
- All text block fields are optional - fill in what you need

### "Blocks aren't in the right order"
- Drag and drop blocks in Sanity to reorder
- They flow left to right, top to bottom automatically

---

## Need Help?
- Only 3 block types to master!
- Simple drag and drop ordering
- Content flows automatically left to right, top to bottom
- Full width images create natural breaks


