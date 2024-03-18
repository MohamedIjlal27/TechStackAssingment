import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Pressable,
    StyleSheet
} from "react-native";
import { IconButton } from "react-native-paper";
import Fallback from "../Components/Fallback";
import { addTodo, updateTodo, deleteTodo, getAllTodos } from "../DB/Sqlite";

const ToDoScreen = () => {
    const [toDo, setToDo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editToDo, setEditToDo] = useState(null);

    useEffect(() => {
        loadToDoList();
    }, []);

    const loadToDoList = () => {
        getAllTodos((todos) => {
            setTodoList(todos);
        });
    };

    const handleAddToDo = () => {
        if (toDo.trim() !== "") {
            const currentDate = new Date().toLocaleString();
            addTodo(toDo, currentDate, false);
            setToDo("");
            loadToDoList();
        }
    };

    const handleDeleteToDo = (id) => {
        deleteTodo(id);
        loadToDoList();
    };

    const handleEditToDo = (toDoItem) => {
        setEditToDo(toDoItem);
        setToDo(toDoItem.title);
    };

    const handleUpdateToDo = () => {
        if (editToDo) {
            updateTodo(
                editToDo.id,
                toDo,
                editToDo.date,
                editToDo.completed
            );
            setEditToDo(null);
            setToDo("");
            loadToDoList();
        }
    };

    const handleToggleCompletion = (id, completed) => {
        const currentItem = todoList.find((item) => item.id === id);
        if (currentItem) {
            updateTodo(
                id,
                currentItem.title,
                currentItem.date,
                !completed
            );
            loadToDoList();
        }
    };
    const renderToDo = ({ item, index }) => {
        const textColor = item.completed ? "red" : "#000";
        return (
            <View style={styles.renderContainer} key={item.id}>
                <View style={styles.cardContent}>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[
                                styles.renderText,
                                {
                                    textDecorationLine: item.completed
                                        ? "line-through"
                                        : "none",
                                    color: textColor,
                                },
                            ]}
                        >
                            {item.title}
                        </Text>
                        <Text style={styles.dateText}>
                            {item.date}
                        </Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <IconButton
                            icon={
                                item.completed
                                    ? "checkbox-marked-circle-outline"
                                    : "checkbox-blank-circle-outline"
                            }
                            iconColor={
                                item.completed ? "#1e90ff" : "#000"
                            }
                            onPress={() =>
                                handleToggleCompletion(item.id, item.completed)
                            }
                            size={24}
                        />
                        <IconButton
                            icon="pencil"
                            iconColor="#1e90ff"
                            onPress={() => handleEditToDo(item)}
                            size={24}
                        />
                        <IconButton
                            icon="trash-can"
                            iconColor="#1e90ff"
                            onPress={() => handleDeleteToDo(item.id)}
                            size={24}
                        />
                    </View>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ToDoScreen</Text>
                <TextInput
                    style={styles.textInputArea}
                    placeholder='Add a Task'
                    placeholderTextColor='#666'
                    value={toDo}
                    onChangeText={(userText) => setToDo(userText)}
                />
                {editToDo ? (
                    <Pressable style={styles.addButton} onPress={() => handleUpdateToDo()}>
                        <Text style={styles.addText}>Save</Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.addButton} onPress={() => handleAddToDo()}>
                        <Text style={styles.addText}>Add</Text>
                    </Pressable>
                )}
            </View>
            <ScrollView>
                {todoList.map((item, index) => (
                    <View key={item.id} style={styles.cardContainer}>
                        {renderToDo({ item, index })}
                    </View>
                ))}

                {todoList.length === 0 && <Fallback />}
            </ScrollView>
        </View>
    );
};

export default ToDoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginLeft: 15,
        marginRight: 15
    },
    header: {
        backgroundColor: "#fff",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
    },
    textInputArea: {
        borderWidth: 2,
        borderColor: "#1e90ff",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        color: "#000",
    },
    addButton: {
        backgroundColor: "#1e90ff",
        borderRadius: 16,
        paddingVertical: 12,
        marginBottom: 20,
        alignItems: "center",
    },
    addText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    },
    renderContainer: {
        backgroundColor: "#fff",
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#1e90ff",
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    renderText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "400",
    },
    dateText: {
        color: "black",
        fontSize: 13,
        marginTop: 20
    },
    iconsContainer: {
        flexDirection: "row",
    },

    titleContainer: {
        flexDirection: "column",
        flex: 1,
        marginLeft: 8
    },
});
