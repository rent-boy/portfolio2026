import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'ysi7wnbr', // Your Sanity project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production for better performance
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch all work projects
export async function getWorkProjects() {
  const query = `*[_type == "workProject" && !(_id in path("drafts.**")) && visible == true] | order(orderRank) {
    _id,
    title,
    subtitle,
    slug,
    category,
    client,
    year,
    featured,
    visible,
    period,
    "thumbnailImage": featuredImage.asset->url,
    "thumbnailColor": featuredImage.asset->metadata.palette.darkVibrant.background,
    "thumbnailLightColor": featuredImage.asset->metadata.palette.lightMuted.background,
    "thumbnailVideo": thumbnailVideo.asset->url,
    "coverImage": coverImage.asset->url,
    excerpt
  }`
  
  return await client.fetch(query)
}

// Fetch single work project by slug
export async function getWorkProjectBySlug(slug: string) {
  const query = `*[_type == "workProject" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    subtitle,
    slug,
    "thumbnailImage": featuredImage.asset->url,
    "thumbnailLightColor": featuredImage.asset->metadata.palette.lightMuted.background,
    "thumbnailColor": featuredImage.asset->metadata.palette.darkVibrant.background,
    "coverImage": coverImage.asset->url,
    "coverVideo": coverVideo.asset->url,
    contentBlocks[] {
      _type,
      _key,
      // Image Block
      _type == "imageBlock" => {
        "imageUrl": image.asset->url,
        "alt": image.alt,
        caption,
        width,
        buttonLabel,
        buttonUrl,
        roundCorners,
        showBorder
      },
      // Video Block
      _type == "videoBlock" => {
        "videoUrl": video.asset->url,
        caption,
        width,
        autoplay,
        buttonLabel,
        buttonUrl,
        roundCorners,
        showBorder
      },
      // Text Block
      _type == "textBlock" => {
        title,
        titleEmail,
        subtitle,
        heading1,
        heading2,
        paragraph,
        showInSidePanel,
        width,
        buttonLabel,
        buttonUrl
      },
      // Empty Block
      _type == "emptyBlock" => {
        width
      },
      // Slideshow Block
      _type == "slideshowBlock" => {
        "items": items[] {
          _type,
          _type == "image" => {
            "url": asset->url,
            "type": "image"
          },
          _type == "file" => {
            "url": asset->url,
            "type": "video"
          }
        },
        autoplay,
        caption,
        width,
        buttonLabel,
        buttonUrl,
        roundCorners,
        showBorder
      },
      // Line Separator Block
      _type == "lineSeparatorBlock" => {
        spacing
      },
      // Prototype Embed Block
      _type == "prototypeEmbedBlock" => {
        prototypeUrl,
        height,
        width,
        roundCorners,
        showBorder,
        showOpenButton
      }
    },
    projectLink,
    projectUrl,
    googleDriveVideoUrl
  }`
  
  return await client.fetch(query, { slug })
}

// Fetch cursor media items for the landing hero hover effect
export async function getCursorMedia() {
  const query = `*[_type == "homePage" && !(_id in path("drafts.**"))][0] {
    cursorMedia[] {
      "url": media.asset->url,
      "mimeType": media.asset->mimeType,
      alt,
      chipLabel
    }
  }`
  const data = await client.fetch(query)
  return (data?.cursorMedia ?? []) as { url: string; mimeType: string; alt?: string; chipLabel?: string }[]
}

// Fetch home page data
export async function getHomePage() {
  const query = `*[_type == "homePage" && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    introText,
    navigationTabs,
    heroText,
    "profileImageUrl": profileImage.asset->url
  }`

  return await client.fetch(query)
}

// Fetch site-wide settings (bottom bar buttons + text)
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
    cvButtonText,
    cvButtonUrl,
    linkedInUrl,
    linkedInButtonText,
    bottomBarText
  }`
  return await client.fetch(query)
}

