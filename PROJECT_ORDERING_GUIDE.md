# Work Page Project Ordering Guide

## ✨ How to Reorder Projects

Your Work page now supports **drag-and-drop ordering** in Sanity CMS!

---

## 📝 Steps to Reorder:

### 1. Open Sanity Studio
Go to: **http://localhost:3333**

### 2. Click "Multi-page/Work"
You'll see your list of work projects

### 3. Drag & Drop
- **Grab** the handle icon (⋮⋮) on the left of each project
- **Drag** projects up or down
- **Drop** in the desired position

### 4. Order Updates Automatically
- Changes save automatically
- No need to click "Publish"
- Refresh your website to see new order

---

## 🎯 Your Desired Order:

Set projects in this order (top to bottom):

1. BLINK- Rethinking Digital Reading
2. Pizzabot: Design for Blank AS Oslo
3. Oslo Løa Interactive
4. NRK TV Random
5. Lytt
6. Redefining Population
7. Storytelling "Seb/सेब"

---

## 🔧 How It Works:

### Backend:
- Each project has an invisible `orderRank` field
- Sanity automatically manages this when you drag-and-drop
- Query sorts by `orderRank` field

### Frontend:
- Work page fetches projects with `order(orderRank)`
- Displays in exact order from Sanity
- Updates immediately when you refresh

---

## 📐 Visual Guide:

```
Sanity Studio - Multi-page/Work
┌─────────────────────────────────┐
│ ⋮⋮ BLINK- Rethinking...        │ ← Drag these
│ ⋮⋮ Pizzabot: Design for...     │    handles to
│ ⋮⋮ Oslo Løa Interactive        │    reorder
│ ⋮⋮ NRK TV Random               │
│ ⋮⋮ Lytt                        │
│ ⋮⋮ Redefining Population       │
│ ⋮⋮ Storytelling "Seb/सेब"      │
└─────────────────────────────────┘
```

---

## ⚡ Quick Tips:

### Drag & Drop:
- Click and hold the **⋮⋮** handle
- Drag to desired position
- Release to drop
- Changes save automatically

### Multiple Changes:
- You can reorder multiple projects at once
- All changes are saved as you drag
- No need to publish each change

### Undo:
- If you make a mistake, just drag it back
- Or refresh the page to reset to last saved state

---

## 🐛 Troubleshooting:

### "I don't see drag handles"
- **Solution**: Refresh Sanity Studio (Cmd+R / Ctrl+R)
- The orderable plugin may need to load

### "Order doesn't update on website"
- **Solution**: Hard refresh your website (Cmd+Shift+R / Ctrl+Shift+R)
- Clear browser cache if needed

### "Can't drag projects"
- **Solution**: Make sure you're clicking the **⋮⋮** handle (far left)
- Try refreshing Sanity Studio

---

## 📊 Technical Details:

### Schema Field Added:
```typescript
orderRankField({type: 'workProject'})
```

### Query Changed:
```groq
*[_type == "workProject"] | order(orderRank)
```

### Plugin:
- `@sanity/orderable-document-list`
- Provides drag-and-drop UI
- Manages orderRank automatically

---

## ✅ You're All Set!

Your Work page projects can now be reordered simply by dragging and dropping in Sanity Studio. The order will be reflected on your website immediately!

Visit:
- **Sanity:** http://localhost:3333
- **Website:** http://localhost:3001/work

Happy organizing! 🎉

