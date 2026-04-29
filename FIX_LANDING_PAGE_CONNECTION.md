# 🔧 Fix: Connecting Home Page to Landing Page Design

## ✅ Step-by-Step Fix

The `pageType` field has been temporarily **unhidden** so you can set it for your Home page.

---

## 📝 What You Need To Do:

### **Step 1: Restart Sanity Studio**

If Sanity Studio is already running, stop it (Ctrl+C) and restart:

```bash
cd /Users/siddharthkothiyal/portfolio-cms
npm run dev
```

Wait for it to start, then go to: **http://localhost:3333**

---

### **Step 2: Set Page Type for Home**

1. In Sanity Studio, go to **Single pages**
2. Click on **"Home"** (your landing page)
3. You should now see **"Page Type"** dropdown field (it was hidden before)
4. Select **"Landing"** from the dropdown
5. Click **"Publish"** button at the bottom
6. Wait for "Published" confirmation

---

### **Step 3: Verify the Data**

To confirm it worked, open the **Vision** tab in Sanity Studio and run:

```groq
*[_type == "page" && title == "Home"][0] {
  title,
  pageType,
  introText,
  navigationTabs
}
```

You should see:
```json
{
  "title": "Home",
  "pageType": "landing",
  "introText": "Hei! I am Siddharth...",
  "navigationTabs": {
    "tab1": { "name": "Thesis", "visible": true },
    ...
  }
}
```

---

### **Step 4: Test Your Website**

1. Make sure your website is running:
   ```bash
   cd /Users/siddharthkothiyal/Downloads/Portfolio\ 2025/portfolio-website
   npm run dev
   ```

2. Go to **http://localhost:3001**

3. **Hard refresh**: 
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

4. **You should now see:**
   - ✅ Your intro text from Sanity appears in the top-left
   - ✅ Navigation tab names from Sanity appear in the top-right
   - ✅ Any hidden tabs are not visible
   - ✅ Image slideshow appears (if you added images)

---

### **Step 5: Hide Page Type Again (Optional)**

Once your Home page has `pageType: 'landing'` set, you can hide the field again to clean up the UI.

**I can do this for you after you confirm Step 4 is working!**

---

## 🎯 Why This Happened

- The `pageType` field was **hidden** in the schema
- When you created the "Home" page, it couldn't be set
- The website looks for `pageType === 'landing'` to fetch landing page data
- Without it set, the connection was broken

---

## ✅ What's Fixed Now

✅ `pageType` field is now **visible** in Sanity Studio  
✅ You can set it to "Landing" for your Home page  
✅ Once set and published, the design will connect to your Home page  
✅ All your intro text and navigation changes will appear  

---

## 🆘 Troubleshooting

**Still not seeing changes after Step 4?**

1. **Check browser console** (F12) for errors
2. **Clear browser cache** completely
3. **Try incognito/private window**
4. **Verify in Vision** that pageType is actually "landing"
5. **Check Sanity Studio** that changes are Published (not just Draft)

**Page Type dropdown not showing?**

1. Make sure you **hard refreshed** Sanity Studio (Cmd + Shift + R)
2. Try **closing and reopening** the browser tab
3. **Clear browser cache** for localhost:3333

---

## 📞 Next Steps

After you complete Steps 1-4 and confirm everything is working:

1. **Let me know** - I'll hide the Page Type field again
2. **Or keep it visible** if you want to create Play/About pages with correct pageTypes

---

**Start with Step 1** (restart Sanity Studio) and let me know when you've set the Page Type to "Landing" and published!

