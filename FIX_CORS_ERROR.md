# 🔧 FIX: CORS Error - Allow Website to Access Sanity

## The Problem
Your website can't fetch data from Sanity because of CORS (Cross-Origin Resource Sharing) security blocking it.

**Error in console:**
```
Access to XMLHttpRequest blocked by CORS policy
net::ERR_FAILED 403 (Forbidden)
```

---

## ✅ Solution: Add CORS Origins in Sanity

### Step 1: Go to Sanity Management Console
Open this link in your browser:
**https://sanity.io/manage/project/ysi7wnbr/api**

(Or go to https://sanity.io/manage → Select your project → Settings → API)

### Step 2: Add CORS Origins
1. Scroll down to **"CORS Origins"** section
2. Click **"Add CORS Origin"**
3. Add these origins:

```
http://localhost:3000
```

Click "Save"

Then add another one:
```
http://localhost:3001
```

Click "Save"

### Step 3: Verify Settings
Make sure both origins are listed with:
- ✅ **Allow credentials**: Checked

### Step 4: Test
1. Go back to **http://localhost:3000**
2. Open DevTools (F12) → Console
3. Refresh the page
4. You should now see:
   ```
   🔍 Sanity Data Fetched: {introText: "Hei! I am Siddharth", ...}
   ✅ Setting intro text: Hei! I am Siddharth
   📊 Navigation Tabs Data: {...}
   🎯 Final Nav Items: [...]
   ```

---

## 🎯 What This Does

CORS is a security feature that prevents websites from accessing APIs they shouldn't. By adding `http://localhost:3000` to the allowed origins, you're telling Sanity:

> "It's okay for my website at localhost:3000 to fetch data from you!"

---

## ⚡ After Adding CORS

Within 5 seconds:
- ✅ The CORS errors will disappear
- ✅ Your intro text will appear: "Hei! I am Siddharth"
- ✅ Your navigation tabs will show: "Th", "Bri", "aha" (exactly as you typed them!)
- ✅ Everything will be connected and working!

---

**Go to the Sanity Management Console NOW and add those CORS origins!**

Link: https://sanity.io/manage/project/ysi7wnbr/api

