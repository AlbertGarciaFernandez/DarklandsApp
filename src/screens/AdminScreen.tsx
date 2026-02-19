import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { useEvents } from '../hooks/useEvents';
import { colors } from '../theme/colors';

export const AdminScreen = () => {
    const { events, updateEvents } = useEvents();
    const [jsonText, setJsonText] = useState(JSON.stringify(events, null, 2));

    const handleSave = () => {
        try {
            const parsed = JSON.parse(jsonText);
            updateEvents(parsed);
            Alert.alert('Success', 'Events data updated!');
        } catch (e) {
            Alert.alert('Error', 'Invalid JSON format');
        }
    };

    return (
        <Container style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <Typography variant="h1" style={styles.title}>Admin Panel</Typography>
                <Typography variant="body" style={styles.subtitle}>Edit Events JSON:</Typography>

                <ScrollView style={styles.editorContainer}>
                    <TextInput
                        style={styles.input}
                        multiline
                        value={jsonText}
                        onChangeText={setJsonText}
                        placeholderTextColor={colors.secondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </ScrollView>

                <Button title="Save Changes" onPress={handleSave} style={styles.button} />
            </KeyboardAvoidingView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    title: {
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        marginBottom: 16,
        color: colors.secondary,
    },
    editorContainer: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    input: {
        color: colors.primary,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 12,
    },
    button: {
        marginBottom: 16,
    }
});
