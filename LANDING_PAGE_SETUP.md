# Quick Setup: Create Landing Page

## The Error

The error occurs because the website is looking for a Landing page that doesn't exist yet in Sanity.

## Solution

You need to create a Landing page in Sanity. Since we just hid the `pageType` field, here's how to create it:

### Option 1: Use Sanity Vision Tool

1. Go to **http://localhost:3333**
2. Click **"Vision"** tab (at the top)
3. Paste this query and click "Fetch":

```groq
*[_type == "page" && pageType == "landing"]
```

If it returns empty `[]`, create the landing page:

4. Go to **"Single pages"**
5. Click **"+ Create"** 
6. For now, just save with:
   - Title: "Landing Page"
   - Slug: Generate from title

### Option 2: Temporarily Unhide Page Type

1. In your code editor, go to:
   `/Users/siddharthkothiyal/portfolio-cms/schemaTypes/page.ts`

2. Find line 36 and comment it out:
```typescript
// hidden: true,
```

3. Refresh Sanity Studio
4. Create a new "Single pages" document
5. Set Page Type to "Landing"
6. Fill in:
   - Introduction Text
   - Navigation Tabs
   - Image Slideshow
7. Publish
8. Re-add `hidden: true` back to the code

## What Happens After You Create It

✅ The error will disappear
✅ Navigation will load custom text
✅ Slideshow will display your images
✅ Everything will work smoothly

## Current State (With Error Handling)

Even without a Landing page, the site now:
- Shows default navigation text
- Shows placeholder for slideshow
- Doesn't crash or show errors
- Continues to function

But for full functionality, you need to create the Landing page!

