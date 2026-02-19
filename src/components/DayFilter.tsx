import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from './Typography';
import { colors } from '../theme/colors';

interface DayFilterProps {
    dates: string[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

export const DayFilter: React.FC<DayFilterProps> = ({ dates, selectedDate, onSelectDate }) => {
    // Helper to format date (e.g. "2026-03-03" -> { day: "THU", date: "03" })
    const formatDate = (dateString: string) => {
        // Parse the date string manually to avoid UTC offset issues when determining the day of the week.
        // This ensures the date is treated as local time for display purposes.
        const [year, month, day] = dateString.split('-').map(Number);
        // Create a date object using the parsed components.
        // Note: month is 0-indexed in Date constructor.
        const dateObj = new Date(year, month - 1, day);

        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayName = dayNames[dateObj.getDay()];

        // Format day number to always be two digits
        const formattedDayNum = day < 10 ? `0${day}` : `${day}`;

        return { day: dayName, date: formattedDayNum };
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {dates.map((dateStr) => {
                    const isSelected = dateStr === selectedDate;
                    const { day, date } = formatDate(dateStr);

                    return (
                        <TouchableOpacity
                            key={dateStr}
                            style={[styles.button, isSelected && styles.selectedButton]}
                            onPress={() => onSelectDate(dateStr)}
                            activeOpacity={0.7}
                        >
                            <Typography
                                variant="caption"
                                style={[styles.dayText, isSelected && styles.selectedText]}
                            >
                                {day}
                            </Typography>
                            <Typography
                                variant="h2"
                                style={[styles.dateText, isSelected && styles.selectedText]}
                            >
                                {date}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.background,
        paddingBottom: 4,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    button: {
        width: 60,
        height: 70,
        borderRadius: 4, // More squared like screenshot
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: 'transparent',
        borderColor: colors.gold, // Gold border for selected
    },
    dayText: {
        color: colors.secondary,
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    dateText: {
        color: colors.secondary,
        fontSize: 24, // Big number
        lineHeight: 28,
    },
    selectedText: {
        color: colors.gold, // Highlight text color
    },
});
