import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

const Task2 = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const tokenResponse = await axios.post(
                'https://devapi.whitehouseproductsltd.com/token',
                {
                    User: 'apiuser@stacktech.io',
                    Password: '!Temp123',
                    Secret: '!api123'
                }
            );
            const token = tokenResponse.data.Token;
            const dataResponse = await axios.post(
                'https://devapi.whitehouseproductsltd.com/token',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setData(dataResponse.data);
            console.log('Data:', dataResponse.data);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
            setError('Error fetching data. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.dataText}>{JSON.stringify(data)}</Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    card: {
        width: '80%',
        borderRadius: 10,
        elevation: 5,
    },
    dataText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default Task2;