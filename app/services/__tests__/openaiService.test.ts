import axios from "axios";

import { fetchLandmarks } from "../openaiService";

jest.mock("axios");

describe("fetchLandmarks from OpenAI", () => {
  // it("should fetch landmarks from OpenAI API", async () => {
  //   const mockData = {
  //     data: {
  //       choices: [
  //         {
  //           text: JSON.stringify([
  //             {
  //               name: "Statue of Liberty",
  //               description:
  //                 "A colossal neoclassical sculpture on Liberty Island.",
  //               latitude: 40.6892,
  //               longitude: -74.0445,
  //             },
  //           ]),
  //         },
  //       ],
  //     },
  //   };

  //   axios.post.mockResolvedValue(mockData);

  //   const landmarks = await fetchLandmarks(40.6892, -74.0445);
  //   expect(landmarks).toEqual([
  //     {
  //       name: "Statue of Liberty",
  //       description: "A colossal neoclassical sculpture on Liberty Island.",
  //       latitude: 40.6892,
  //       longitude: -74.0445,
  //     },
  //   ]);
  // });

  it("should handle errors", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));

    const landmarks = await fetchLandmarks(40.6892, -74.0445);
    expect(landmarks).toEqual([]);
  });
});
