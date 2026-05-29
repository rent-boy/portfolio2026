import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'ysi7wnbr', // Your Sanity project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production for better performance
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch all work projects
export async function getWorkProjects() {
  const query = `*[_type == "workProject" && !(_id in path("drafts.**")) && visible != false] | order(orderRank) {
    _id,
    title,
    subtitle,
    slug,
    category,
    client,
    year,
    featured,
    visible,
    isOpen,
    closedProjectUrl,
    period,
    "landingImages": landingImages[] { "url": asset->url, "mimeType": asset->mimeType },
    "thumbnailImage": coverImage.asset->url,
    "thumbnailColor": coverImage.asset->metadata.palette.darkVibrant.background,
    "thumbnailLightColor": coverImage.asset->metadata.palette.lightMuted.background,
    "thumbnailVideo": thumbnailVideo.asset->url,
    "coverImage": coverImage.asset->url,
    excerpt,
    assignedBar,
    "hoverBgColor": hoverBgColor.hex,
    "hoverAccentColor": hoverAccentColor.hex
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
    isOpen,
    "thumbnailImage": coverImage.asset->url,
    "thumbnailLightColor": coverImage.asset->metadata.palette.lightMuted.background,
    "thumbnailColor": coverImage.asset->metadata.palette.darkVibrant.background,
    "coverImage": coverImage.asset->url,
    "coverVideo": coverVideo.asset->url,
    contentBlocks[] {
      _type,
      _key,
      title,
      paragraph,
      showInSideNav,
      buttonLabel,
      buttonUrl,
      "media": media[] {
        _key,
        mediaType,
        "url": select(mediaType == "image" => image.asset->url, mediaType == "video" => video.asset->url, null),
        "alt": image.alt,
        caption,
        prototypeUrl,
        prototypeHeight,
      }
    },
    metadata[] {
      label,
      value
    },
    projectLink,
    projectUrl,
    googleDriveVideoUrl,
    "hoverBgColor": hoverBgColor.hex
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
    "profileImageUrl": profileImage.asset->url,
    experienceEntries[] {
      year,
      company,
      role
    }
  }`

  return await client.fetch(query)
}

// Fetch site-wide settings (bottom bar buttons + text)
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
    linkedInButtonText,
    linkedInUrl,
    emailButtonText,
    emailAddress,
    cvButtonText,
    cvButtonUrl,
    bottomBarText,
    ogTitle,
    "ogImageUrl": ogImage.asset->url
  }`
  return await client.fetch(query)
}

