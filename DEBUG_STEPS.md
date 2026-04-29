# 🔍 Debugging Steps - Changes Not Reflecting

## Step 1: Verify Data in Sanity

Go to **Vision** tab in Sanity Studio (http://localhost:3333) and run this query:

```groq
*[_type == "page" && title == "Home"][0] {
  title,
  pageType,
  introText,
  navigationTabs {
    tab1 {
      name,
      visible
    },
    tab2 {
      name,
      visible
    },
    tab3 {
      name,
      visible
    },
    tab4 {
      name,
      visible
    }
  },
  _id,
  "isDraft": _id in path("drafts.**")
}
```

**Expected Result:**
```json
{
  "title": "Home",
  "pageType": "landing",
  "introText": "Hei! I am Siddharth, a product designer based in Oslo",
  "navigationTabs": {
    "tab1": {
      "name": "Th",
      "visible": true
    },
    "tab2": {
      "name": "Bri",
      "visible": true
    },
    ...
  },
  "_id": "...",
  "isDraft": false
}
```

---

## Step 2: Check What Website is Fetching

1. Go to **http://localhost:3001** (wait 20 seconds for it to start)
2. Open DevTools (F12)
3. Go to **Console** tab
4. Look for these messages:
   ```
   🔍 Sanity Data Fetched: {...}
   📊 Navigation Tabs Data: {...}
   🎯 Final Nav Items: [...]
   ```

---

## Step 3: Common Issues

### Issue 1: pageType Not Set
If Vision query shows `pageType: null`:
- Go to **Single pages** → **Home**
- Set **Page Type** to **"Landing"**
- Click **Publish**

### Issue 2: Navigation Tabs Empty
If Vision query shows `navigationTabs: null`:
- The data isn't saved properly
- Re-enter the tab names
- Click **Publish** again

### Issue 3: Still in Draft Mode
If Vision query shows `isDraft: true`:
- Look for a **draft version** of the Home page
- Delete the draft or publish it
- Make sure you're editing the published version

---

## Step 4: Force Refresh

After confirming data is in Sanity:

1. **Clear browser cache completely**
2. **Open incognito/private window**
3. Go to http://localhost:3001
4. Check console for debug messages

---

## Quick Fix Command

If all else fails, run this in terminal to restart everything:

```bash
# Kill all processes
pkill -f "next dev"
pkill -f "sanity dev"

# Restart Sanity
cd /Users/siddharthkothiyal/portfolio-cms
npm run dev &

# Restart Website (in new terminal)
cd /Users/siddharthkothiyal/Downloads/Portfolio\ 2025/portfolio-website
rm -rf .next
npm run dev
```

---

## What to Send Me

After running the Vision query, send me:
1. The JSON result from Vision
2. The console output from http://localhost:3001
3. Screenshot of what you see on the website

This will help me diagnose the exact issue!

