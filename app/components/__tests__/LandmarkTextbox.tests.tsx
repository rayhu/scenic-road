import { render } from "@testing-library/react-native";
import React from "react";

import LandmarkTextbox from "../LandmarkTextbox";

describe("LandmarkTextbox", () => {
  it("should render landmarks correctly", () => {
    const landmarks = [
      {
        name: "Eiffel Tower",
        description: "Paris",
        latitude: 48.8584,
        longitude: 2.2945,
      },
    ];

    const { getByText } = render(<LandmarkTextbox landmarks={landmarks} />);

    expect(getByText("Eiffel Tower")).toBeTruthy();
    expect(getByText("Paris")).toBeTruthy();
    expect(getByText("Lat: 48.8584, Lon: 2.2945")).toBeTruthy();
  });
});
