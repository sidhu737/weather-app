import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState } from "react";

function PlacesAutocomplete(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const [dcity, setDcity] = useState("");
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        props.getCityName(description.split(" ")[0]);
        props.getlatlon({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="border-b-2 border-gray-600"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="flex flex-col items-center ">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        className="p-2 px-3 w-64 rounded-2xl outline-none font-semibold font-mono"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="input_suggestions p-2 px-3 w-60 overflow-hidden 	h-36 rounded-2xl bg-slate-50 bg-opacity-40 backdrop-blur-3xl  font-semibold font-mono">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}
export default PlacesAutocomplete;
