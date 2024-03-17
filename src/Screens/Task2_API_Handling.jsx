import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_ENDPOINT = 'https://devapi.whitehouseproductsltd.com/token';
const USERNAME = 'apiuser@stacktech.io';
const PASSWORD = '!Temp123';
const API_SECRET = '!api123';

const Task2 = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.post(API_ENDPOINT, {
                    username: USERNAME,
                    password: PASSWORD,
                    api_secret: API_SECRET,
                });

                const authToken = tokenResponse.data.token;

                const response = await axios.get('API_ENDPOINT', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No data available</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.property1}</Text>
                        <Text>{item.property2}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default Task2;
