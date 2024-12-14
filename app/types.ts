export type RootStackParamList = {
  Home: undefined;
  LandmarkDetail: { landmark: Landmark };
};

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
