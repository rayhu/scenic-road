import axios from "axios";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import log from "../utils/logger";

const AxiosTestScreen: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      log.info("AxiosTest successful: ", response.data);
      setData(response.data.title);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      log.error(err);
      setError("Failed to fetch data");
      setData(null);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Data" onPress={fetchData} />
      {data && <Text style={styles.text}>Data: {data}</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default AxiosTestScreen;
