import React, { useRef, useEffect } from 'react';

const LocationAutocompleteInput = ({ name, value, onSelect, placeholder, disabled }) => {
  const inputRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'pk' },
    });

    autocomplete.current.addListener('place_changed', () => {
      const place = autocomplete.current.getPlace();

      if (!place.geometry || !place.geometry.location) return;

      const locationData = {
        address: place.formatted_address || place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      onSelect(locationData); // <--- correctly named now
    });
  }, [onSelect]);

  return (
    <input
      type="text"
      ref={inputRef}
      className="form-control"
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={value?.address || ''}
    />
  );
};

export default LocationAutocompleteInput;