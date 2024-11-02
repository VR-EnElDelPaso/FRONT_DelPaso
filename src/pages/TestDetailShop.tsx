import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPreferences } from '../services/Preference';


export default function TestDetailShopPage() {
  const { state } = useLocation();
  const [isLoadingPreference, setIsLoadingPreference] = useState<boolean>(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const createPreference = useCallback(async () => {
    setIsLoadingPreference(true);
    const { tourIds } = state;

    if (!tourIds) {
      setIsLoadingPreference(false);
      return;
    }

    const response = await createPreferences(tourIds);
    if (response.ok) {
      setPreferenceId(response.data);
    }
    setIsLoadingPreference(false);
  }, [state])

  useEffect(() => {
    createPreference();
  }, [createPreference]);

  return (
    <div>
      {isLoadingPreference ? <div>Cargando...</div> : <div>Preference ID: {preferenceId}</div>}
    </div>
  );
}