import axios from "axios";

import { fetchLandmarks } from "../anthropicService";

jest.mock("axios");

describe("fetchLandmarks from Anthropic", () => {
  it("should fetch landmarks from Anthropic API", async () => {
    const mockData = {
      data: {
        choices: [
          {
            text: JSON.stringify([
              {
                name: "Eiffel Tower",
                description:
                  "A wrought-iron lattice tower on the Champ de Mars in Paris.",
                latitude: 48.8584,
                longitude: 2.2945,
              },
            ]),
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockData);

    const landmarks = await fetchLandmarks(48.8584, 2.2945);
    expect(landmarks).toEqual([
      {
        name: "Eiffel Tower",
        description:
          "A wrought-iron lattice tower on the Champ de Mars in Paris.",
        latitude: 48.8584,
        longitude: 2.2945,
      },
    ]);
  });

  it("should handle errors", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));

    const landmarks = await fetchLandmarks(48.8584, 2.2945);
    expect(landmarks).toEqual([]);
  });
});
