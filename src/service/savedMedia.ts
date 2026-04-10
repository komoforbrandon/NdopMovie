import type { MediaSummary, MediaType, SavedMediaItem } from "../types/type";

const SAVED_MEDIA_STORAGE_KEY = "ndopflix-saved-media";
const SAVED_MEDIA_UPDATED_EVENT = "saved-media-updated";

function canUseStorage() {
  return typeof window !== "undefined";
}

function dispatchSavedMediaUpdate() {
  if (!canUseStorage()) {
    return;
  }

  window.dispatchEvent(new Event(SAVED_MEDIA_UPDATED_EVENT));
}

export function getSavedMedia() {
  if (!canUseStorage()) {
    return [] as SavedMediaItem[];
  }

  const rawSavedMedia = window.localStorage.getItem(SAVED_MEDIA_STORAGE_KEY);

  if (!rawSavedMedia) {
    return [] as SavedMediaItem[];
  }

  try {
    const parsedSavedMedia = JSON.parse(rawSavedMedia) as SavedMediaItem[];

    if (!Array.isArray(parsedSavedMedia)) {
      return [] as SavedMediaItem[];
    }

    return parsedSavedMedia;
  } catch {
    return [] as SavedMediaItem[];
  }
}

function saveMedia(items: SavedMediaItem[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(SAVED_MEDIA_STORAGE_KEY, JSON.stringify(items));
  dispatchSavedMediaUpdate();
}

export function isMediaSaved(id: number, mediaType: MediaType) {
  return getSavedMedia().some(
    (savedItem) => savedItem.id === id && savedItem.mediaType === mediaType,
  );
}

export function toggleSavedMedia(item: MediaSummary, mediaType: MediaType) {
  const savedMedia = getSavedMedia();
  const isSaved = savedMedia.some(
    (savedItem) => savedItem.id === item.id && savedItem.mediaType === mediaType,
  );

  const updatedSavedMedia = isSaved
    ? savedMedia.filter(
        (savedItem) => !(savedItem.id === item.id && savedItem.mediaType === mediaType),
      )
    : [...savedMedia, { ...item, mediaType }];

  saveMedia(updatedSavedMedia);

  return updatedSavedMedia;
}

export function subscribeToSavedMediaUpdates(listener: () => void) {
  if (!canUseStorage()) {
    return () => undefined;
  }

  const handleUpdate = () => listener();

  window.addEventListener("storage", handleUpdate);
  window.addEventListener(SAVED_MEDIA_UPDATED_EVENT, handleUpdate);

  return () => {
    window.removeEventListener("storage", handleUpdate);
    window.removeEventListener(SAVED_MEDIA_UPDATED_EVENT, handleUpdate);
  };
}
