import { useEffect, useState } from "react";
import type { MediaSummary, MediaType } from "../types/type";
import {
  getSavedMedia,
  isMediaSaved,
  subscribeToSavedMediaUpdates,
  toggleSavedMedia,
} from "../service/savedMedia";

export function useSavedMedia() {
  const [savedItems, setSavedItems] = useState(() => getSavedMedia());

  useEffect(() => {
    setSavedItems(getSavedMedia());

    return subscribeToSavedMediaUpdates(() => {
      setSavedItems(getSavedMedia());
    });
  }, []);

  function toggleSaved(item: MediaSummary, mediaType: MediaType) {
    const updatedSavedItems = toggleSavedMedia(item, mediaType);
    setSavedItems(updatedSavedItems);
  }

  function isSaved(itemId: number, mediaType: MediaType) {
    return isMediaSaved(itemId, mediaType);
  }

  return {
    isSaved,
    savedItems,
    toggleSaved,
  };
}
