import axios from "axios";

import { fetchGooglePlaces } from "../googleService";

jest.mock("axios");

describe("fetchGooglePlaces", () => {
  it("should fetch places from Google API", async () => {
    const mockData = {
      data: {
        results: [
          {
            name: "Eiffel Tower",
            vicinity: "Paris",
            geometry: { location: { lat: 48.8584, lng: 2.2945 } },
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockData);

    const places = await fetchGooglePlaces(48.8584, 2.2945);
    expect(places).toEqual([
      {
        name: "Eiffel Tower",
        description: "Paris",
        latitude: 48.8584,
        longitude: 2.2945,
      },
    ]);
  });

  it("should handle errors", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const places = await fetchGooglePlaces(48.8584, 2.2945);
    expect(places).toEqual([]);
  });
});
