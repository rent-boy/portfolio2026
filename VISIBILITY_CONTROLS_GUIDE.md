# 🎛️ Visibility Controls Guide

This guide explains how to control what appears on your website using toggle switches in Sanity CMS.

---

## 📋 Table of Contents
1. [Work Projects Visibility](#work-projects-visibility)
2. [Navigation Tabs Visibility](#navigation-tabs-visibility)
3. [Quick Examples](#quick-examples)

---

## 1. Work Projects Visibility

### Toggle Individual Projects On/Off

Each work project has a **"Visible on Work Page"** toggle switch:

**Location:** Multi-page/Work → [Select any project] → Scroll down to "Visible on Work Page"

**Options:**
- ✅ **ON (default)**: Project appears on the Work page grid
- ❌ **OFF**: Project is completely hidden from the Work page (but the project detail page still exists if someone has the direct link)

**Use Cases:**
- Hide work-in-progress projects
- Temporarily remove projects from your portfolio
- Keep drafts hidden until ready to publish
- Archive old projects without deleting them

**Example:**
```
Project: "BLINK - Rethinking Digital Reading"
Visible on Work Page: [✅ ON]
→ Shows on Work page

Project: "Secret Client Project"
Visible on Work Page: [❌ OFF]  
→ Hidden from Work page
```

---

## 2. Navigation Tabs Visibility

### Control Which Navigation Tabs Appear

In your Landing page, you can toggle each navigation tab on/off:

**Location:** Single pages → Landing → Navigation Visibility (Landing Page)

**Available Toggles:**
- 🔗 **Show Thesis Tab**: Toggle OFF to hide "Thesis" from navigation
- 🔗 **Show Work Tab**: Toggle OFF to hide "Work" from navigation  
- 🔗 **Show Play Tab**: Toggle OFF to hide "Play" from navigation
- 🔗 **Show About Tab**: Toggle OFF to hide "About" from navigation

**Default:** All tabs are visible (ON by default)

**Use Cases:**
- Launch your portfolio with only some sections ready
- Hide incomplete pages (e.g., Play or About)
- Simplify navigation for specific audiences
- Temporarily disable sections for maintenance

**Example Navigation Configurations:**

### Minimal Portfolio (Work Only)
```
Show Thesis Tab: [❌ OFF]
Show Work Tab: [✅ ON]
Show Play Tab: [❌ OFF]
Show About Tab: [❌ OFF]

Result: Only "Work" tab appears in navigation
```

### Full Portfolio (All Sections)
```
Show Thesis Tab: [✅ ON]
Show Work Tab: [✅ ON]
Show Play Tab: [✅ ON]
Show About Tab: [✅ ON]

Result: All navigation tabs visible (default)
```

### Design Focus (No Personal Pages)
```
Show Thesis Tab: [✅ ON]
Show Work Tab: [✅ ON]
Show Play Tab: [❌ OFF]
Show About Tab: [❌ OFF]

Result: Only "Thesis" and "Work" appear
```

---

## 3. Quick Examples

### Scenario 1: Launching Your Portfolio Gradually

**Week 1 - Launch with Work only:**
- Landing Page:
  - Show Thesis Tab: ❌ OFF
  - Show Work Tab: ✅ ON
  - Show Play Tab: ❌ OFF
  - Show About Tab: ❌ OFF

**Week 2 - Add Thesis:**
- Change Show Thesis Tab to ✅ ON

**Week 3 - Add About:**
- Change Show About Tab to ✅ ON

**Week 4 - Full launch:**
- Change Show Play Tab to ✅ ON

---

### Scenario 2: Hiding Specific Work Projects

You have 10 work projects but want to feature only your best 5:

1. Go to **Multi-page/Work**
2. For each project you want to hide:
   - Open the project
   - Scroll to **"Visible on Work Page"**
   - Toggle to ❌ OFF
   - Click **Publish**
3. Only projects with toggle ON will show on Work page

**Tip:** You can reorder visible projects using drag-and-drop in the "Multi-page/Work" list!

---

### Scenario 3: Portfolio Under Construction

Show only completed sections while building others:

```
Navigation:
- Show Thesis Tab: ✅ ON (ready)
- Show Work Tab: ✅ ON (ready)  
- Show Play Tab: ❌ OFF (coming soon)
- Show About Tab: ❌ OFF (coming soon)

Work Projects:
- Project 1: ✅ ON (complete)
- Project 2: ✅ ON (complete)
- Project 3: ❌ OFF (still editing)
- Project 4: ❌ OFF (needs photos)
```

---

## 🔄 How Changes Appear

**After making changes in Sanity:**

1. **Save** your changes (Draft)
2. Click **"Publish"** button
3. Wait for confirmation
4. **Hard refresh** your website:
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + R`
5. Changes should appear immediately

**Note:** All toggles default to ON (visible). You must explicitly turn them OFF to hide content.

---

## ⚡ Quick Reference

| Feature | Location | Default | Effect When OFF |
|---------|----------|---------|-----------------|
| Work Project Visibility | Multi-page/Work → [Project] → Visible on Work Page | ✅ ON | Project hidden from Work page grid |
| Thesis Tab | Single pages → Landing → Navigation Visibility → Show Thesis Tab | ✅ ON | "Thesis" removed from navigation |
| Work Tab | Single pages → Landing → Navigation Visibility → Show Work Tab | ✅ ON | "Work" removed from navigation |
| Play Tab | Single pages → Landing → Navigation Visibility → Show Play Tab | ✅ ON | "Play" removed from navigation |
| About Tab | Single pages → Landing → Navigation Visibility → Show About Tab | ✅ ON | "About" removed from navigation |

---

## 💡 Pro Tips

1. **Don't delete - hide instead**: Keep old projects hidden rather than deleting them. You can always show them again later.

2. **Test before publishing**: Use the toggles to preview different portfolio configurations before making them live.

3. **Strategic launches**: Hide sections until they're 100% complete for a professional first impression.

4. **Seasonal updates**: Hide certain projects seasonally or based on your current focus.

5. **Client confidentiality**: Quickly hide client projects that become confidential without deleting your work.

---

## 🛠️ Troubleshooting

**Changes not showing up?**
1. Make sure you clicked **"Publish"** (not just Save)
2. Hard refresh your browser
3. Clear browser cache
4. Check that the toggle is actually OFF/ON as intended

**Navigation tab still showing after hiding?**
- The toggle affects the navigation bar on all pages
- Make sure you're looking at the published site (not Sanity Studio)
- Try opening in an incognito/private window

**Work project still visible after hiding?**
- Confirm "Visible on Work Page" toggle is OFF
- Publish the project
- Hard refresh the Work page

---

Need help? Check the other guides:
- `LANDING_PAGE_GUIDE.md` - Landing page setup
- `CONTENT_BLOCKS_GUIDE.md` - Project content structure
- `PROJECT_ORDERING_GUIDE.md` - Reorder work projects

