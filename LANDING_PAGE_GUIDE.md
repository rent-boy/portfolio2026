# 🏠 Landing Page Setup Guide (Updated)

This guide explains how to configure your Landing page in Sanity CMS, including the intro text, navigation tabs (with names and visibility), and image slideshow.

---

## 📋 Table of Contents
1. [Landing Page Overview](#landing-page-overview)
2. [Intro Text](#intro-text)
3. [Navigation Tabs](#navigation-tabs)
4. [Image Slideshow](#image-slideshow)
5. [Step-by-Step Setup](#step-by-step-setup)

---

## 1. Landing Page Overview

Your Landing page is the first page visitors see. It contains:
- **Intro Text**: "Hei! I am Siddharth..." on the top left
- **Navigation Tabs**: Four customizable tabs with names and visibility toggles
- **Image Slideshow**: Auto-playing images at bottom right (1:1 aspect ratio)

**Location in Sanity:** Single pages → Home (Landing page)

---

## 2. Intro Text

### What It Does
The intro text appears in the top-left corner of your landing page and all other pages in the navigation bar.

### Default Text
```
"Hei! I am Siddharth, a product designer based in Oslo"
```

### How to Edit
1. Go to **Single pages** → **Home**
2. Find **"Introduction Text (Landing Page)"**
3. Edit the text (you can change it to anything you want)
4. Click **"Publish"**
5. Hard refresh your website to see changes

### Example Custom Text
```
"Hello! I'm Siddharth, a UX designer from Norway"
"Hei! I'm Siddharth, crafting digital experiences in Oslo"
"Product designer & creative thinker based in Oslo"
```

**Note:** Changes to this text will appear on ALL pages (in the navigation bar).

---

## 3. Navigation Tabs

### What They Are
Four customizable navigation tabs that appear in the top-right corner. Each tab has:
- **Tab Name**: Customizable text (e.g., "Thesis", "Work", "Play", "About")
- **Visibility Toggle**: Show or hide the tab from navigation

### Default Configuration
| Tab | Name | Visible | Links To |
|-----|------|---------|----------|
| Tab 1 | Thesis | ✅ Yes | BLINK project page |
| Tab 2 | Work | ✅ Yes | Work page |
| Tab 3 | Play | ✅ Yes | Play page |
| Tab 4 | About | ✅ Yes | About page |

### How to Edit Tab Names
1. Go to **Single pages** → **Home**
2. Find **"Navigation Tabs (Landing Page)"**
3. Expand each tab section:
   - **Tab 1 (Thesis)**
     - **Tab Name**: Edit to change what appears in navigation
     - **Show in Navigation**: Toggle ON/OFF
   - **Tab 2 (Work)**
     - **Tab Name**: Edit to change what appears in navigation
     - **Show in Navigation**: Toggle ON/OFF
   - **Tab 3 (Play)**
     - **Tab Name**: Edit to change what appears in navigation
     - **Show in Navigation**: Toggle ON/OFF
   - **Tab 4 (About)**
     - **Tab Name**: Edit to change what appears in navigation
     - **Show in Navigation**: Toggle ON/OFF
4. Click **"Publish"**
5. Hard refresh your website

### Example Custom Names
```
Tab 1: "Projects" (instead of "Thesis")
Tab 2: "Portfolio" (instead of "Work")
Tab 3: "Gallery" (instead of "Play")
Tab 4: "Contact" (instead of "About")
```

### Hiding Tabs
Toggle **"Show in Navigation"** to **OFF** for any tab you want to hide:

**Example: Show only Work and About**
```
Tab 1 (Thesis): Show in Navigation ❌ OFF
Tab 2 (Work): Show in Navigation ✅ ON
Tab 3 (Play): Show in Navigation ❌ OFF
Tab 4 (About): Show in Navigation ✅ ON

Result: Only "Work" and "About" appear in navigation
```

---

## 4. Image Slideshow

### What It Does
Displays an auto-playing slideshow at the bottom-right of the landing page. Each image:
- Has a **1:1 aspect ratio** (square)
- Can optionally **link to a work project**
- Fades smoothly to the next image
- Shows navigation dots below

### How to Add Images

1. Go to **Single pages** → **Home**
2. Find **"Image Slideshow (Landing Page)"**
3. Click **"Add item"**
4. For each slideshow image:
   - **Image**: Upload a square image (1:1 ratio recommended)
   - **Alternative Text**: Add descriptive alt text for accessibility
   - **Link to Work Project**: (Optional) Select a project to link to when clicked
5. Click **"Publish"**

### Slideshow Settings
- **Interval**: Changes automatically every 4 seconds
- **Transition**: Smooth fade animation
- **Aspect Ratio**: 1:1 (square)
- **Position**: Bottom-right corner, aligned with navigation padding

### Example Setup
```
Image 1:
- Upload: project-blink-thumbnail.jpg
- Alt Text: "BLINK Digital Reading Project"
- Link to: BLINK - Rethinking Digital Reading

Image 2:
- Upload: project-aha-thumbnail.jpg
- Alt Text: "Aha Design System"
- Link to: Aha Design System

Image 3:
- Upload: project-oslo-thumbnail.jpg
- Alt Text: "Oslo City Guide"
- Link to: Oslo City Guide
```

**Tip:** Add 3-5 images for an effective slideshow that showcases your best work.

---

## 5. Step-by-Step Setup

### Complete Landing Page Setup

**Step 1: Set Intro Text**
```
Single pages → Home → Introduction Text (Landing Page)
"Hei! I am Siddharth, a product designer based in Oslo"
```

**Step 2: Configure Navigation Tabs**
```
Single pages → Home → Navigation Tabs (Landing Page)

Tab 1 (Thesis):
- Tab Name: "Thesis"
- Show in Navigation: ✅ ON

Tab 2 (Work):
- Tab Name: "Work"
- Show in Navigation: ✅ ON

Tab 3 (Play):
- Tab Name: "Play"
- Show in Navigation: ✅ ON

Tab 4 (About):
- Tab Name: "About"
- Show in Navigation: ✅ ON
```

**Step 3: Add Slideshow Images**
```
Single pages → Home → Image Slideshow (Landing Page)

Add 3-5 images:
- Each image should be square (1:1 aspect ratio)
- Add alt text for each
- Optionally link to work projects
```

**Step 4: Publish**
```
Click "Publish" button at the bottom
Wait for "Published" confirmation
```

**Step 5: View Changes**
```
Go to http://localhost:3001
Hard refresh: Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows)
```

---

## 🔄 How Changes Appear

### Intro Text Changes
- **Location in CMS**: Introduction Text (Landing Page)
- **Appears on**: Top-left of all pages (in navigation bar)
- **Updates**: Immediately after hard refresh

### Navigation Tab Name Changes
- **Location in CMS**: Navigation Tabs → [Each Tab] → Tab Name
- **Appears on**: Top-right navigation bar on all pages
- **Updates**: Immediately after hard refresh

### Navigation Tab Visibility Changes
- **Location in CMS**: Navigation Tabs → [Each Tab] → Show in Navigation
- **Effect**: Tab appears/disappears from navigation bar
- **Updates**: Immediately after hard refresh

### Slideshow Changes
- **Location in CMS**: Image Slideshow (Landing Page)
- **Appears on**: Bottom-right of landing page only
- **Updates**: Immediately after hard refresh

---

## 💡 Pro Tips

1. **Keep intro text concise**: One sentence works best (40-60 characters)

2. **Use consistent tab names**: Keep them simple and clear (1 word is ideal)

3. **Strategic tab visibility**: 
   - Hide incomplete sections during development
   - Show only relevant sections for specific audiences
   - Launch sections gradually as you complete them

4. **Slideshow best practices**:
   - Use 3-5 images (not too many)
   - Keep image file sizes under 500KB for fast loading
   - Link images to your best work projects
   - Use high-quality, professional images
   - Maintain consistent visual style across all images

5. **Test on mobile**: After making changes, check how everything looks on mobile devices

---

## 🛠️ Troubleshooting

**Intro text not updating?**
- Make sure you clicked "Publish" (not just Save)
- Hard refresh your browser (Cmd + Shift + R)
- Check that you edited the correct field (Introduction Text, not Title)

**Tab names not changing?**
- Verify you're editing "Tab Name" (not the tab section title)
- Click "Publish" after making changes
- Clear browser cache if needed

**Tab visibility toggle not working?**
- Make sure "Show in Navigation" is toggled correctly (ON = visible, OFF = hidden)
- Publish your changes
- Hard refresh the website

**Slideshow not showing?**
- Ensure you've added at least 1 image
- Check that images are properly uploaded (not just draft)
- Verify the Landing page is published
- Hard refresh the website

**Slideshow images linking to wrong project?**
- Edit the slideshow item in CMS
- Update the "Link to Work Project" field
- Make sure the linked project is published

---

## 🎯 Quick Reference

| Feature | CMS Location | Effect |
|---------|--------------|--------|
| Intro Text | Single pages → Home → Introduction Text | Appears top-left on all pages |
| Tab 1 Name | Single pages → Home → Navigation Tabs → Tab 1 → Tab Name | First tab text in navigation |
| Tab 1 Visibility | Single pages → Home → Navigation Tabs → Tab 1 → Show in Navigation | Show/hide first tab |
| Tab 2-4 | Same pattern as Tab 1 | Same behavior for other tabs |
| Slideshow | Single pages → Home → Image Slideshow | Bottom-right auto-playing images |

---

## 📖 Related Guides

- `VISIBILITY_CONTROLS_GUIDE.md` - Detailed visibility controls
- `CONTENT_BLOCKS_GUIDE.md` - Project content structure
- `PROJECT_ORDERING_GUIDE.md` - Reorder work projects

---

**Need more help?** 
- Check browser console for errors (F12)
- Verify Sanity Studio is running (http://localhost:3333)
- Ensure your website is running (http://localhost:3001)
- Try opening in incognito/private window to rule out caching issues
